/**
 * The Input component. An interface item made for the dialog to allow a person to log in or sign up.
 * Attributes
 *  - signup: determines whether to show the sign in or sign up page.
 */
class Input extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.error = false;
    this.type = "text";
    this.value = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/input/input.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The input. */
    const input = document.createElement("input");
    input.classList.add("input");
    this.error && input.classList.add("input--error");
    input.setAttribute("id", this.id);
    input.setAttribute("type", this.type);
    input.setAttribute("placeholder", this.placeholder);
    input.addEventListener("change", this.handleChange.bind(this));
    input.addEventListener("input", this.handleInput.bind(this));
    this.shadow.appendChild(input);

    /* Save a reference of the input for dynamic state change. */
    this.inputElement = input;
  }

  handleChange() {
    this.value = this.inputElement.value;

    const event = new CustomEvent("change", {
      detail: {
        value: this.value,
      },
    });

    this.dispatchEvent(event);
  }

  handleInput() {
    this.value = this.inputElement.value;

    const event = new CustomEvent("input", {
      detail: {
        value: this.value,
      },
    });

    this.dispatchEvent(event);
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["error", "id", "type", "placeholder"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "error" && this.inputElement) {
      if (newValue == "true" || newValue == "") {
        this.inputElement.classList.add("input--error");
      } else {
        this.inputElement.classList.remove("input--error");
      }
    } else if (this.inputElement) {
      this.inputElement[name] = newValue;
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-input", Input);
