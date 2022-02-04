/**
 * The item-view component. Displays a film or series on a page specifically
 * meant to show more about this item.
 * Attributes
 *  - public-rating: the public rating of the film or series.
 *  - private-rating: the private rating of the film or series.
 *  - src: the src for the image.
 *  - label: the title of the movie or series.
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
    this.private_rating = 1;
    this.public_rating = 1;
    this.watchlist = "";
    this.logged_in = "false";
    this.favourite = "false";
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

    /* The div containing the title, duration and year of the film or series. */
    const heading = document.createElement("div");
    heading.classList.add("item-view__top");
    this.shadow.appendChild(heading);

    /* The title heading. */
    const title = document.createElement("h1");
    title.textContent = this.title;
    heading.appendChild(title);
    this.titleElement = title;

    /* The year of the film or series. */
    const year = document.createElement("p");
    year.textContent = this.year;
    heading.appendChild(year);
    this.yearElement = year;

    /* The duration of the film or series. */
    const duration = document.createElement("p");
    duration.textContent = Math.floor(this.duration / 60) + "h " + (this.duration % 60) + "min";
    heading.appendChild(duration);
    this.durationElement = duration;

    const watchList = document.createElement("div");
    watchList.classList.add("item-view__select-bar");
    heading.appendChild(watchList);

    /* Favourites div. */
    const fav = document.createElement("div");
    fav.classList.add("fav");
    this.shadow.appendChild(fav);
    fav.addEventListener("click", this.toggleFavourite.bind(this));

    if (this.logged_in != "true") {
      fav.classList.add("item-view__hide");
    }

    /* Favourites button. */
    const favourite = document.createElement("cbd-icon");
    favourite.setAttribute("src", "/src/favourite.svg#outline");
    favourite.setAttribute("size", "4");
    favourite.setAttribute("colour", "var(--primary-main)");
    favourite.classList.add("item-view__favourite");
    fav.appendChild(favourite);
    this.favouriteElement = favourite;

    /* The div containing all textual info of the film or series. */
    const textualInfo = document.createElement("div");
    textualInfo.classList.add("item-view__info");
    this.shadow.appendChild(textualInfo);

    /* The div containing the body of the film description. */
    const body = document.createElement("div");
    body.classList.add("item-view__body");
    textualInfo.appendChild(body);

    /* The dropdown menu to be shown after the plus button is clicked. */
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("item-view__dropdown");

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
      option.setAttribute("id", tabName);
      option.setAttribute("value", tabName);
      option.textContent = tabName;
      watchSelectList.appendChild(option);
    }

    /* The div containing the title, duration and year of the film or series. */
    const middle = document.createElement("div");
    middle.classList.add("item-view__middle");
    this.shadow.appendChild(middle);

    /* The poster image. */
    const image = document.createElement("div");
    image.classList.add("item-view__image");
    image.style.backgroundImage = `url(${this.src})`;
    middle.appendChild(image);
    this.imageElement = image;

    /* The div containing the title, duration and year of the film or series. */
    const middleLeft = document.createElement("div");
    middleLeft.classList.add("item-view__middle-left");
    middle.appendChild(middleLeft);

    /* The div containing the title, duration and year of the film or series. */
    const ratings = document.createElement("div");
    ratings.classList.add("item-view__ratings");
    middleLeft.appendChild(ratings);

    /* The div containing the title, duration and year of the film or series. */
    const ratingPublic = document.createElement("div");
    ratingPublic.classList.add("item-view__rating");
    ratingPublic.classList.add("item-view__rating--public");
    ratings.appendChild(ratingPublic);

    /* The text indicating the public rating. */
    const ratingTextPublic = document.createElement("p");
    ratingTextPublic.textContent = "Public";
    ratingPublic.appendChild(ratingTextPublic);

    /* The cdb-rating component for the public rating of the film or series. */
    const public_rating = document.createElement("cdb-rating");
    public_rating.setAttribute("ratable", false);
    public_rating.setAttribute("rating", this.public_rating);
    ratingPublic.appendChild(public_rating);
    this.publicratingElement = public_rating;

    /* The div containing the title, duration and year of the film or series. */
    const ratingPrivate = document.createElement("div");
    ratingPrivate.classList.add("item-view__rating");
    ratingPrivate.classList.add("item-view__rating--private");
    ratings.appendChild(ratingPrivate);
    this.ratingPrivateElement = ratingPrivate;

    /* The text indicating the private rating. */
    const ratingTextPrivate = document.createElement("p");
    ratingTextPrivate.textContent = "Private";
    ratingPrivate.appendChild(ratingTextPrivate);

    /* The cdb-rating component for the private rating of the film or series. */
    const private_rating = document.createElement("cdb-rating");
    private_rating.setAttribute("ratable", true);
    private_rating.setAttribute("rating", this.private_rating);
    ratingPrivate.appendChild(private_rating);
    private_rating.addEventListener("ratingchange", this.handlePrivateRatingChange.bind(this));
    this.privateratingElement = private_rating;

    if (this.logged_in != "true") {
      private_rating.classList.add("item-view__hide");
    }

    /* The item description. */
    const description = document.createElement("p");
    description.textContent = this.description;
    description.classList.add("item-view__description");
    middleLeft.appendChild(description);
    this.descriptionElement = description;

    /* The star actors of the film or series. */
    const actors = document.createElement("p");
    actors.textContent = this.actors;
    actors.classList.add("item-view__actors");
    body.appendChild(actors);
    this.actorsElement = actors;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return [
      "watchlist",
      "private_rating",
      "public_rating",
      "src",
      "title",
      "actors",
      "description",
      "year",
      "duration",
      "favourite",
      "logged_in",
    ];
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

    if (name === "favourite" && this.favouriteElement) {
      // change icon
      return;
    }

    if (name === "logged_in" && this.favouriteElement) {
      this.toggleFavouriteVisibility();
      this.toggleRatingVisibility();
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

  toggleFavourite(event) {
    if (this.favouriteElement.src == "/src/favourite.svg#outline") {
      this.favouriteElement.setAttribute("src", "/src/favourite.svg#filled");
    } else {
      this.favouriteElement.setAttribute("src", "/src/favourite.svg#outline");
    }

    const customEvent = new CustomEvent("favouriteschange", {
      detail: {
        value: event.target.value,
      },
    });
    this.dispatchEvent(customEvent);
  }

  handlePrivateRatingChange(event) {
    const customEvent = new CustomEvent("ratingchange", {
      detail: {
        value: event.detail.value,
      },
    });
    this.dispatchEvent(customEvent);
  }

  toggleRatingVisibility() {
    this.ratingPrivateElement.classList.toggle("item-view__hide");
  }

  toggleFavouriteVisibility() {
    this.favouriteElement.classList.toggle("item-view__hide");
  }
}
window.customElements.define("item-view", ItemView);
