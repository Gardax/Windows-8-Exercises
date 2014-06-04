// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {

            var updatePosts = function () {
                WinJS.xhr({
                    type: "GET",
                    url: "http://posted.apphb.com/api/posts",
                    headers: { "Content-type": "application/json" },
                }).then(
                    function(success) {
                        var postsDiv = document.getElementById("posts");
                        var allPosts = JSON.parse(success.responseText);
                        for (var i = 0; i < allPosts.length; i++) {
                            var newPost = document.createElement("div");
                            newPost.innerText = allPosts[i].Author + ": " + allPosts[i].Content;
                            postsDiv.appendChild(newPost);
                        }

                    });
            }
            
            document.getElementById("send").addEventListener("click", function () {
                var author = document.getElementById("name").value;
                var content = document.getElementById("message").value;

                WinJS.xhr({
                    type: "POST",
                    url: "http://posted.apphb.com/api/posts",
                    headers: { "Content-type": "application/json" },
                    data: JSON.stringify({ Author: author, Content: content })
                }).then(
                    function (success) {
                        updatePosts();
                    });
            });

            updatePosts();
            setInterval(updatePosts, 30000);
            args.setPromise(WinJS.UI.processAll());
        }
        
    }
    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
