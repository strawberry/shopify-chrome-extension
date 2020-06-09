class ThemeRenameSuggestions {
  /**
   * The list of suggestions to show.
   *
   * @todo Make this list configurable
   *
   * @returns {string[]}
   */
  get suggestions() {
    const currentDate = new Date().toJSON().slice(0, 10);

    return [
      `💾 ${currentDate}`,
      "🛠",
      "✨",
      "🐞",
      "🌍"
    ]
  }

  /**
   * The Polaris input field
   *
   * @returns {HTMLInputElement}
   */
  get inputBox() {
    return document.querySelector('input');
  }

  /**
   * The outer-outer parent of the input box
   *
   * @returns {HTMLElement}
   */
  get inputBoxContainer() {
    return this.inputBox.parentElement.parentElement;
  }

  /**
   * Once added to the page, this will provide an accessor to the suggestion buttons
   *
   * @returns {NodeListOf<Element>}
   */
  get suggestionButtons() {
    return document.querySelectorAll('[data-theme-name-suggestion]')
  }

  init() {
    if (!this.isRenameModal()) {
      return;
    }

    this.addSuggestions();
    this.addEventListeners();
  }

  /**
   * Add the suggestions buttons to the modal
   */
  addSuggestions() {
    const suggestionsContainer = document.createElement('div');

    suggestionsContainer.classList.add('suggestions-container');
    suggestionsContainer.innerHTML = this.suggestions.map(suggestion => {
      return `<button role="button" data-theme-name-suggestion="${suggestion}">${suggestion}</button>`;
    }).join('');

    this.inputBoxContainer.appendChild(suggestionsContainer);
  }

  /**
   * Add event listeners for clicking the suggestions buttons and typing in the field
   */
  addEventListeners() {
    // Add the suggestion into the input field
    this.suggestionButtons.forEach(item => {
      item.addEventListener('click', () => {
        this.inputBox.focus();
        this.inputBox.setAttribute('value', item.dataset.themeNameSuggestion);
        this.inputBox.value = item.dataset.themeNameSuggestion;
        this.showTypingReminder();
      });
    });

    // Hide the typing reminder since the user has already typed
    this.inputBox.addEventListener('input', this.hideTypingReminder);
  }

  /**
   * Remind the user that they must type something in order to let the input
   * field know there has been an update to its content
   */
  showTypingReminder() {
    const existingTypingReminder = document.getElementById('typing-reminder');
    if (existingTypingReminder) {
      return;
    }

    const reminder = document.createElement('div');
    reminder.id = 'typing-reminder';
    reminder.innerText = 'Hit space or continue typing.';
    this.inputBoxContainer.appendChild(reminder);
  }

  /**
   * Hide the typing reminder once the user has typed something and
   * the input field has been updated properly
   */
  hideTypingReminder() {
    const typingReminder = document.getElementById('typing-reminder');
    if (typingReminder) {
      typingReminder.remove();
    }
  }

  /**
   * Determine if the current modal that the script has been injected
   * into is in fact a theme rename modal
   *
   * @returns {boolean}
   */
  isRenameModal() {
    const renameLabel = Array.from(
      document.querySelectorAll('label')
    ).find(item => item.innerText === 'Provide a new name for this theme');

    return typeof renameLabel !== 'undefined';
  }
}

const themeRenameSuggestions = new ThemeRenameSuggestions;
