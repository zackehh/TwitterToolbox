var logging = false;

// Sets the item in the localstorage
function setItem(key, value){
    try {
        log("Inside setItem:" + key + ":" + value);
        window.localStorage.removeItem(key);
        window.localStorage.setItem(key, value);
    } catch (e) {
        log("Error inside setItem");
        log(e);
    }
    log("Return from setItem" + key + ":" + value);
}

// Gets the item from local storage with the specified key
function getItem(key){
    var value;
    log('Get Item:' + key);
    try {
        value = window.localStorage.getItem(key);
    } catch (e) {
        log("Error inside getItem() for key:" + key);
        log(e);
        value = "null";
    }
    log("Returning value: " + value);
    return value;
}

// Clears all the key pairs in the local storage
function clearStrg(){
    log('about to clear local storage');
    window.localStorage.clear();
    log('cleared');
}

// Logs to the console if logging is enabled
function log(txt){
    if(logging){
        console.log(txt);
    }
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    chrome.pageAction.show(sender.tab.id);
    switch(request.name){
        case "getPreferences":
            // request from the content script to get the preferences.
            sendResponse({
                "full-header": localStorage["full-header"],
                "photos": localStorage["photos"],
                "promo": localStorage["promo"],
                "remove-header": localStorage["remove-header"],
                "show-tweets": localStorage["show-tweets"],
                "trends": localStorage["trends"],
                "whoToFollow": localStorage["whoToFollow"]
            });
            break;
        default:
            sendResponse({});
    }
});

chrome.pageAction.onClicked.addListener(function (tab) {
    var url = chrome.extension.getURL('options.html');
    chrome.tabs.create({
        selected: true,
        url: url
    });
});