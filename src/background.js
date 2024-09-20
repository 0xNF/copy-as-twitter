const allowedDomains = [
    RegExp(".*nitter.*"),
  ];  

const contextMenuId = "copyAsTwitter";


function replaceDomain(originalUrl, newDomain) {
    try {
        // Create a new URL object from the original URL
        const url = new URL(originalUrl);
        
        // Set the hostname to the new domain
        url.hostname = newDomain;
        
        // Return the modified URL as a string
        return url.toString();
    } catch (error) {
        console.error("Invalid URL:", error);
        return null; // Return null in case of an error
    }
}

// Callback reads runtime.lastError to prevent an unchecked error from being 
// logged when the extension attempt to register the already-registered menu again. 
// Menu registrations in event pages persist across extension restarts.
function addContextMenuItem() {
    const _ = browser.contextMenus.create({
        id: contextMenuId,
        title: "Copy as Twitter",
        contexts: ["link"]
    }, 
    // See https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/#event-pages-and-backward-compatibility
    // for information on the purpose of this error capture.
    () => void browser.runtime.lastError,
    );
}

function onCopyAsTwitterClicked(info, tab) {
    if (info.menuItemId === contextMenuId) {
        const data = info.linkUrl;
        const tweetText = replaceDomain(data, "twitter.com");
        
        // Copy to clipboard
        navigator.clipboard.writeText(tweetText).then(() => {
            console.log('Copied to clipboard:', tweetText);
            alert('Text copied as Twitter post!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    }
}

function filterDomains(tabId, changeInfo, tab) {
    console.log(tab);
    let host = URL.parse(tab.url).host;
    if (allowedDomains.some(domain => host.match(domain) > 0)) {
        browser.contextMenus.update(contextMenuId, { visible: true });
    } else {
        browser.contextMenus.update(contextMenuId, { visible: false });
    }
}

function main() {

    console.log(browser);
    console.log(browser.runtime);
    console.log(browser.tabs);


    browser.runtime.onInstalled.addListener(addContextMenuItem);
    browser.contextMenus.onClicked.addListener(onCopyAsTwitterClicked);
    // Show the context menu item only on allowed domains
    browser.tabs.onUpdated.addListener(filterDomains);
}

main();



