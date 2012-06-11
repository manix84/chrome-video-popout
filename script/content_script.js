

var popOutObject = function (object) {
        var contents = object.outerHTML;

        chrome.extension.sendRequest({
            type: "popUp",
            content: contents
        });
    },

    cleanUpOverlay = function (overlay) {
        // mouseout event will be fired as well, but overlay is removed on click event.
        if (overlay.parentElement !== null) {
            overlay.parentElement.removeChild(overlay);
        }
    },

    cleanupObjectListeners = function () {
        var objects = document.getElementsByTagName('object'),
            embeds = document.getElementsByTagName('embed'),
            i = 0;

        for (; i < objects.length; i++) {
            objects[i].onmouseover = objects[i].__mouseover;
        }

        for (i = 0; i < embeds.length; i++) {
            embeds[i].onmouseover = embeds[i].__mouseover;
        }
    },

    createOverlay = function (object) {
        var overlay = document.createElement('div');
        overlay.style.width = object.offsetWidth + "px";
        overlay.style.height = object.offsetHeight + "px";
        overlay.style.top = object.offsetTop + "px";
        overlay.style.left = object.offsetLeft + "px";
        overlay.style.backgroundColor = "#0000ff";
        overlay.style.opacity = 0.5;
        //overlay.style.zIndex = Number.MAX_VALUE;
        //overlay.style.position = "absolute";
        return overlay;
    },


    onMouseover = function (event) {
        var object = event.target,
            objectDisplayStyle = object.style.display,
            overlay = createOverlay(object);

        object.parentElement.appendChild(overlay);
        object.style.display = "none";

        overlay.addEventListener('click', function (event2) {
            cleanUpOverlay(overlay);
            cleanupObjectListeners();
            object.style.display = objectDisplayStyle;
            popOutObject(object);
        });
        overlay.addEventListener('mouseout', function (event2) {
            cleanUpOverlay(overlay);
            object.style.display = objectDisplayStyle;
        });
    };

// Use onmouseover instead of addEventListnere because some
// embeds (like youtube) override addEventListener.

var objects = document.getElementsByTagName('object');
for (var i = 0; i < objects.length; i++) {
    objects[i].__mouseover = objects[i].onmouseover;
    objects[i].onmouseover = onMouseover;
}

var embeds = document.getElementsByTagName('embed');
for (var i = 0; i < embeds.length; i++) {
    embeds[i].__mouseover = embeds[i].onmouseover;
    embeds[i].onmouseover = onMouseover;
}
