/**
 * The item-view component. Displays a film or series on a page specifically
 * meant to show more about this item.
 * Attributes
 *  - public-rating: the public rating of the film or series.
 *  - private-rating: the private rating of the film or series.
 *  - src: the src for the image.
 *  - title: the title of the movie.
 *
 * 
 * 
 * Slots
 *  - default: the description.
 *
 * 
 * 
 * 
 * Made by Timo.
 */


 class ItemView extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
  
      /* The defaults for the attributes. */
      this.private_rating = 0;
      this.public_rating = 0;
      this.src = "";
      this.title = "";
    }
  
    connectedCallback() {
      /* The link component for the css. */
      const link = document.createElement("link");
      link.href = "../components/item-view/item-view.css";
      link.rel = "stylesheet";
      this.shadow.appendChild(link);
  
      /* The watch-item container. */
      this.classList.add("item-view");
  
      /* The poster image. */
      const image = document.createElement("div");
      image.classList.add("item-view__image");
      image.style.backgroundImage = `url(${this.src})`;
      this.shadow.appendChild(image);
      this.imageElement = image;
  
      /* The div containing all textual info of the film or series. */
      const textualInfo = document.createElement("div");
      textualInfo.classList.add("item-view__info");
      this.shadow.appendChild(textualInfo);
  
      /* The div containing the title of the film or series. */
      const heading = document.createElement("div");
      heading.classList.add("item-view__heading");
      textualInfo.appendChild(heading);
  
      /* The title heading. */
      const title = document.createElement("h1");
      title.textContent = this.title;
      heading.appendChild(title);
      this.titleElement = title;
  
      /* The cdb-rating component for the rating of the film or series. */
    //   const rating = document.createElement("cdb-rating");
    //   rating.setAttribute("rating", this.rating);
    //   heading.appendChild(rating);
    //   this.ratingElement = rating;
  
      /* The div slotting the description of the film or series. */
    //   const description = document.createElement("div");
    //   description.classList.add("watch-item__description");
    //   textualInfo.appendChild(description);
  
    //   const slot = document.createElement("slot");
    //   description.appendChild(slot);
    }
  
    /* Returns the attributes which should be observed. */
    static get observedAttributes() {
      return ["private_rating", "public_rating", "src", "title"];
    }
  
    /* Handles attributes changing. */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }
  
      this[name] = newValue;
  
      /* Updates only the necessary parts of the component on update. */
      if (name === "public_rating" && this.ratingElement) {
        this.ratingElement.setAttribute("public_rating", newValue);
        return;
      }

      if (name === "public_rating" && this.ratingElement) {
        this.ratingElement.setAttribute("private_rating", newValue);
        return;
      }
  
      if (name === "src" && this.imageElement) {
        this.imageElement.style.backgroundImage = `url(${newValue})`;
        return;
      }
  
      if (name === "title" && this.titleElement) {
        this.titleElement.textContent = newValue;
        return;
      }
    }
  }
  window.customElements.define("item-view", ItemView);
  