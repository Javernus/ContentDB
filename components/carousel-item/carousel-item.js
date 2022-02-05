/**
 * The Carousel Item component. Shows a given image in a carousel. Only works in the cdb-carousel component.
 * Attributes
 *  - alt: the alternative text for the image.
 *  - src: the image source.
 *  - href: the page to link to.
 *
 *  Made by Mario.
 */
class CarouselItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.alt = "";
    this.src = "";
<<<<<<< HEAD
    this.fsid = 0;
    this.link = false;
=======
    this.href = "";
>>>>>>> 1d9ad5d0a94ead05e9e16cbaea6b056829b223e1
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
    this.imageElement = image;

    /* <a> element containing the link to the corresponding movie page. */
    const imageA = document.createElement("a");
<<<<<<< HEAD
    this.link && imageA.setAttribute("href", "/content/?FSID=" + this.fsid);
=======
    imageA.setAttribute("href", this.href);
>>>>>>> 1d9ad5d0a94ead05e9e16cbaea6b056829b223e1
    imageA.appendChild(image);
    this.shadow.appendChild(imageA);
    this.imageaElement = imageA;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
<<<<<<< HEAD
    return ["alt", "src", "fsid", "link"];
=======
    return ["alt", "src", "href"];
>>>>>>> 1d9ad5d0a94ead05e9e16cbaea6b056829b223e1
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

<<<<<<< HEAD
    if (name === "fsid" && this.imageElement) {
=======
    if (name === "href" && this.imageElement) {
>>>>>>> 1d9ad5d0a94ead05e9e16cbaea6b056829b223e1
      if (!!newValue) {
        this.imageAElement.setAttribute("href", newValue);
      } else {
        this.imageElement.removeAttribute("href");
      }
    }

    if (name === "link" && this.imageaElement) {
      if (newValue === "true" || newValue === "") {
        this.imageaElement.setAttribute("href", "/content/?FSID=" + this.fsid);
      } else {
        this.imageaElement.removeAttribute("href");
      }
    }

    if (name === "link" && this.imageaElement) {
      if (newValue === "true" || newValue === "") {
        this.imageaElement.setAttribute("href", "/content/?FSID=" + this.fsid);
      } else {
        this.imageaElement.removeAttribute("href");
      }
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-carousel-item", CarouselItem);
