class NavigationItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.active = false;
    this.href = "";
    this.label = "Label missing...";

    /* The link component for the css. */
    const link = document.createElement("link");
    link.href = "../components/nav-item/nav-item.css";
    link.rel = "stylesheet";
    this.shadow.appendChild(link);

    /* The anchor element for linking to other pages. */
    const anchor = document.createElement("a");
    anchor.classList.add("nav-anchor");
    this.href && anchor.setAttribute("href", this.href);
    this.shadow.appendChild(anchor);

    /* Save a reference of the anchor for dynamic state change. */
    this.anchorElement = anchor;

    /* The div holding the icon and label. */
    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");
    this.active && navItem.classList.add("nav-item--active");
    anchor.appendChild(navItem);

    /* Save a reference of the navItem for dynamic state change. */
    this.navItemElement = navItem;

    /* The div with the slot for the icon. */
    const navIcon = document.createElement("div");
    navIcon.classList.add("nav-item__icon");
    navItem.appendChild(navIcon);

    const slot = document.createElement("slot");
    slot.name = "icon";
    navIcon.appendChild(slot);

    /* The div with the label. */
    const navLabel = document.createElement("div");
    navLabel.classList.add("nav-item__label");
    navItem.appendChild(navLabel);

    const paragraph = document.createElement("p");
    paragraph.classList.add("nav-item--label");
    paragraph.textContent = this.label;
    navLabel.appendChild(paragraph);

    /* Save a reference of the paragraph for dynamic state change. */
    this.paragraphElement = paragraph;
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

    /* Updates only the necessary parts of the component on update. */
    if (name === "active") {
      if (newValue) {
        this.navItemElement.classList.add("nav-item--active");
      } else {
        this.navItemElement.classList.remove("nav-item--active");
      }
    }

    if (name === "label") {
      this.paragraphElement.textContent = newValue;
    }

    if (name === "href") {
      if (!!newValue) {
        this.anchorElement.href = newValue;
      } else {
        this.anchorElement.removeAttribute("href");
      }
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-navigation-item", NavigationItem);
