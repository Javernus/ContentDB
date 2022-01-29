/**
 * The Carousel Item component. Shows a given image in a carousel. Only works in the cdb-carousel component.
 * Attributes
 *  - alt: the alternative text for the image.
 *  - src: the image source.
 */
class CarouselItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.alt = "";
    this.src = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.href = "/components/carousel-item/carousel-item.css";
    link.rel = "stylesheet";
    this.shadow.appendChild(link);

    /* The image tag that displays the given image src. */
    const image = document.createElement("img");
    image.setAttribute("src", this.src);
    image.setAttribute("alt", this.alt);
    this.shadow.appendChild(image);
    this.imageElement = image;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["alt", "src"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "src" && this.imageElement) {
      if (!!newValue) {
        this.imageElement.setAttribute("src", newValue);
      } else {
        this.imageElement.removeAttribute("src");
      }
    }

    if (name === "alt" && this.imageElement) {
      if (!!newValue) {
        this.imageElement.setAttribute("alt", newValue);
      } else {
        this.imageElement.removeAttribute("alt");
      }
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-carousel-item", CarouselItem);
