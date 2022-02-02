/**
 * The Navigation Bar component. Houses Navigation Items.
 * Attributes
 *  - label: the label visible on mobile. Defaults to Umbrim.
 *
 * Slots
 *  - items: the top navigation items in the bar.
 *  - bottom-items: the bottom navigation items in the bar.
 *
 * Made by Jake.
 */
class NavigationBar extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.logoSrc = "";
    this.label = "Umbrim";

    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/nav-bar/nav-bar.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The nav bar that takes up the necessary space on screen when not opened. */
    const navBar = document.createElement("div");
    navBar.classList.add("nav-bar");
    this.shadow.appendChild(navBar);

    /* The div showing the icons always and text on hover (desktop), or opening on hamburger click (mobile). */
    const navBarExpander = document.createElement("div");
    navBarExpander.classList.add("nav-bar__expander");
    navBar.appendChild(navBarExpander);
    this.navBarExpanderElement = navBarExpander;

    /* The div containing the hamburger and label for mobile. */
    const navBarMobileTop = document.createElement("div");
    navBarMobileTop.classList.add("nav-bar__mobile-top");
    navBarExpander.appendChild(navBarMobileTop);
    this.navBarMobileTopElement = navBarMobileTop;

    /* The hamburger icon to open and close the nav bar on mobile. */
    const hamburgerIcon = document.createElement("cdb-icon");
    hamburgerIcon.classList.add("nav-bar__hamburger");
    hamburgerIcon.setAttribute("src", "/src/nav.svg#hamburger");
    hamburgerIcon.setAttribute("size", 3);
    hamburgerIcon.setAttribute("colour", "var(--primary-main)");
    hamburgerIcon.addEventListener("click", this.toggleBar.bind(this));
    navBarMobileTop.appendChild(hamburgerIcon);

    /* The label in the mobile nav bar. */
    const title = document.createElement("p");
    title.textContent = this.label;
    navBarMobileTop.appendChild(title);
    this.titleElement = title;

    /* A logo in the nav bar. WIP. */
    const image = document.createElement("img");
    image.src = this.logoSrc;
    navBarMobileTop.appendChild(image);
    this.imageElement = image;

    /* The div with the slot containing the navigation items. */
    const navItem = document.createElement("div");
    navItem.classList.add("nav-bar__items");
    navBarExpander.appendChild(navItem);

    const slot = document.createElement("slot");
    slot.setAttribute("name", "items");
    navItem.appendChild(slot);

    /* The div with the slot containing the bottom navigation items. */
    const navBottomItem = document.createElement("div");
    navBottomItem.classList.add("nav-bar__bottom-items");
    navBarExpander.appendChild(navBottomItem);

    const bottomSlot = document.createElement("slot");
    bottomSlot.setAttribute("name", "bottom-items");
    navBottomItem.appendChild(bottomSlot);
  }

  /* Toggles the bar open and closed on mobile. */
  toggleBar() {
    this.navBarExpanderElement.classList.toggle("nav-bar__expander--open");
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["logoSrc", "title"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "logoSrc") {
      if (newValue) {
        this.navBarMobileTopElement.classList.remove("nav-bar__logo--invisible");
        this.imageElement.src = newValue;
      } else {
        this.navBarMobileTopElement.classList.add("nav-bar__logo--invisible");
        this.imageElement.src = "";
      }
    }

    if (name === "title") {
      this.titleElement.textContent = newValue;
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-navigation-bar", NavigationBar);
