/**
 * The content-card component. Displays a film or series on a page specifically
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
 * Made by Timo, updated by Jake.
 */

class ContentCard extends HTMLElement {
  constructor() {
    super();

    /* Setting default values. */
    this.private_rating = 1;
    this.public_rating = 1;
    this.watchlist = 0;
    this.logged_in = false;
    this.favourite = false;
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    /* The link component for the css. */
    const link = document.createElement("link");
    link.href = "../components/content-card/content-card.css";
    link.rel = "stylesheet";
    this.shadow.appendChild(link);

    /* The content-card container. */
    this.classList.add("content-card");

    /* The div containing the title, duration and year of the content, and list dropdown. */
    const heading = document.createElement("div");
    heading.classList.add("content-card__top");
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

    /* The container for the watchlist dropdown. */
    const watchList = document.createElement("div");
    watchList.classList.add("content-card__select-bar");
    !this.logged_in && watchList.classList.add("content-card__hide");
    heading.appendChild(watchList);
    this.watchListElement = watchList;

    /* The select tag for the dropdown. */
    const watchSelectList = document.createElement("select");
    watchSelectList.addEventListener("change", this.handleSelect.bind(this));
    watchSelectList.classList.add("content-card__select");
    watchList.appendChild(watchSelectList);
    this.watchSelectElement = watchSelectList;

    /* The chevron down icon to indicate the select list is a list. */
    const chevronDown = document.createElement("cdb-icon");
    chevronDown.classList.add("content-card__select-chevron");
    chevronDown.setAttribute("src", "../src/chevrons.svg#bottom");
    chevronDown.setAttribute("size", 1.5);
    chevronDown.setAttribute("colour", "var(--text-colour)");
    watchList.appendChild(chevronDown);

    /* The options for the dropdown. */

    const defaultOption = document.createElement("option");
    defaultOption.classList.add("content-card__select-option");
    this.watchlist === 0 && defaultOption.toggleAttribute("selected", true);
    defaultOption.textContent = "Add to list...";
    watchSelectList.appendChild(defaultOption);
    this.watch0Element = defaultOption;

    const tabs = ["To Watch", "Watching", "Watched"];

    for (const [index, tabName] of tabs.entries()) {
      let option = document.createElement("option");
      option.classList.add("content-card__select-option");
      this.watchlist > 0 && tabName === tabs[this.watchlist - 1] && option.toggleAttribute("selected", true);
      option.setAttribute("id", tabName);
      option.setAttribute("value", tabName);
      option.textContent = tabName;
      watchSelectList.appendChild(option);
      console.log(index + 1, `watch${index + 1}Element`);
      this[`watch${index + 1}Element`] = option;
    }

    /* The div containing the title, duration and year of the film or series. */
    const middle = document.createElement("div");
    middle.classList.add("content-card__middle");
    this.shadow.appendChild(middle);

    /* The poster image. */
    const image = document.createElement("div");
    image.classList.add("content-card__image");
    image.style.backgroundImage = `url(${this.src})`;
    middle.appendChild(image);
    this.imageElement = image;

    /* Favourites button. */
    const favourite = document.createElement("cdb-icon");
    if (this.favourite) {
      favourite.setAttribute("src", "/src/favourite.svg#filled");
    } else {
      favourite.setAttribute("src", "/src/favourite.svg#outline");
    }
    favourite.setAttribute("size", 2);
    favourite.setAttribute("colour", "var(--signal)");
    favourite.classList.add("content-card__favourite");
    !this.logged_in && favourite.classList.add("content-card__favourite--hidden");
    favourite.addEventListener("click", this.toggleFavourite.bind(this));
    image.appendChild(favourite);
    this.favouriteElement = favourite;

    /* The div containing the ratings and description. */
    const middleRight = document.createElement("div");
    middleRight.classList.add("content-card__middle-left");
    middle.appendChild(middleRight);

    /* The div containing the ratings. */
    const ratings = document.createElement("div");
    ratings.classList.add("content-card__ratings");
    middleRight.appendChild(ratings);

    /* The div containing the public rating. */
    const ratingPublic = document.createElement("div");
    ratingPublic.classList.add("content-card__rating");
    ratingPublic.classList.add("content-card__rating--public");
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

    /* The div containing the private rating. */
    const ratingPrivate = document.createElement("div");
    ratingPrivate.classList.add("content-card__rating");
    ratingPrivate.classList.add("content-card__rating--private");
    ratings.appendChild(ratingPrivate);
    this.ratingPrivateElement = ratingPrivate;

    /* The text indicating the private rating. */
    const ratingTextPrivate = document.createElement("p");
    ratingTextPrivate.textContent = "Private";
    ratingPrivate.appendChild(ratingTextPrivate);

    /* The cdb-rating component for the private rating of the film or series. */
    const private_rating = document.createElement("cdb-rating");
    !this.logged_in && ratingPrivate.classList.add("content-card__hide");
    private_rating.setAttribute("ratable", true);
    private_rating.setAttribute("rating", this.private_rating);
    ratingPrivate.appendChild(private_rating);
    private_rating.addEventListener("ratingchange", this.handlePrivateRatingChange.bind(this));
    this.privateratingElement = private_rating;

    /* The item description. */
    const description = document.createElement("p");
    description.textContent = this.description;
    description.classList.add("content-card__description");
    middleRight.appendChild(description);
    this.descriptionElement = description;
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
      if (this.favourite) {
        this.favouriteElement.setAttribute("src", "/src/favourite.svg#filled");
      } else {
        this.favouriteElement.setAttribute("src", "/src/favourite.svg#outline");
      }
      return;
    }

    if (name === "watchlist" && this.watch0Element) {
      for (let i = 0; i < 4; i++) {
        console.log(i, this.watchlist, this[`watch${i}Element`]);
        this[`watch${i}Element`].toggleAttribute("selected", i == this.watchlist);
      }

      return;
    }

    if (name === "logged_in" && this.favouriteElement) {
      this.toggleFavouriteVisibility();
      this.toggleRatingVisibility();
      this.toggleWatchListVisibility();
      return;
    }
  }

  /* Create a custom event to indicate a watchlist was chosen. */
  handleSelect() {
    this.watchlist = this.watchSelectElement.value;

    const customEvent = new CustomEvent("watchlistchange", {
      detail: {
        value: this.watchSelectElement.value,
      },
    });

    this.dispatchEvent(customEvent);
  }

  /* Sends out an event to indicate the favourite has been selected or deselected. */
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

  /* Emits an event on rating change. */
  handlePrivateRatingChange(event) {
    const customEvent = new CustomEvent("ratingchange", {
      detail: {
        value: event.detail.value,
      },
    });
    this.dispatchEvent(customEvent);
  }

  /* Toggles the visibility of the private rating. */
  toggleRatingVisibility() {
    this.ratingPrivateElement.classList.toggle("content-card__hide");
  }

  /* Toggles the visibility of the favourite button. */
  toggleFavouriteVisibility() {
    this.favouriteElement.classList.toggle("content-card__hide");
  }

  /* Toggles the visibility of the favourite button. */
  toggleWatchListVisibility() {
    this.watchListElement.classList.toggle("content-card__hide");
  }
}

window.customElements.define("cdb-content-card", ContentCard);
