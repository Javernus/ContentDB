/**
 * The Watch Item component. Displays a film or series in one of the watch lists.
 * Attributes
 *  - rating: the rating of the film or series.
 *  - src: the src for the image.
 *  - label: the title of the movie.
 *
 * Slots
 *  - default: the description.
 *
 * Made by Mario.
 */
class Result extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* The defaults for the attributes. */
    this.rating = 1;
    this.src = "";
    this.label = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/result/result.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The result container. */
    this.classList.add("result");

    /* The poster image. */
    const image = document.createElement("div");
    image.classList.add("result__image");
    image.style.backgroundImage = `url(${this.src})`;
    this.shadow.appendChild(image);
    this.imageElement = image;

    /* The div containing all info of the film or series. */
    const info = document.createElement("div");
    info.classList.add("result__info");
    this.shadow.appendChild(info);

    /* The title heading. */
    const title = document.createElement("h1");
    title.textContent = this.label;
    info.appendChild(title);
    this.titleElement = title;

    /* The cdb-rating component for the rating of the film or series. */
    const rating = document.createElement("cdb-rating");
    rating.setAttribute("rating", this.rating);
    rating.setAttribute("small", true);
    info.appendChild(rating);
    this.ratingElement = rating;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["rating", "src", "label"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "rating" && this.ratingElement) {
      this.ratingElement.setAttribute("rating", newValue);
      return;
    }

    if (name === "src" && this.imageElement) {
      this.imageElement.style.backgroundImage = `url(${newValue})`;
    }

    if (name === "label" && this.titleElement) {
      this.titleElement.textContent = newValue;
    }
  }
}

/* Defines the custom element. */
window.customElements.define("cdb-result", Result);
