class GenreCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.setAttribute("url", "../images/placeholder.png");
    this.src = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "../components/genre-card/genre-card.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div showing the icons always and text on hover. */
    const anchor = document.createElement("a");
    anchor.classList.add("genre__anchor");
    this.shadow.appendChild(anchor);
    this.anchorElement = anchor;

    /* The div showing the icons always and text on hover. */
    const card = document.createElement("div");
    card.classList.add("genre__card");
    card.style.backgroundImage = `url(${this.src})`;
    anchor.appendChild(card);
    this.cardElement = card;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["url", "src"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "url" && this.anchorElement) {
      this.anchorElement.setAttribute("href", newValue);
    }

    if (name === "src" && this.cardElement) {
      this.cardElement.style.backgroundImage = `url(${newValue})`;
    }
  }
}

customElements.define("cdb-genre-card", GenreCard);
