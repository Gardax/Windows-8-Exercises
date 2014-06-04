/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
WinJS.Namespace.defineWithParent(Vegetables, "Healthy", {
    Tomato : WinJS.Class.derive(Vegetables.Vegetable, function (radius) {

        this.radius = radius;
        Vegetables.Vegetable.apply(this, ["red", true]);
    }, {

    })
});