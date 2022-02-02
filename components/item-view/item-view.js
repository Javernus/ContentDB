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
 *  - actors: the most prominent actors playing in the movie or series.
 * 
 * Made by Timo.
 */


 class ItemView extends HTMLElement {
    constructor() {
      super();

      /* Setting default values. */
      this.private_rating = 0;
      this.public_rating = 0;
      this.watchlist = "";
    }
  
    connectedCallback() {
      this.shadow = this.attachShadow({ mode: "open" });
      
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

      /* Favorites button. */
      const favorite = document.createElement("cbd-icon");
      favorite.setAttribute("src", "/src/nav.svg#home")
      favorite.classList.add("item-view__favorite");
      favorite.addEventListener("click", toggleFavorite);
      image.appendChild(favorite);
  
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

      /* The div containing subdivs to align them to the right. */
      const headingStretch = document.createElement("div");
      headingStretch.classList.add("item-view__heading");
      headingStretch.classList.add("item-view__headingStretch");
      heading.appendChild(headingStretch);

      /* The dropdown menu to be shown after the plus button is clicked. */
      const optionsContainer = document.createElement('div');
      optionsContainer.classList.add("item-view__dropdown");

      const watchList = document.createElement("div");
      watchList.classList.add("item-view__select-bar");
      headingStretch.appendChild(watchList);
      
      const watchSelectList = document.createElement("select");
      watchSelectList.addEventListener("change", this.handleSelect.bind(this));
      watchSelectList.classList.add("item-view__select");
      watchList.appendChild(watchSelectList);

      /* The chevron down icon to indicate the select list is a list. */
      const chevronDown = document.createElement("cdb-icon");
      chevronDown.classList.add("item-view__select-chevron");
      chevronDown.setAttribute("src", "../src/chevrons.svg#bottom");
      chevronDown.setAttribute("size", 1.5);
      chevronDown.setAttribute("colour", "var(--text-colour)");
      watchList.appendChild(chevronDown);

   


      const tabs = ["To Watch", "Watching", "Watched"];

      const option = document.createElement("option");
      option.classList.add("item-view__select-option");
      option.toggleAttribute("selected", true);
      option.textContent = "Add to list...";
      watchSelectList.appendChild(option);

      for (const tabName of tabs) {
            const option = document.createElement("option");
            option.classList.add("item-view__select-option");
            // CHECK WHAT WATCHLIST AND SET THE TOGGLE
            option.toggleAttribute("selected", true);
            option.setAttribute("id", tabName);
            option.setAttribute("value", tabName);
            option.textContent = tabName;
            watchSelectList.appendChild(option);
      }

      /* The year of the film or series. */
      const year = document.createElement("h1");
      const yearContainer = document.createElement("div");
      yearContainer.classList.add("item-view__headerBox");
      yearContainer.classList.add("item-view__headerBox:left")

      year.textContent = this.year;
      yearContainer.appendChild(year);
      headingStretch.appendChild(yearContainer)
      this.yearElement = year;

      /* The duration of the film or series. */
      const duration = document.createElement("h1");
      const durationContainer = document.createElement("div");
      durationContainer.classList.add("item-view__headerBox");
      
      duration.textContent = this.duration + "min";
      durationContainer.appendChild(duration);
      headingStretch.appendChild(durationContainer);
      this.durationElement = duration;

      /* The item description. */
      const description = document.createElement("p");
      description.textContent = this.description;
      description.classList.add("item-view__description");
      body.appendChild(description);
      this.descriptionElement = description;

      /* The star actors of the film or series. */
      const actors = document.createElement("p");
      actors.textContent = this.actors;
      actors.classList.add("item-view__actors");
      body.appendChild(actors);
      this.actorsElement = actors;
  
      /* The cdb-rating component for the public rating of the film or series. */
      const public_rating = document.createElement("cdb-rating");
      public_rating.setAttribute("ratable", false);
      public_rating.setAttribute("rating", this.public_rating);
      body.appendChild(public_rating);
      this.publicratingElement = public_rating;

      /* The cdb-rating component for the private rating of the film or series. */
      const private_rating = document.createElement("cdb-rating");
      private_rating.setAttribute("ratable", true);
      private_rating.setAttribute("rating", this.private_rating);
      body.appendChild(private_rating);
      this.privateratingElement = private_rating;
    
    }
  
    /* Returns the attributes which should be observed. */
    static get observedAttributes() {
      return ["watchlist", "private_rating", "public_rating", "src", "title", "actors", "description", "year", "duration"];
    }
  
    /* Handles attributes changing. */
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) {
        return;
      }

      this[name] = newValue;
      /* Updates only the necessary parts of the component on update. */
      if (name === "public_rating" && this.publicratingElement) {
        this.publicratingElement.setAttribute("rating", newValue);
        return;
      }

      if (name === "private_rating" && this.privateratingElement) {
        this.privateratingElement.setAttribute("rating", newValue);
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
      
      if (name === "actors" && this.actorsElement) {
        this.actorsElement.textContent = newValue;
        return;
      }

      if (name === "description" && this.descriptionElement) {
        this.descriptionElement.textContent = newValue;
        return;
      }  
    }

    /* Create a custom event to be caught in item-page/index.php
     * so that the watch lists can be changed appropriately.
     */
    handleSelect(event) {
      const customEvent = new CustomEvent("watchlistchange", {
        detail: {
          value: event.target.value,
        },
      });
      this.dispatchEvent(customEvent);
    }
  }
  window.customElements.define("item-view", ItemView);
  