/**
 * The Icon component. Shows an svg through the given src attribute.
 * Attributes
 *  - src: the id to an svg.
 *  - colour: the colour to apply to the svg.
 *  - size: the size of the svg in rem.
 *  - stroke: determines whether to apply stroke or fill colouring.
 *
 * Made by Jake.
 */
class Icon extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.src = "";
    this.colour = "#000000";
    this.size = 3;
    this.stroke = false;
  }

  connectedCallback() {
    this.setAttribute("width", this.size + "rem");
    this.setAttribute("height", this.size + "rem");

    /* The svg element. */
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS("null", "viewPort", "0 0 24 24");
    svg.style.width = this.size + "rem";
    svg.style.height = this.size + "rem";
    this.shadow.appendChild(svg);
    this.svgElement = svg;

    /* The use tag that will show the icon. */
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.src);
    use.setAttribute("width", this.size + "rem");
    use.setAttribute("height", this.size + "rem");
    !this.stroke && (use.style.fill = this.colour);
    this.stroke && (use.style.stroke = this.colour);
    svg.appendChild(use);
    this.useElement = use;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["colour", "size", "src", "stroke"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "colour" && this.useElement) {
      if (this.stroke) {
        this.useElement.style.stroke = newValue ? newValue : "#000000";
      } else {
        this.useElement.style.fill = newValue ? newValue : "#000000";
      }
    }

    if (name === "size" && this.useElement && this.svgElement) {
      if (!newValue) {
        this.size = 3;
      }

      this.setAttribute("width", this.size + "rem");
      this.setAttribute("height", this.size + "rem");
      this.svgElement.style.width = this.size + "rem";
      this.svgElement.style.height = this.size + "rem";
      this.useElement.setAttribute("width", this.size + "rem");
      this.useElement.setAttribute("height", this.size + "rem");
    }

    if (name === "src" && this.useElement) {
      this.useElement.setAttribute("href", newValue);
    }

    if (name === "stroke" && this.useElement) {
      if (newValue) {
        this.useElement.style.stroke = this.colour;
        this.useElement.style.fill = "#00000000";
      } else {
        this.useElement.style.fill = this.colour;
        this.useElement.style.stroke = "#00000000";
      }
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-icon", Icon);
