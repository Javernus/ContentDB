class GenreRow extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.label = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "../components/browse-row/browse-row.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div showing the icons always and text on hover. */
    const heading = document.createElement("h2");
    heading.classList.add("browse__heading");
    heading.textContent = this.label;
    this.shadow.appendChild(heading);
    this.headingElement = heading;

    /* The div showing the icons always and text on hover. */
    const cards = document.createElement("div");
    cards.classList.add("browse__cards");
    this.shadow.appendChild(cards);
    this.cardsElement = cards;

    const slot = document.createElement("slot");
    cards.appendChild(slot);

    /* The x icon to close the dialog. */
    const chevronLeft = document.createElement("cdb-icon-responsive");
    chevronLeft.classList.add("browse__chevron");
    chevronLeft.classList.add("browse__chevron--left");
    chevronLeft.setAttribute("src", "../src/chevrons.svg#left");
    chevronLeft.setAttribute("size", 5);
    chevronLeft.setAttribute("colour", "var(--primary-main)");
    chevronLeft.addEventListener("click", this.scrollLeft.bind(this));
    this.shadow.appendChild(chevronLeft);
    this.chevronLeftElement = chevronLeft;

    /* The x icon to close the dialog. */
    const chevronRight = document.createElement("cdb-icon-responsive");
    chevronRight.classList.add("browse__chevron");
    chevronRight.classList.add("browse__chevron--right");
    chevronRight.setAttribute("src", "../src/chevrons.svg#right");
    chevronRight.setAttribute("size", 5);
    chevronRight.setAttribute("colour", "var(--primary-1)");
    chevronRight.addEventListener("click", this.scrollRight.bind(this));
    this.shadow.appendChild(chevronRight);
    this.chevronRightElement = chevronRight;
  }

  scrollRight() {
    const currentScroll = this.cardsElement.scrollLeft;
    const maxScroll = this.cardsElement.scrollWidth;
    const newScroll = this.cardsElement.scrollLeft + 800;
    this.cardsElement.scrollLeft = newScroll < maxScroll ? newScroll : maxScroll;
  }

  scrollLeft() {
    const currentScroll = this.cardsElement.scrollLeft;
    const newScroll = this.cardsElement.scrollLeft - 800;
    this.cardsElement.scrollLeft = newScroll > 0 ? newScroll : 0;
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
    if (name === "label" && this.headingElement) {
      this.headingElement.textContent = newValue;
    }
  }
}

customElements.define("cdb-browse-row", GenreRow);
