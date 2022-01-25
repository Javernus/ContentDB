/**
 * The item-view component. Displays a film or series on a page specifically
 * meant to show more about this item.
 * Attributes
 *  - public-rating: the public rating of the film or series.
 *  - private-rating: the private rating of the film or series.
 *  - src: the src for the image.
 *  - title: the title of the movie or series.
 *  - year: the year the movie or series came out.
 *  - duration: the playtime of the movie or series in minutes.
 *  - description: the description of the movie or series.
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
      this.year = 0;
      this.duration = 0;
      this.src = "";
      this.title = "";
      this.description = "";
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
  
      /* The div containing the title, duration and year of the film or series. */
      const heading = document.createElement("div");
      heading.classList.add("item-view__heading");
      textualInfo.appendChild(heading);
  
      /* The div containing the body of the film description. */
      const body = document.createElement("div");
      body.classList.add("item-view__body");
      textualInfo.appendChild(body);

      /* The title heading. */
      const title = document.createElement("h1");
      title.textContent = this.title;
      heading.appendChild(title);
      this.titleElement = title;

      /* The year of the film or series. */
      const year = document.createElement("h1");
      year.textContent = this.year;
      heading.appendChild(year);
      this.yearElement = year;

      /* The duration of the film or series. */
      const duration = document.createElement("h1");
      duration.textContent = this.duration;
      heading.appendChild(duration);
      this.durationElement = duration;

      
      /* The div containing the button and its dropdown menu */
      const buttoncontainer = document.createElement("div");
      const addButton = document.createElement("button");
      addButton.classList.add("item-view__button");
      addButton.setAttribute("onclick", this.toggleDropdown());
      addButton.innerText = "Add item";
      buttoncontainer.appendChild(addButton);
      heading.appendChild(buttoncontainer);

      /* The dropdown menu to be shown when the button is clicked. */
      const dropdown = document.createElement("div");
      dropdown.classList.add("item-view__dropdown");
      dropdown.id = "dropdown";
      buttoncontainer.appendChild(dropdown);
      
      const toWatch = document.createElement("a");
      toWatch.innerText = "To Watch";
      dropdown.appendChild(toWatch);
      const watched = document.createElement("a");
      watched.innerText = "Watched";
      dropdown.appendChild(watched);
      const watching = document.createElement("a");
      watching.innerText = "Watching";
      dropdown.appendChild(watching);

  
      /* The cdb-rating component for the private rating of the film or series. */
      const private_rating = document.createElement("cdb-private-rating");
      private_rating.setAttribute("private-rating", this.private_rating);
      body.appendChild(private_rating);
      this.privateratingElement = private_rating;

      /* The cdb-rating component for the public rating of the film or series. */
      const public_rating = document.createElement("cdb-private-rating");
      public_rating.setAttribute("public-rating", this.public_rating);
      body.appendChild(public_rating);
      this.publicratingElement = public_rating;

      /* The */
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
      if (name === "public_rating" && this.publicratingElement) {
        this.publicratingElement.setAttribute("public_rating", newValue);
        return;
      }

      if (name === "private_rating" && this.privateratingElement) {
        this.privateratingElement.setAttribute("private_rating", newValue);
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

      if (name === "year" && this.yearElement) {
        this.yearElement.textContent = newValue;
        return;
      }

      if (name === "duration" && this.durationElement) {
        this.durationElement.textContent = newValue;
        return;
      }

      
    }
    toggleDropdown() {
      document.getElementById("dropdown").classList.toggle("item-view__show");
    }
  }
  window.customElements.define("item-view", ItemView);
  