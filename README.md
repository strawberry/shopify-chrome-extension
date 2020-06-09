Strawberry Shopify Extension
=============

![](logo.png)

A very opinionated extension that does some (hopefully) useful things on Shopify stores.

### Installation
* Download the [the `dist` archive](https://github.com/strawberry/shopify-chrome-extension/blob/master/dist.zip?raw=true) and unpack it.
* In Chrome, go to [chrome://extensions](chrome://extensions).
* Toggle the "Developer mode" switch in the top right to _on_.
* Click the "Load unpacked" button and select the directory you just unzipped.

### Features

#### Admin Panel Theme Page Additions
* On the themes page in the admin panel, the theme's ID will be printed in the theme's row.  
  Clicking on the ID will copy it to your clipboard.
* A 'Copy preview URL' link is added under a theme to copy the theme's preview URL to your clipboard.
* If the theme name contains a Jira ticket code, it will it convert into a link that opens in a new tab.
* When renaming a theme, you can choose from some preset suggestions.

#### Compact Admin Bar
On the frontend of any Shopify site, the standard admin bar which shows you which theme you're currently previewing is made much more compact. Only the theme's name and a close button remains.

##### Caveats
**Theme name identifiers**

The theme ID and preview URL functionality only works with themes that have an emoji prefix. This shouldn't be an issue since they should have one, anyway. Any of the following are acceptable:

💾✨🐞🛠🌍🌎🌏

It would be nice if this weren't a requirement, but it was the easiest way to determine what element is a theme to filter them down. I don't want to rely on class names or similar DOM selectors as they are obfuscated and subject to change.

**Theme rename suggestions**

Unfortunately, I can't find a way to trick the Polaris text field into thinking it's been updated once the suggestion has been inserted, meaning the 'Rename' button is left disabled. Also, on blur, the previous name will re-populate the field. Whenever you click a suggestion, you must then type a space or anything else into the box, which will counteract both of these issues.

A message will appear reminding the user to type something in order to continue.
