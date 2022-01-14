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

    /* The svg element. */
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS("null", "viewPort", "0 0 24 24");
    svg.setAttribute("width", this.size + "rem");
    svg.setAttribute("height", this.size + "rem");
    this.shadow.appendChild(svg);

    /* Save a reference of the svg for dynamic state change. */
    this.svgElement = svg;

    /* The div holding the icon and label. */
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.src);
    use.setAttribute("width", this.size + "rem");
    use.setAttribute("height", this.size + "rem");
    use.style.fill = this.colour;
    svg.appendChild(use);

    /* Save a reference of the use for dynamic state change. */
    this.useElement = use;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["colour", "size", "src"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    /* Updates only the necessary parts of the component on update. */
    if (name === "colour") {
      this.useElement.style.fill = newValue ? newValue : "#000000";
    }

    if (name === "size") {
      if (!newValue) {
        this.size = 3;
      }

      this.svgElement.setAttribute("width", newValue + "rem");
      this.svgElement.setAttribute("height", newValue + "rem");
      this.useElement.setAttribute("width", newValue + "rem");
      this.useElement.setAttribute("height", newValue + "rem");
    }

    if (name === "src") {
      this.useElement.setAttribute("href", newValue);
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-icon", Icon);
