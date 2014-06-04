// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    var app = WinJS.Application;

    app.onactivated = function (args) {

        var loadedVideosList = document.getElementById("loaded-Videos");
        var player = document.getElementById("player");
        var savePlaylist = document.getElementById("savePlaylist");
        var openPlaylist = document.getElementById("openPlaylist");
        var videoTokens = new Array();
        var storagePermissions = Windows.Storage.AccessCache.StorageApplicationPermissions;
        var videoCount = 0;

        loadedVideosList.addEventListener("click", function (event) {
            var VideoEntry = event.target;

            if (VideoEntry.tagName.toLowerCase() == "strong") {
                VideoEntry = VideoEntry.parentElement;
            }

            player.src = VideoEntry.getAttribute("data-Video-url");
            player.play();
        });

        var addVideoListEntry = function (VideoName, VideoAlbum, VideoUrl) {
            var VideoEntry = document.createElement("li");
            VideoEntry.setAttribute("data-Video-url", VideoUrl);
            VideoEntry.innerHTML = "<strong>" + VideoName + "</strong>" + " - " + VideoAlbum;
            loadedVideosList.appendChild(VideoEntry);
        }

        var addVideo = function (storageFile) {
            var fileUrl = URL.createObjectURL(storageFile);

            storageFile.properties.getMusicPropertiesAsync().then(function (properties) {
                properties.album;
                properties.title

                //Generate token
                var rand1 = Math.floor((Math.random() * 100000));
                var rand2 = Math.floor((Math.random() * 100000));
                var token = rand1 + "" + rand2;
                storagePermissions.futureAccessList.addOrReplace(token, storageFile);
                videoTokens.push(token);

                addVideoListEntry(storageFile.displayName, properties.album, fileUrl);
            });
        }

        WinJS.Utilities.id("pick-file-button").listen("click", function () {
            var openPicker = Windows.Storage.Pickers.FileOpenPicker();

            openPicker.fileTypeFilter.append("*");
            openPicker.pickSingleFileAsync().then(addVideo);
        });

        WinJS.Utilities.id("pick-multiple-files-button").listen("click", function () {
            var openPicker = Windows.Storage.Pickers.FileOpenPicker();

            openPicker.fileTypeFilter.append("*");
            openPicker.pickMultipleFilesAsync().then(function (files) {
                files.forEach(addVideo);
            });
        });

        savePlaylist.addEventListener("click", function () {
            var savePicker = Windows.Storage.Pickers.FileSavePicker();
            savePicker.defaultFileExtension = ".lst";
            savePicker.fileTypeChoices.insert("Playlist", [".lst"]);
            savePicker.suggestedFileName = "My Playlist.lst";

            savePicker.pickSaveFileAsync().then(function (file) {
                var listContent = JSON.stringify(videoTokens);
                Windows.Storage.FileIO.writeTextAsync(file, listContent);
            });
        });

        openPlaylist.addEventListener("click", function () {
            var openPicker = Windows.Storage.Pickers.FileOpenPicker();
            openPicker.fileTypeFilter.append(".lst");

            openPicker.pickSingleFileAsync().then(function (file) {
                Windows.Storage.FileIO.readTextAsync(file).done(function (text) {
                    loadedVideosList.innerHTML = "";
                    var tokens = JSON.parse(text);
                    videoTokens = tokens;

                    for (var i = 0; i < tokens.length; i++) {
                        storagePermissions.futureAccessList.getFileAsync(tokens[i]).then(function (currentFile) {
                            addVideo(currentFile);
                        });
                    }
                });
            });
        });
    };

    app.start();
})();