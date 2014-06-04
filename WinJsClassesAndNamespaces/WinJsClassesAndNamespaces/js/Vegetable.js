/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
WinJS.Namespace.define("Vegetables",{
    Vegetable:WinJS.Class.define(function (color, canBeEatenDirectly) {
        this.color = color;
        this.canBeEatenDirectly=canBeEatenDirectly;
    })
});