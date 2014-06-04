/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />

var localSettings = Windows.Storage.ApplicationData.current.localSettings;
var MAX_WORKERS_COUNT = localSettings["countOfWorkers"];
var PrimeNumbersCalculator = WinJS.Class.define(function () {
    this.workersCount = 0;
    this.localFolder = Windows.Storage.ApplicationData.current.localFolder;
}, {
    calculatePrimeNumbersTo: function (N) {
        var self = this;
        return new WinJS.Promise(function (complete) {
            self.localFolder.getFileAsync("to-" + N.toString() + ".txt").then(function (file) {
                Windows.Storage.FileIO.readTextAsync(file).then(function (text) {
                    var data = JSON.parse(text);
                    complete(data);
                });
            }, function (error) {
                var worker = new Worker("/js/calculatePrimesToN.js");
                self._calculateWithWorker(worker, { number: N }).then(function (primes) {
                    self.localFolder.createFileAsync("to-" + N.toString() + ".txt",
                        Windows.Storage.CreationCollisionOption.openIfExists).then(function (file) {
                            var text = JSON.stringify(primes);
                            Windows.Storage.FileIO.writeTextAsync(file, text).then(function () {
                                complete(primes);
                            });
                        });
                });
            });
        });
    },

    calculateFirstPrimeNumbers: function (N) {
        var self = this;
        return new WinJS.Promise(function (complete) {
            self.localFolder.getFileAsync("first-" + N.toString() + ".txt").then(function (file) {
                Windows.Storage.FileIO.readTextAsync(file).then(function (text) {
                    var data = JSON.parse(text);
                    complete(data);
                });
            }, function (error) {
                var worker = new Worker("/js/calculateFirstNPrimes.js");
                self._calculateWithWorker(worker, { number: N }).then(function (primes) {
                    self.localFolder.createFileAsync("first-" + N.toString() + ".txt",
                        Windows.Storage.CreationCollisionOption.openIfExists).then(function (file) {
                            var text = JSON.stringify(primes);
                            Windows.Storage.FileIO.writeTextAsync(file, text).then(function () {
                                complete(primes);
                            });
                        });
                });
            });
        });
    },

    calculatePrimeNumbersInRange: function (startNumber, endNumber) {
        var self = this;
        return new WinJS.Promise(function (complete) {
            self.localFolder.getFileAsync(startNumber+"-" + endNumber + ".txt").then(function (file) {
                Windows.Storage.FileIO.readTextAsync(file).then(function (text) {
                    var data = JSON.parse(text);
                    complete(data);
                });
            }, function (error) {
                var worker = new Worker("/js/calculatePrimesInRange.js");
                self._calculateWithWorker(worker, { startNumber: startNumber, endNumber: endNumber }).then(function (primes) {
                    self.localFolder.createFileAsync(startNumber + "-" + endNumber + ".txt",
                        Windows.Storage.CreationCollisionOption.openIfExists).then(function (file) {
                            var text = JSON.stringify(primes);
                            Windows.Storage.FileIO.writeTextAsync(file, text).then(function () {
                                complete(primes);
                            });
                        });
                });
            });
        });
    },

    setWorkersCount: function(count){
        localSettings["countOfWorkers"] = count;
    },

    _calculateWithWorker: function (worker, parameters) {
        if (this.workersCount == MAX_WORKERS_COUNT) {
            return new WinJS.Promise(function (complete, error) {
                error("There is no free worker");
            });
        }

        this.workersCount++;
        var self = this;

        var freeWorker = function () {
            self.workersCount--;
        };

        return new WinJS.Promise(function (complete) {
            var primes = {};
            worker.onmessage = function (event) {
                primes = event.data;

                freeWorker();
                complete(primes);
            }

            worker.postMessage(parameters);
        });
    }
});