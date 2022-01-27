/**
 * The Button component. An interface item made for the dialog to allow a person to log in or sign up.
 * Attributes
 *  - signup: determines whether to show the sign in or sign up page.
 */
class Button extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.label = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "../components/button/button.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The submit button. */
    this.classList.add("button");

    /* The div containing the inputs for sign up. */
    const label = document.createElement("p");
    label.classList.add("button__label");
    label.textContent = this.label;
    this.shadow.appendChild(label);
    this.labelElement = label;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["label"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "label" && this.labelElement) {
      this.labelElement.textContent = this.label;
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-button", Button);
