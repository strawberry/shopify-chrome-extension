class AdminThemeIdTool {
  constructor() {
    this.appendIdToThemeRows();
    this.addEventHandlers();
  }

  /**
   * The selectors that indicate that the string is a theme.
   *
   * @returns {string[]}
   */
  get themePrefixes() {
    return [
      "💾", // Backups
      "✨", // Features
      "🐞", // Bugfixes
      "🛠", // Developer
      "🌍", "🌎", "🌏", // Live
    ];
  }

  /**
   * The selector that contains the published theme's name.
   *
   * @returns {string}
   */
  get liveThemeNameSelector() {
    return "h2";
  }

  /**
   * The selector that contains the unpublished themes' names.
   *
   * @returns {string}
   */
  get unpublishedThemeNameSelector() {
    return "span";
  }

  /**
   * Get an array of selectors and filter them down to what looks like it contains a theme name.
   *
   * @param {string} selector
   *
   * @returns {Element[]}
   */
  getThemesFromSelector(selector) {
    return [].filter.call(document.querySelectorAll(selector), (tag) => {
      return new RegExp(this.themePrefixes.join('|')).test(tag.innerText);
    })
  }

  appendIdToThemeRows() {
    let themes = this.getThemesFromSelector(this.unpublishedThemeNameSelector)
      .concat(this.getThemesFromSelector(this.liveThemeNameSelector));

    themes.forEach((item, i) => {
      // There will be a better way to do this!
      let row = item.parentElement.parentElement.parentElement.parentElement.parentElement;

      if (item.tagName.toLowerCase() === 'h2') {
        row = item.parentElement.parentElement.parentElement;
      }

      // Get the URL to the customiser for the theme
      let customiseUrl = row.querySelector('a').getAttribute('href');

      // Get the theme ID from the URL
      const themeId = customiseUrl.match(/([0-9]+)/g)[0];

      // Add the span to the theme's row
      const firstDiv = row.querySelector('div:first-of-type');

      firstDiv.appendChild(
        this.createThemeIdSpan(themeId)
      );
    });
  }

  /**
   * Create a span containing the theme ID as a string.
   *
   * @returns {Element}
   */
  createThemeIdSpan(themeId) {
    const previewUrl = `${window.location.origin}?preview_theme_id=${themeId}`;

    const themeIdSpan = document.createElement('span');
    themeIdSpan.setAttribute('style', 'display: block');
    themeIdSpan.classList.add('theme-id');
    themeIdSpan.innerHTML = `
          Theme ID: <span data-copy-theme-id="${themeId}">${themeId}</span>
          <span data-copy-preview-url="${previewUrl}">Copy preview URL</span>
    `;

    return themeIdSpan;
  }

  addEventHandlers() {
    document.querySelectorAll('[data-copy-theme-id]')
      .forEach((item, i) => {
        item.addEventListener('click', e => {
          navigator.clipboard.writeText(e.target.dataset.copyThemeId);
          this.showCopiedMessage(e.target);
        });
      });

    document.querySelectorAll('[data-copy-preview-url]')
      .forEach((item, i) => {
        item.addEventListener('click', e => {
          navigator.clipboard.writeText(e.target.dataset.copyPreviewUrl);
          this.showCopiedMessage(e.target);
        });
      });
  }

  showCopiedMessage(element) {
    const original = element.innerText;
    element.innerText = 'Copied to clipboard!';

    setTimeout(() => element.innerText = original, 1000);
  }
}

setTimeout(() => new AdminThemeIdTool, 500);
