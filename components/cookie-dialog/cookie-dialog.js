/**
 * A dialog component. Styles a click-away box in which to show content like a login page.
 * Attributes
 *  - open: determines whether the dialog is visible.
 *
 * Made by Montijn.
 */
class CookieDialog extends HTMLElement {
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
    link.setAttribute("href", "/components/cookie-dialog/cookie-dialog.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The dialog container that hovers in the middle of the screen. */
    this.classList.add("dialog-corner");
    this.open && this.classList.add("dialog-corner--open");

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

    /* cookie dialog content */
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog__content");
    dialog.appendChild(dialogContent);

    /* cookie dialog content text */
    const dialogText = document.createElement("p");
    dialogText.classList.add("dialog__text");
    dialogText.innerHTML =
      "This website uses cookies to ensure you get the best experience on our website. See our <a href='/tos/' class='dialog__policy-link'>Terms of Service and Privacy Policy</a> for more information.";
    dialogContent.appendChild(dialogText);

    /* cookie dialog content button */
    const dialogButton = document.createElement("cdb-button");
    dialogButton.classList.add("dialog__button");
    dialogButton.setAttribute("label", "That's fine");
    dialogButton.addEventListener("click", this.close.bind(this));
    dialogContent.appendChild(dialogButton);
  }

  /* Closes the dialog. */
  close() {
    document.cookie = "cookie-dialog=accepted; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
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
        this.classList.add("dialog-corner--open");
      } else {
        this.classList.remove("dialog-corner--open");
      }
    }
  }

  /* Renders the component based on the given attributes. */
  disconnectedCallback() {
    this.removeEventListener("click", this.close.bind(this));
  }
}

/* Defines the custom element. */
customElements.define("cdb-cookie-dialog", CookieDialog);
