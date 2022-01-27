class GenreRow extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // this.title = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "../components/genre-row/genre-row.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div showing the icons always and text on hover. */
    const heading = document.createElement("h2");
    heading.classList.add("genre__heading");
    heading.textContent = this.title;
    this.shadow.appendChild(heading);
    this.headingElement = heading;

    /* The div showing the icons always and text on hover. */
    const cards = document.createElement("div");
    cards.classList.add("genre__cards");
    this.shadow.appendChild(cards);

    const slot = document.createElement("slot");
    cards.appendChild(slot);
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["title"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "title" && this.headingElement) {
      this.headingElement.textContent = newValue;
    }
  }
}

customElements.define("cdb-genre-row", GenreRow);
