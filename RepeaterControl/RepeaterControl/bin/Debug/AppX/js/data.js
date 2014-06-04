/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
WinJS.Namespace.define("Persons", {
    Persons:WinJS.Class.define(function(){
       this.allPersons=new Array(
        {
            firstName: "Ivan",
            lastName: "Ivanov",
            age: "16"
        },

       {
           firstName: "Georgi",
           lastName: "Georgiev",
           age: "800"
       },

       {
           firstName: "Toshko",
           lastName: "Afrikanski",
           age: "30"
       })
    },
    {},
    {
        getAllPersons:function(){
            
        }
    })
});