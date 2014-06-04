/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
WinJS.Namespace.defineWithParent(Vegetables, "Healthy", {
    Cucumber: WinJS.Class.derive(Vegetables.Vegetable, function (length) {

        this.length = length;
        Vegetables.Vegetable.apply(this, ["green", false]);
    }, {

    })
});