class JiraTicketLinker {
  constructor() {
    this.init();
  }

  init() {
    this.getThemeList().forEach((item, i) => {
      // The live theme won't/shouldn't have a Jira code
      // and won't be matched by the following selector
      const themeName = item.querySelector('h3 > div > div > span');
      if (themeName === null) {
        return;
      }

      // Find a Jira code using regex
      // @see https://community.atlassian.com/t5/Bitbucket-questions/Regex-pattern-to-match-JIRA-issue-key/qaq-p/233319
      const jiraCodeMatches = themeName.innerText.match(/((?<!([A-Z]{1,10})-?)[A-Z]+-\d+)/);

      // If there is no Jira code, move on
      if (! jiraCodeMatches) {
        return;
      }

      const jiraCode = jiraCodeMatches[0];

      // Replace the Jira code with an external link to the ticket
      // @todo Allow for the Jira account name to be configured?
      const account = "teamstrawberry";
      const jiraTicketUrl = `<a href="https://${account}.atlassian.net/browse/${jiraCode}" target="_blank" class="jira-ticket-url">${jiraCode}</a>`;

      themeName.innerHTML = themeName.innerHTML.replace(jiraCode, jiraTicketUrl);
    })
  }

  /**
   * Gets an array of all the theme row elements.
   * Helpful method by Kieran. Would be nice to get this as a utility method somewhere.
   *
   * @returns {Element[]}
   */
  getThemeList() {
    const live = document.querySelectorAll('[testid="PublishedThemeSectionWrapper"]');
    const library = [...document.querySelectorAll('li a[href$="/editor"]')].map(customize => {
      let el = customize;
      while (el.tagName !== 'LI') {
        el = el.parentNode;
      }
      return el;
    });
    return [...live].concat(library);
  }
}

setTimeout(() => new JiraTicketLinker, 500);
