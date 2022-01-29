class BrowseCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.url = "/images/placeholder.png";
    this.src = "";
    this.srcset = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/browse-card/browse-card.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div showing the icons always and text on hover. */
    const anchor = document.createElement("a");
    anchor.classList.add("browse__anchor");
    this.shadow.appendChild(anchor);
    this.anchorElement = anchor;

    /* The div showing the icons always and text on hover. */
    const card = document.createElement("img");
    card.classList.add("browse__card");
    card.setAttribute("loading", "lazy");
    card.setAttribute(
      "sizes",
      "50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw"
    );
    card.setAttribute("src", this.src);
    card.setAttribute("srcset", this.srcset);
    anchor.appendChild(card);
    this.cardElement = card;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["url", "src", "srcset"];
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
      card.setAttribute("src", this.src);
    }

    if (name === "srcset" && this.cardElement) {
      card.setAttribute("srcset", this.srcset);
    }
  }
}

customElements.define("cdb-browse-card", BrowseCard);
