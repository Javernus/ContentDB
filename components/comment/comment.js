/**
 * The Comment component. Displays an instance of a username, timestamp
 * and the corresponding comment.
 *
 * Attributes
 *  - username: the username to be shown.
 *  - timestamp: the timestamp to be shown.
 *  - content: the text to be shown.
 *  - cid: the cid of the comment. Shows delete option if given.
 */

class MovieComment extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.username = "";
    this.timestamp = "";
    this.content = "";
    this.cid;
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["username", "timestamp", "content", "cid"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    if (name === "username" && this.nameElement) {
      this.nameElement.innerText = this.username;
      return;
    }

    if (name === "timestamp" && this.timeElement) {
      this.timeElement.innerText = this.timestamp;
      return;
    }

    if (name === "content" && this.textElement) {
      this.textElement.innerText = this.content;
      return;
    }

    if (name === "cid" && this.trashCanElement) {
      if (this.cid) {
        this.trashCanElement.classList.remove("delete--hidden");
      } else {
        this.trashCanElement.classList.add("delete--hidden");
      }
      return;
    }
  }

  /* Renders the component based on the given attributes. */
  connectedCallback() {
    const link = document.createElement("link");
    link.href = "../components/comment/comment.css";
    link.rel = "stylesheet";
    this.shadow.appendChild(link);

    /* The div element in which all the comment content will be placed. */
    const comment = document.createElement("div");
    comment.classList.add("comment");
    this.shadow.appendChild(comment);

    /* The div in which the comment header information will be placed. */
    const commentHeader = document.createElement("div");
    commentHeader.classList.add("comment__header");
    comment.appendChild(commentHeader);

    /* The divs for the username and timestamp. */
    const headerName = document.createElement("div");
    commentHeader.appendChild(headerName);
    const headerTime = document.createElement("div");
    commentHeader.appendChild(headerTime);
    headerName.classList.add("left");
    headerTime.classList.add("right");
    /* Put the username and timestamp in the comment header. */
    const name = document.createElement("p");
    const time = document.createElement("p");
    name.innerText = this.username;
    time.innerText = this.timestamp;
    this.nameElement = name;
    this.timeElement = time;

    headerName.appendChild(name);
    headerTime.appendChild(time);

    /* The comment content. */
    const content = document.createElement("div");

    content.textContent = this.content;
    this.textElement = content;
    content.classList.add("comment__content");

    comment.appendChild(content);

    const trashCan = document.createElement("cdb-icon");
    trashCan.setAttribute("src", "/src/trash-can.svg#trash-can");
    trashCan.setAttribute("size", 1.5);
    trashCan.setAttribute("colour", "var(--primary-2)");
    trashCan.classList.add("delete");
    !this.cid && trashCan.classList.add("delete--hidden");
    trashCan.addEventListener("click", this.deleteComment.bind(this));
    content.appendChild(trashCan);
    this.trashCanElement = trashCan;
  }

  deleteComment() {
    postFetch("../php/deleteComment.php", { cid: this.cid }, false, (res) => {
      if (res) {
        this.remove();
      }
    });
  }
}

/* Defines the custom element. */
customElements.define("cdb-comment", MovieComment);
