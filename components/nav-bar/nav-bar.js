/**
 * The Navigation Bar component. Houses Navigation Items.
 * Attributes
 *  - logoSrc: the src of the logo.
 */
class NavigationBar extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.logoSrc = "";
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["logoSrc"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attr");
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    this.render();
  }

  /* Runs code when the component instance first appears on a page. */
  connectedCallback() {
    this.render();
  }

  /* Renders the component based on the given attributes. */
  render() {
    const { logoSrc } = this;

    this.shadow.innerHTML = `
            <link href="./components/nav-bar/nav-bar.css" rel="stylesheet">
            <div class="nav-bar__icon-space">
              <div class="nav-bar">
                ${
                  logoSrc
                    ? `<div class="nav-bar--logo"><img src="${logoSrc}" /></div>`
                    : ""
                }
                <div class="nav-bar__items"><slot name="items"></slot></div>
                <div class="nav-bar__bottom-items"><slot name="bottom-items"></slot></div>
              </div>
            </div>
          `;
  }
}

/* Defines the custom element. */
customElements.define("cdb-navigation-bar", NavigationBar);
