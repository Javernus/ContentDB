/**
 * The Icon component. Shows an svg through the given src attribute.
 * Attributes
 *  - src: the id to an svg.
 *  - colour: the colour to apply to the svg.
 *  - size: the size of the svg in rem.
 */
class Icon extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.src = "";
    this.colour = "#000000";
    this.size = 3;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["src", "colour", "size"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    this.render();
  }

  /* Runs code when the component instance first appears on a page. */
  connectedCallback() {
    this.render();
  }

  /* Renders the component based on the given attributes. */
  render() {
    const { colour, size, src } = this;

    this.shadow.innerHTML = `
            <svg viewPort="0 0 24 24" width="${size}rem" height="${size}rem">
              <use href="${src}" fill="${colour}" width="${size}rem" height="${size}rem" />
            </svg>
          `;
  }
}

/* Defines the custom element. */
customElements.define("cdb-icon", Icon);
