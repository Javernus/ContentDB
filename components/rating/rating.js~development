/**
 * The Rating component. Displays a variable amount of filled stars, adding empty
 * stars till a total of 5 stars is reached.
 * Attributes
 *  - rating: the amount of filled stars.
 */
class Rating extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.rating = 1;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["rating"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    if (name === "rating" && this.star1Element) {
      for (let i = 0; i < 5; i++) {
        if (i < this.rating) {
          this[`star${i}Element`].setAttribute("src", "/src/star.svg#filled");
        } else {
          this[`star${i}Element`].setAttribute("src", "/src/star.svg#outline");
        }
      }

      this.numberElement && (this.numberElement.textContent = this.rating);
    }
  }

  /* Renders the component based on the given attributes. */
  connectedCallback() {
    const link = document.createElement("link");
    link.setAttribute("href", "/components/rating/rating.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    const container = document.createElement("div");
    container.classList.add("rating");
    this.shadow.appendChild(container);

    for (let i = 0; i < 5; i++) {
      const starIcon = document.createElement("cdb-icon");
      starIcon.classList.add("rating__star");
      i === 0 && starIcon.classList.add("rating__star--first");

      if (i < this.rating) {
        starIcon.setAttribute("src", "/src/star.svg#filled");
      } else {
        starIcon.setAttribute("src", "/src/star.svg#outline");
      }

      starIcon.setAttribute("size", 2);
      starIcon.setAttribute("colour", "var(--primary-main)");
      container.appendChild(starIcon);
      this[`star${i}Element`] = starIcon;
    }

    const number = document.createElement("h3");
    number.classList.add("rating__number");
    number.textContent = this.rating;
    container.appendChild(number);
    this.numberElement = number;
  }
}

/* Defines the custom element. */
customElements.define("cdb-rating", Rating);
