/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {

    var computer = {
        id: "",
        name: "",
        imageUrl: "",
        price: 0,
        processor: {
            modelName: "",
            frequencyGHz: 0
        }
    }

    var computersArray = [
        {
            id: 0,name: "studio 1558", manifacturer: "Dell", price: 2000, imageUrl: "#",
            processor: { modelName: "Intel i7", frequancy: 2.0 }
        },
        {
            id: 1, name: "Inspiron M1510", manifacturer: "Dell", price: 1300, imageUrl: "#",
            processor: { modelName: "Phenom 4", frequancy: 2.0 }
        }
    ];

    function getAllComputers() {
        return computersArray;
    }

    function getComputerById(id)
    {
        var computer = {};
        var computerToReturn;
        computersArray.forEach(function (computer) {
            if (computer.id === id) {
                computerToReturn = computer;
            }
        });
        return computerToReturn;
    }

    WinJS.Namespace.define("Data", {
        getAllComputers: getAllComputers,
        getComputerById: getComputerById
    });
})();