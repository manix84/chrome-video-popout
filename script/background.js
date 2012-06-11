/**
 * Video Popup v0.1
 * @author  Rob Taylor [manix84@gmail.com]
 */

(function () {
    var currently_on = true;

    window.chrome.browserAction.onClicked.addListener(function () {
        currently_on = !currently_on;
        window.chrome.browserAction.setIcon({
            path: 'images/icon_' + (currently_on ? 'on' : 'off') + '.png'
        });
    });

    window.chrome.attachListener(function () {
        window.chrome.browserAction.getPopup({}, function () {

        });
    });


}());
