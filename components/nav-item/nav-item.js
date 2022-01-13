class NavigationItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.active = false;
    this.href = "";
    this.label = "Label missing...";
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["active", "label", "href"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
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
    const { active, href, label } = this;

    this.shadow.innerHTML = `
            <link href="../components/nav-item/nav-item.css" rel="stylesheet">
            <a class="nav-anchor" href="${href}">
              <div class="nav-item ${active ? "nav-item--active" : ""}">
                <div class="nav-item__icon"><slot name="icon"></slot></div>
                <div class="nav-item__label"><p class="nav-item--label">${label}</p></div>
              </div>
            </a>
          `;
  }
}

/* Defines the custom element. */
customElements.define("cdb-navigation-item", NavigationItem);