/// <reference path="../Scripts/jquery-2.0.3.intellisense.js" />
// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var saveToLocalFolder = function (poemView, localFolder) {
        var currentPoem = poemView.innerText;
        localFolder.createFileAsync("current-poem.txt",
            Windows.Storage.CreationCollisionOption.replaceExisting).then(function (file) {
                Windows.Storage.FileIO.writeTextAsync(file, currentPoem);
            }, function (error) { });
    };

    app.onactivated = function (args) {
        args.setPromise(WinJS.UI.processAll());

        if (args.detail.kind === activation.ActivationKind.launch) {
            var localFolder = Windows.Storage.ApplicationData.current.localFolder;

            var poemText = document.getElementById("poemText");
            var poemView = document.getElementById("poem");

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // returning from suspended - restore the backup
                localFolder.getFileAsync("current-poem.txt").then(function (file) {
                    Windows.Storage.FileIO.readTextAsync(file).then(function (poem) {
                        poemView.innerText = poem;

                        var lines = poem.split("\r\n");
                        lines = $.grep(lines, function (element) {
                            return element != "";
                        });

                        var text = lines.join("\n");

                        poemText.value = text;
                    });
                });
            }

            var rhymeOptions = {
                sequentialLines: 1,
                skippingLines: 2
            };

            var savePoemButton = document.getElementById("savePoem");
            var openPoemButton = document.getElementById("openPoem");
            var newPoemButton = document.getElementById("newPoem");
            var linesPerVerse = 4;
            var poemRhymeOptions = rhymeOptions.sequentialLines;

            poemText.addEventListener("keydown", function (ev) {
                if (ev.keyCode == 13) {
                    var lines = poemText.innerHTML.split("\n");
                    lines = $.grep(lines, function (value) {
                        return value != "\n";
                    });

                    if (lines.length > 6) {
                        var pesho = 0;
                    }

                    var lastLine = lines[lines.length - 1];

                    if (lastLinesRhyme(lines)) {
                        poemView.innerHTML += lastLine + "<br />";
                    } else {
                        poemView.innerHTML += lastLine + "<span class='non-rhyming'>(not rhyming)</span><br />";
                    }

                    if (lines.length > 0 && lines.length % linesPerVerse == 0) {
                        poemView.innerHTML += "<br />";
                    }

                    // keep a backup in the local folder
                    saveToLocalFolder(poemView, localFolder);
                }
            });

            newPoemButton.addEventListener("click", function () {
                poemText.innerHTML = "";
                poemView.innerHTML = "";
            });

            savePoemButton.addEventListener("click", function () {
                var savePicker = Windows.Storage.Pickers.FileSavePicker();
                savePicker.defaultFileExtension = ".txt";
                savePicker.fileTypeChoices.insert("Text Files", [".txt"]);
                savePicker.suggestedFileName = "Poem.txt";

                savePicker.pickSaveFileAsync().then(function (file) {
                    var poemText = poemView.innerText;
                    Windows.Storage.FileIO.writeTextAsync(file, poemText);
                });
            });

            openPoemButton.addEventListener("click", function () {
                var openPicker = Windows.Storage.Pickers.FileOpenPicker();
                openPicker.fileTypeFilter.append(".txt");

                openPicker.pickSingleFileAsync().then(function (file) {
                    Windows.Storage.FileIO.readTextAsync(file).done(function (poem) {
                        poemView.innerText = poem;

                        var lines = poem.split("\r\n");
                        lines = $.grep(lines, function (element) {
                            return element != "";
                        });

                        var text = lines.join("\n");

                        poemText.value = text;
                    });
                });
            });

            var lastLinesRhyme = function (lines) {
                var count = lines.length;
                var delimiter = (poemRhymeOptions == rhymeOptions.sequentialLines) ? 2 : 3;

                if (count % delimiter == 1) {
                    return true;
                }

                if (count < delimiter) {
                    return true;
                }

                var firstLine = lines[count - delimiter];
                var firstEnd = firstLine.substr(firstLine.length - 2, 2);
                var lastLine = lines[count - 1];
                var lastEnd = lastLine.substr(lastLine.length - 2, 2);

                if (firstEnd == lastEnd) {
                    return true;
                }

                return false;
            }
        }
    };

    app.oncheckpoint = function (args) {
        // save the current backup in the Local Folder
        args.setPromise(new WinJS.Promise(function (success) {
            var poemView = document.getElementById("poem-view");
            var localFolder = Windows.Storage.ApplicationData.current.localFolder;
            saveToLocalFolder(poemView, localFolder);
        }));
    };

    app.start();
})();