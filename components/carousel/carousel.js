/** 
 * This is the carousel component on the home page. It will browse through all
 * movies and series that exist in the database and circle through them again
 * if you reach the end.
 * 
 * Made by Mario.
 */

class Carousel extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.href = "/components/carousel/carousel.css";
    link.rel = "stylesheet";
    this.shadow.appendChild(link);

    /* The div containing all the radio inputs. */
    const carouselInputs = document.createElement("div");
    carouselInputs.classList.add("carousel-inputs");
    this.shadow.appendChild(carouselInputs);
    this.carouselInputsElement = carouselInputs;

    /* The div containing the cdb-carousel-items through the slot. */
    const carouselItems = document.createElement("div");
    carouselItems.classList.add("carousel-items");
    this.shadow.appendChild(carouselItems);

    /* The slot with will contain the carousel items. */
    const slot = document.createElement("slot");
    carouselItems.appendChild(slot);
    this.slotElement = slot;
    this.shadowRoot.addEventListener("slotchange", this.setupCarousel.bind(this));
  }

  /* A function to load in the slotted cdb-carousel-item's. */
  setupCarousel() {
    for (const [index, item] of Array.from(this.children).entries()) {
      if (!item.getAttribute("for")) {
        /* Adds radios to allow for clicking. */
        const input = document.createElement("input");
        input.type = "radio";
        input.id = `item-${index}`;
        this.carouselInputsElement.appendChild(input);
        item.addEventListener("click", this.updateCarousel.bind(this));
        item.setAttribute("for", `item-${index}`);

        /* Set this item as current if none are current yet. */
        if (this.currentItem === undefined) {
          item.classList.add("current");
          item.toggleAttribute("link", true);
          this.currentItem = 0;
        }

        /* Adds next if this item is after the current item. */
        if (index === this.currentItem + 1 && !this.nextItem) {
          item.classList.add("next");
          this.nextItem = this.currentItem + 1;
        }

        /* Sets the previous on the item before the current one. */
        if (this.currentItem === 0 && index === this.itemCount) {
          if (this.previousItem) this.children[this.previousItem].classList.remove("previous");
          item.classList.add("previous");
          this.previousItem = index;
        }

        this.itemCount = index + 1;
      }
    }
  }

  /* A function to update the slotted cdb-carousel-item's state (previous, current, next). */
  updateCarousel(event) {
    /* Disallow the next and previous carousel items to redirect you to their content pages. */
    if (event.target.classList.contains("next") || event.target.classList.contains("previous")) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
    }

    /* A lot of code to keep the carousel up to date on click. */
    if (event.target.classList.contains("next")) {
      this.children[this.previousItem].classList.remove("previous");
      this.previousItem = this.currentItem;
      this.children[this.currentItem].classList.add("previous");
      this.children[this.currentItem].classList.remove("current");
      this.children[this.currentItem].toggleAttribute("link", false);
      this.currentItem = this.nextItem;
      this.children[this.nextItem].classList.add("current");
      this.children[this.nextItem].classList.remove("next");
      this.children[this.nextItem].toggleAttribute("link", true);
      this.nextItem = this.nextItem + 1 === this.itemCount ? 0 : this.nextItem + 1;
      this.children[this.nextItem].classList.add("next");
    } else if (event.target.classList.contains("previous")) {
      this.children[this.nextItem].classList.remove("next");
      this.nextItem = this.currentItem;
      this.children[this.currentItem].classList.add("next");
      this.children[this.currentItem].classList.remove("current");
      this.children[this.currentItem].toggleAttribute("link", false);
      this.currentItem = this.previousItem;
      this.children[this.previousItem].classList.add("current");
      this.children[this.previousItem].toggleAttribute("link", true);
      this.children[this.previousItem].classList.remove("previous");
      this.previousItem = this.previousItem === 0 ? this.itemCount - 1 : this.previousItem - 1;
      this.children[this.previousItem].classList.add("previous");
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-carousel", Carousel);
