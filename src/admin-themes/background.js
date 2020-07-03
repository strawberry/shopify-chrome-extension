/**
 * This listens for the "rename_iframe_loaded" event which is dispatched in rename-suggestions-observer.js,
 * then in turn injects the theme suggestions script into the tab and its frames.
 *
 * This will inject the code into ALL frames, and the script will then determine if it's been loaded
 * into the correct one before executing.
 *
 * @todo Only inject the scripts into the correct frame
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "rename_iframe_loaded") {
    chrome.tabs.executeScript(sender.tab.id, {
      code: "themeRenameSuggestions.init()",
      allFrames: true,
    });

    chrome.tabs.insertCSS(sender.tab.id, {
      file: "admin-themes/style.css",
      allFrames: true,
    })
  }
});
