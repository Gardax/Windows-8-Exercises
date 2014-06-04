/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
var PrimeNumbersCalculator = WinJS.Class.define(function () {
    this.workersCount = 0;
}, {
    calculatePrimeNumbersTo: function (N) {
        var worker = new Worker("/js/calculatePrimesToN.js");
        return this._calculateWithWorker(worker, { number: N });
    },

    calculateFirstPrimeNumbers: function (N) {
        var worker = new Worker("/js/calculateFirstNPrimes.js");
        return this._calculateWithWorker(worker, { number: N });
    },

    calculatePrimeNumbersInRange: function (startNumber, endNumber) {
        var worker = new Worker("/js/calculatePrimesInRange.js");
        return this._calculateWithWorker(worker, { startNumber: startNumber, endNumber: endNumber });
    },

    _calculateWithWorker: function (worker, parameters) {
        if (this.workersCount == 3) {
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