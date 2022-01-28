class Carousel extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    /* The link component for the css. */
    const link = document.createElement("link");
    link.href = "../components/carousel/carousel.css";
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
        const input = document.createElement("input");
        input.type = "radio";
        input.id = `item-${index}`;
        this.carouselInputsElement.appendChild(input);
        item.addEventListener("click", this.updateCarousel.bind(this));
        item.setAttribute("for", `item-${index}`);

        if (this.currentItem === undefined) {
          item.classList.add("current");
          this.currentItem = 0;
        }

        if (index === this.currentItem + 1 && !this.nextItem) {
          item.classList.add("next");
          this.nextItem = this.currentItem + 1;
        }

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
    if (event.target.classList.contains("next")) {
      this.children[this.previousItem].classList.remove("previous");
      this.previousItem = this.currentItem;
      this.children[this.currentItem].classList.add("previous");
      this.children[this.currentItem].classList.remove("current");
      this.currentItem = this.nextItem;
      this.children[this.nextItem].classList.add("current");
      this.children[this.nextItem].classList.remove("next");
      this.nextItem = this.nextItem + 1 === this.itemCount ? 0 : this.nextItem + 1;
      this.children[this.nextItem].classList.add("next");
    } else if (event.target.classList.contains("previous")) {
      this.children[this.nextItem].classList.remove("next");
      this.nextItem = this.currentItem;
      this.children[this.currentItem].classList.add("next");
      this.children[this.currentItem].classList.remove("current");
      this.currentItem = this.previousItem;
      this.children[this.previousItem].classList.add("current");
      this.children[this.previousItem].classList.remove("previous");
      this.previousItem = this.previousItem === 0 ? this.itemCount - 1 : this.previousItem - 1;
      this.children[this.previousItem].classList.add("previous");
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-carousel", Carousel);
