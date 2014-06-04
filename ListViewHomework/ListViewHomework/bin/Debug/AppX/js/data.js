(function () {
    var computers = [
        { model: "Inspiron M5010", manufacturer: "Dell", price: 1200, processor: { model: "Phenom 4", frequancy: 2.0 } },
        { model: "E1-571G", manufacturer: "Acer", price: 800, processor: { model: "intel i7", frequancy: 3.0 } },
        { model: "Some model", manufacturer: "Gosho Corp", price: 120000, processor: { model: "Phenom 20", frequancy: 8.0 } }
    ];
    var computersList = new WinJS.Binding.List(computers);

    // Sorts the groups
    function compareGroups(leftKey, rightKey) {
        return leftKey - rightKey;
    }

    // Returns the group key that an item belongs to
    function getGroupKey(dataItem) {
        return dataItem.manufacturer.toUpperCase().charAt(0);
    }

    // Returns the title for a group
    function getGroupData(dataItem) {
        return dataItem.manufacturer.toUpperCase().charAt(0);;
       
    }

    // Create the groups for the ListView from the item data and the grouping functions
    var groupedItemsList = computersList.createGrouped(getGroupKey, getGroupData, compareGroups);

    WinJS.Namespace.define("computersData",
        {
            groupedItemsList: groupedItemsList
        });
})();