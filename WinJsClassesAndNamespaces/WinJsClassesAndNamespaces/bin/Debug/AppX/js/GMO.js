/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
WinJS.Namespace.defineWithParent(Vegetables, "Unhealthy", {
    CucumberGMO: WinJS.Class.mix(Vegetables.Healthy.Cucumber, Vegetables.Mixins.MushroomMixin),
    TomatoGMO: WinJS.Class.mix(Vegetables.Healthy.Tomato, Vegetables.Mixins.MushroomMixin)
});