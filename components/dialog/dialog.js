/**
 * A dialog component. Styles a click-away box in which to show content like a login page.
 * Attributes
 *  - open: determines whether the dialog is visible.
 *
 * Made by Jake.
 */
class Dialog extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.open = false;
  }

  /* Create the Dialog component. */
  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/dialog/dialog.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The dialog container that hovers in the middle of the screen. */
    this.classList.add("dialog-centrer");
    this.open && this.classList.add("dialog-centrer--open");

    /* The div showing the icons always and text on hover. */
    const dialog = document.createElement("div");
    dialog.classList.add("dialog");
    this.shadow.appendChild(dialog);

    /* The x icon to close the dialog. */
    const closingIcon = document.createElement("cdb-icon");
    closingIcon.classList.add("dialog__exit");
    closingIcon.setAttribute("src", "/src/x.svg#x");
    closingIcon.setAttribute("stroke", true);
    closingIcon.setAttribute("size", 1.5);
    closingIcon.setAttribute("colour", "var(--primary-main)");
    closingIcon.addEventListener("click", this.close.bind(this));
    dialog.appendChild(closingIcon);

    const slot = document.createElement("slot");
    dialog.appendChild(slot);
  }

  /* Closes the dialog. */
  close() {
    this.removeAttribute("open");
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["open"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "open") {
      if (newValue == "true" || newValue == "") {
        this.classList.add("dialog-centrer--open");
      } else {
        this.classList.remove("dialog-centrer--open");
      }
    }
  }

  /* Renders the component based on the given attributes. */
  disconnectedCallback() {
    this.removeEventListener("click", this.close.bind(this));
  }
}

/* Defines the custom element. */
customElements.define("cdb-dialog", Dialog);
