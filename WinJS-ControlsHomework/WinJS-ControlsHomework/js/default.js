/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll());
            var startDatePicker = new WinJS.UI.DatePicker(document.getElementById("startDate"));
            var endDatePicker = new WinJS.UI.DatePicker(document.getElementById("endDate"));
            var startTimePicker = new WinJS.UI.TimePicker(document.getElementById("startTime"));
            var endTimePicker = new WinJS.UI.TimePicker(document.getElementById("endTime"));


            var switchElement = new WinJS.UI.ToggleSwitch(document.getElementById("switch"));
            switchElement.addEventListener("change", function () {
                var display = (switchElement.checked) ? "visible" : "hidden";
                $(".time").css("visibility", display);
            });
            
            var resultContainer = document.getElementById("result");
            var daysButton = document.getElementById("days-button").winControl;
            daysButton.addEventListener("click", function () {
                var resultDays = getResult() / (1000 * 60 * 60 * 24);
                resultContainer.innerHTML = "" + parseInt(resultDays.toString()) + " days";
            });

            var hoursButton = document.getElementById("hours-button").winControl;
            hoursButton.addEventListener("click", function () {
                var resultHours = getResult() / (1000 * 60 * 60);
                resultContainer.innerHTML = "" + parseInt(resultHours.toString()) + " hours";
            });

            var daysHoursButton = document.getElementById("days-hours-button").winControl;
            daysHoursButton.addEventListener("click", function () {
                var result = getResult();
                var days = result / (1000 * 60 * 60 * 24);
                var hours = (result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
                resultContainer.innerHTML = "" + parseInt(days.toString()) +
                   " days and " + parseInt(hours.toString()) + " hours";
            });

            var calculateButton = document.getElementById("calculate-button");

            calculateButton.addEventListener("click", function () {
                var menu = document.getElementById("menu-id").winControl;
                menu.show();
            });

            var getResult=function () {
                var startDate = startDatePicker.current;
                var endDate = endDatePicker.current;
                var startTime = startTimePicker.current;
                var endTime = endTimePicker.current;

                startDate.setHours(startTime.getHours());
                startDate.setMinutes(startTime.getMinutes());

                endDate.setHours(endTime.getHours());
                endDate.setMinutes(endTime.getMinutes());
                var result = endDate - startDate;

                return result;
            }
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
