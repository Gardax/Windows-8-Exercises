/// <reference path="PrimeNumbersCalculator.js" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                var primesCalculator = new PrimeNumbersCalculator();

                var primeNumbersToN = document.getElementById("calculatePrimesToN");
                primeNumbersToN.addEventListener("click", function () {
                    var N = parseInt(document.getElementById("primesTo-N").value);
                    var result = primesCalculator.calculatePrimeNumbersTo(N).then(function (data) {
                        document.getElementById("result").innerHTML = data;
                        
                    });
                    
                });

                document.getElementById("calculateFirstNPrimes").addEventListener("click", function () {
                    var N = parseInt(document.getElementById("firstPrimes-N").value);
                    var result = primesCalculator.calculateFirstPrimeNumbers(N).then(function (data) {
                        document.getElementById("result2").innerHTML = data;
                    });
                });

                document.getElementById("calculatePrimesInRange").addEventListener("click", function () {
                    var N = parseInt(document.getElementById("primesInRange-start").value);
                    var M = parseInt(document.getElementById("primesInRange-end").value);
                    var result = primesCalculator.calculatePrimeNumbersInRange(N,M).then(function (data) {
                        document.getElementById("result3").innerHTML = data;
                    });
                });

                document.getElementById("btnSetNumberOfWorkers").addEventListener("click", function () {
                    var count = parseInt(document.getElementById("countOfWorkers").value);
                    if (count!=="NaN") {
                        primesCalculator.setWorkersCount(count);
                        document.getElementById("response").innerHTML = "Count of workers set to: " + count;
                    } else {
                        document.getElementById("response").innerHTML = "Invalid count!"
                    }
                });
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
