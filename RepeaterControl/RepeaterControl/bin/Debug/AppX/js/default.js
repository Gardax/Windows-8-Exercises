/// <reference path="repeater.js" />
/// <reference path="data.js" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
       
        var people = new Persons.Persons();
        if (args.detail.kind === activation.ActivationKind.launch) {
            WinJS.UI.processAll().then(function () {
                var personsTemplate = new WinJS.Binding.Template(null, {
                    href: "/templates/personsTemplate.html"
                });
                var repeater = new Repeaters.Repeater(personsTemplate);
                var array = new Array({
                    firstName: "dsada",
                    lastName: "dsa",
                    age: "12"
                });
                repeater.render(people.allPersons, document.body);
            });

           
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
