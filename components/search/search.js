/**
 * The Search component. An interface item made for the dialog to allow a person to log in or sign up.
 * Attributes
 *  - signup: determines whether to show the sign in or sign up page.
 */
class Search extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.signup = false;

    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/search/search.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div containing the tabs. */
    const searchTabs = document.createElement("div");
    searchTabs.classList.add("search__tabs");
    this.shadow.appendChild(searchTabs);

    /* The div button for the sign in page. */
    const searchTab = document.createElement("div");
    searchTab.textContent = "Search";
    searchTab.classList.add("search__tab");
    searchTabs.appendChild(searchTab);
    this.searchTabElement = searchTab;

    /* The search input. */
    const searchInput = document.createElement("cdb-input");
    searchInput.setAttribute("placeholder", "Search...");
    searchInput.addEventListener("change", this.handleSearch.bind(this));
    this.shadow.appendChild(searchInput);
    this.searchInputElement = searchInput;

    const resultList = document.createElement("div");
    resultList.classList.add("result-list");
    resultList.setAttribute("tabindex", "-1");
    this.shadow.appendChild(resultList);
    this.resultListElement = resultList;
  }

  focus() {
    this.searchInputElement.focus();
  }

  handleSearch() {
    const searchTerm = this.searchInputElement.value;

    if (searchTerm === "") {
      return;
    }

    const data = { term: searchTerm };

    postFetch("../php/search.php", data, true, (res) => {
      this.resultListElement.innerHTML = "";

      for (const fsid of res) {
        postFetch("../php/getContent.php", { fsid: fsid[0] }, true, (res) => {
          const anchor = document.createElement("a");
          anchor.setAttribute("href", `/content/?FSID=${fsid[0]}`);
          anchor.setAttribute("tabindex", "0");
          this.resultListElement.appendChild(anchor);

          const result = document.createElement("cdb-result");
          result.setAttribute("label", res[1]);
          result.setAttribute("src", res[2]);
          result.setAttribute("rating", res[4]);
          anchor.appendChild(result);
        });
      }
    });
  }
}

/* Defines the custom element. */
customElements.define("cdb-search", Search);
