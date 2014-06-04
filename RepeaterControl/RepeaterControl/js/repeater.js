/// <reference path="//Microsoft.WinJS.1.0/js/base.js" 
WinJS.Namespace.define("Repeaters", {
    Repeater: WinJS.Class.define(function (template) {
        this.template = template;
    },
    {
        render: function (data, domElement) {
            
            for (var i = 0; i < data.length; i++) {
                var newElement = document.createElement("div");
                domElement.appendChild(newElement);
                this.template.render(data[i], newElement);
            }
        }
    })
});