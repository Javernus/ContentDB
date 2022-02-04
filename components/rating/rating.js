/**
 * The Rating component. Displays a variable amount of filled stars, adding empty
 * stars till a total of 5 stars is reached. Users can select stars themselves,
 * adding a personal rating to the corresponding item.
 * Attributes
 *  - rating: the amount of filled stars.
 *  - ratable: bool of whether the user can change the index or not.
 */
class Rating extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.rating = 1;
    this.small = false;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["rating", "ratable", "small"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    if (name === "rating" && this.star1Element && this.numberElement) {
      this.numberElement.textContent = this.rating;

      for (let i = 0; i < 5; i++) {
        if (i < this.rating) {
          this[`star${i}Element`].setAttribute("src", "../src/star.svg#filled");
        } else {
          this[`star${i}Element`].setAttribute("src", "../src/star.svg#outline");
        }
      }
    }

    if (name === "small" && this.star1Element) {
      if (newValue === "true" || newValue === "") {
        this.classList.add("rating--small");
      } else {
        this.classList.remove("rating--small");
      }
    }
  }

  ratingChange(event) {
    if (this.ratable === "true") {
      this.setAttribute("rating", event.target.getAttribute("index"));
      this.numberElement.textContent = this.rating;
    }

    const customEvent = new CustomEvent("ratingchange", {
      detail: {
        value: event.target.getAttribute("index"),
      },
    });
    this.dispatchEvent(customEvent);
  }

  /* Renders the component based on the given attributes. */
  connectedCallback() {
    this.small && this.classList.add("rating--small");

    const link = document.createElement("link");
    link.href = "../components/rating/rating.css";
    link.rel = "stylesheet";
    this.shadow.appendChild(link);

    const container = document.createElement("div");
    container.classList.add("rating");
    this.shadow.appendChild(container);

    for (let i = 0; i < 5; i++) {
      const starIcon = document.createElement("cdb-icon");
      starIcon.classList.add("rating__star");
      starIcon.setAttribute("index", i + 1);
      i === 0 && starIcon.classList.add("rating__star--first");
      starIcon.addEventListener("click", this.ratingChange.bind(this));
      starIcon.setAttribute("cursor", "pointer");

      if (i < this.rating) {
        starIcon.setAttribute("src", "../src/star.svg#filled");
      } else {
        starIcon.setAttribute("src", "../src/star.svg#outline");
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
