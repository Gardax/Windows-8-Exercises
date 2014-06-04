/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
WinJS.Namespace.defineWithParent(Vegetables, "Mixins", {
    MushroomMixin : {
        size:0,
        growUp: function (water){
            this.size += water;
        }
    }
});