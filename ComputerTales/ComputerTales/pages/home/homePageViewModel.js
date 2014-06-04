/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="../../js/dataLayer.js" />
(function () {

    var computers = Data.getAllComputers();
    var computersList = new WinJS.Binding.List(computers);

    WinJS.Namespace.define("ViewModels", {
        allComputersList: computersList
    });
})();