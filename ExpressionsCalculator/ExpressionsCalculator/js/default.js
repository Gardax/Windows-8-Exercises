/// <reference path="../Scripts/jquery-2.0.3.min.js" />
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
                $(".button").on("click", function () {
                    var char = $(this).attr("id");
                    var expressionString=$("#expression").val();
                    if (char == "Calculate") {
                        //send http request
                        $("#expression").val("Calculating...");
                        var request = $.ajax({
                            url: "http://expressioncalculator-1.apphb.com/api/expressions/calculate",
                            type: "POST",
                            data: { expression: expressionString },
                            dataType: "html",
                            contenType: "application/json"
                        });

                        request.done(function (msg) {
                            $("#expression").val(JSON.parse(msg).Result);
                        });

                        request.fail(function (jqXHR, textStatus) {
                            $("#expression").val("Error!");
                        });
                    } else if (char == "CE") {
                        $("#expression").val("");
                    }else{
                        var currentExpression = $("#expression").val();
                        $("#expression").val(currentExpression += char);
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
