/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    function navigateToEventDetailItem(event) {
        event.detail.itemPromise.then(function (item) {

        
        WinJS.Navigation.navigate("ms-appx:///pages/computerDetails.html", {
            itemIndex: event.detail.itemIndex,
            id: item.data.id
        });
        });
    }

    WinJS.Utilities.markSupportedForProcessing(navigateToEventDetailItem);

    WinJS.Namespace.define("Commands", {
        navigateToEventDetailItem: navigateToEventDetailItem
    })
})();