/**
 * The Input component. An interface item to allow users to type.
 * Attributes
 *  - error: determines whether to show a red error outline.
 *  - type: input attribute passthrough.
 *  - value: the value that updates as the user is typing.
 *  - placeholder: input attribute passthrough.
 *  - autocomplete: input attribute passthrough.
 *  - id: input attribute passthrough.
 *
 * Made by Jake.
 */
class Input extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.error = false;
    this.type = "text";
    this.value = "";
    this.placeholder = "";
    this.name = "";
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
    input.setAttribute("name", this.name);
    input.setAttribute("autocomplete", this.autocomplete);
    input.setAttribute("value", this.value);
    input.addEventListener("change", this.handleChange.bind(this));
    input.addEventListener("input", this.handleInput.bind(this));
    this.shadow.appendChild(input);

    /* Save a reference of the input for dynamic state change. */
    this.inputElement = input;
  }

  focus() {
    this.inputElement.focus();
  }

  blur() {
    this.inputElement.blur();
  }

  /* Handles the <input> updating so the value attribute stays up to date. Sends out a `change` event. */
  handleChange() {
    this.value = this.inputElement.value;

    const event = new CustomEvent("change", {
      detail: {
        value: this.value,
      },
    });

    this.dispatchEvent(event);
  }

  /* Handles the <input> changing so the value attribute stays up to date. Sends out an `input` event. */
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
    return ["autocomplete", "error", "id", "type", "placeholder", "value", "name"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    if (name === "error" && this.inputElement) {
      /* Updates only the necessary parts of the component on update. */
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
