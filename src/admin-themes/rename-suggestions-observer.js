/**
 * The iframe to rename a theme doesn't exist when the page first loads, so we need to listen
 * for whenever a new iframe is loaded. We'll listen for any mutations and filter out
 * any mutations that aren't the correct iframe.
 *
 * @type {MutationObserver}
 */
const observer = new MutationObserver((mutationsList, observer) => {
  // Check to see if we've opened an iframe
  const iframe = mutationsList.find(record => record.target.tagName === "IFRAME");

  if (! iframe) {
    return;
  }

  const element = iframe.target;
  const label = element.contentWindow.document.querySelector('label');

  // Check to see if the iframe we've loaded is to rename the theme
  if (! label || label.innerText !== "Provide a new name for this theme") {
    return;
  }

  // Send a message that we've loaded the rename iframe
  chrome.runtime.sendMessage({
    type: "rename_iframe_loaded"
  })
});

observer.observe(document, { attributes: true, childList: true, subtree: true });
