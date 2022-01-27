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

    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "../components/nav-bar/nav-bar.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div showing the icons always and text on hover. */
    const navBar = document.createElement("div");
    navBar.classList.add("nav-bar");
    this.shadow.appendChild(navBar);

    /* The div showing the icons always and text on hover. */
    const navBarExpander = document.createElement("div");
    navBarExpander.classList.add("nav-bar__expander");
    navBar.appendChild(navBarExpander);

    /* The div containing the logo. */
    const navBarLogo = document.createElement("div");
    navBarLogo.classList.add("nav-bar__logo");
    !this.logoSrc && navBarLogo.classList.add("nav-bar__logo--invisible");
    navBarExpander.appendChild(navBarLogo);

    /* Save a reference of the navBarLogo for dynamic state change. */
    this.navBarLogoElement = navBarLogo;

    const image = document.createElement("img");
    image.src = this.logoSrc;
    navBarLogo.appendChild(image);

    /* Save a reference of the image for dynamic state change. */
    this.imageElement = image;

    /* The div with the slot containing the items. */
    const navItem = document.createElement("div");
    navItem.classList.add("nav-bar__items");
    navBarExpander.appendChild(navItem);

    const slot = document.createElement("slot");
    slot.setAttribute("name", "items");
    navItem.appendChild(slot);

    /* The div with the slot containing the bottom items. */
    const navBottomItem = document.createElement("div");
    navBottomItem.classList.add("nav-bar__bottom-items");
    navBarExpander.appendChild(navBottomItem);

    const bottomSlot = document.createElement("slot");
    bottomSlot.setAttribute("name", "bottom-items");
    navBottomItem.appendChild(bottomSlot);
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

    /* Updates only the necessary parts of the component on update. */
    if (name === "logoSrc") {
      if (newValue) {
        this.navBarLogoElement.classList.remove("nav-bar__logo--invisible");
        this.imageElement.src = newValue;
      } else {
        this.navBarLogoElement.classList.add("nav-bar__logo--invisible");
        this.imageElement.src = "";
      }
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-navigation-bar", NavigationBar);
