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
 * Made by Timo, refactored by Jake.
 */
class WatchItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* The defaults for the attributes. */
    this.rating = 1;
    this.src = "";
    this.label = "";
    this.url = "";
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/watch-item/watch-item.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The watch-item container. */
    this.classList.add("watch-item");

    /* The poster image. */
    const image = document.createElement("div");
    image.classList.add("watch-item__image");
    image.style.backgroundImage = `url(${this.src})`;
    this.shadow.appendChild(image);
    this.imageElement = image;

    /* The div containing all textual info of the film or series. */
    const textualInfo = document.createElement("div");
    textualInfo.classList.add("watch-item__info");
    this.shadow.appendChild(textualInfo);

    /* The div containing the title of the film or series. */
    const heading = document.createElement("div");
    heading.classList.add("watch-item__heading");
    textualInfo.appendChild(heading);

    /* The title heading. */
    const title = document.createElement("h1");
    title.textContent = this.label;
    heading.appendChild(title);
    this.titleElement = title;

    /* the url in title */
    const url = document.createElement("a");
    url.classList.add("watch-item__url");
    url.setAttribute("href", this.url);
    url.textContent = this.title;
    title.appendChild(url);

    /* The cdb-rating component for the rating of the film or series. */
    const rating = document.createElement("cdb-rating");
    rating.setAttribute("rating", this.rating);
    rating.setAttribute("ratable", true);
    rating.addEventListener("ratingchange", this.handleRatingChange.bind(this));
    heading.appendChild(rating);
    this.ratingElement = rating;

    /* The div slotting the description of the film or series. */
    const description = document.createElement("div");
    description.classList.add("watch-item__description");
    textualInfo.appendChild(description);

    const slot = document.createElement("slot");
    description.appendChild(slot);
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  handleRatingChange(event) {
    const fsid = this.fsid;
    const uid = this.getCookie("UserID");
    const contentData = { fsid: fsid, uid: uid };

    postFetch("../php/getRating.php", contentData, false, (result) => {
      const userData = { fsid: fsid, uid: uid, rating: event.detail.value };
      if (result == "" || result == "false") {
        postFetch("../php/setRating.php", userData, false, (result) => {
          return;
        });
      } else {
        postFetch("../php/updateRating.php", userData, false, (result) => {
          return;
        });
      }
    });
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["rating", "src", "label", "url", "fsid"];
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
window.customElements.define("watch-item", WatchItem);
