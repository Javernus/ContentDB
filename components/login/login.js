/**
 * The Login component. An interface item made for the dialog to allow a person to log in or sign up.
 * Attributes
 *  - signup: determines whether to show the sign in or sign up page.
 */
class Login extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.signup = false;
    this.open = false;

    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/login/login.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div containing the tabs. */
    const loginTabs = document.createElement("div");
    loginTabs.classList.add("login__tabs");
    this.shadow.appendChild(loginTabs);

    /* The div button for the sign in page. */
    const signIn = document.createElement("div");
    signIn.textContent = "Sign in";
    signIn.classList.add("login__tab");
    !this.signup && signIn.classList.add("login__tab--active");
    signIn.addEventListener("click", this.showSignIn.bind(this));
    loginTabs.appendChild(signIn);

    /* Save a reference of the signIn tab for dynamic state change. */
    this.signInElement = signIn;

    /* The div button for the sign up page. */
    const signUp = document.createElement("div");
    signUp.textContent = "Sign up";
    signUp.classList.add("login__tab");
    this.signup && signUp.classList.add("login__tab--active");
    signUp.addEventListener("click", this.showSignUp.bind(this));
    loginTabs.appendChild(signUp);

    /* Save a reference of the signUp tab for dynamic state change. */
    this.signUpElement = signUp;

    /* The div containing the inputs for sign in. */
    const signInInputs = document.createElement("div");
    signInInputs.classList.add("login__inputs");
    !this.signup && signInInputs.classList.add("login__inputs--active");
    this.shadow.appendChild(signInInputs);

    /* Save a reference of the signInInputs container for dynamic state change. */
    this.signInInputsElement = signInInputs;

    /* The email input. */
    const signInEmailInput = document.createElement("cdb-input");
    signInEmailInput.setAttribute("placeholder", "Enter your email...");
    signInEmailInput.addEventListener("input", this.handleLoginChange.bind(this));
    signInInputs.appendChild(signInEmailInput);

    /* Save a reference of the signInEmailInput for dynamic state change. */
    this.signInEmailElement = signInEmailInput;

    /* The password input. */
    const signInPasswordInput = document.createElement("cdb-input");
    signInPasswordInput.setAttribute("type", "password");
    signInPasswordInput.setAttribute("placeholder", "Enter your password...");
    signInPasswordInput.addEventListener("input", this.handleLoginChange.bind(this));
    signInInputs.appendChild(signInPasswordInput);

    /* Save a reference of the signInPasswordInput for dynamic state change. */
    this.signInPasswordElement = signInPasswordInput;

    /* The submit button. */
    const signInSubmitButton = document.createElement("cdb-button");
    signInSubmitButton.setAttribute("label", "Log in");
    signInSubmitButton.addEventListener("click", this.signIn.bind(this));
    signInInputs.appendChild(signInSubmitButton);

    /* The div containing the inputs for sign up. */
    const signUpInputs = document.createElement("div");
    signUpInputs.classList.add("login__inputs");
    this.signup && signUpInputs.classList.add("login__inputs--active");
    this.shadow.appendChild(signUpInputs);

    /* Save a reference of the signUpInputs container for dynamic state change. */
    this.signUpInputsElement = signUpInputs;

    /* The username input. */
    const signUpUsernameInput = document.createElement("cdb-input");
    signUpUsernameInput.setAttribute("placeholder", "Enter a username...");
    signUpUsernameInput.addEventListener("change", this.handleUsername.bind(this));
    signUpInputs.appendChild(signUpUsernameInput);

    /* Save a reference of the signUpUsernameInput for dynamic state change. */
    this.signUpUsernameElement = signUpUsernameInput;

    /* The email input. */
    const signUpEmailInput = document.createElement("cdb-input");
    signUpEmailInput.setAttribute("placeholder", "Enter your email...");
    signUpEmailInput.addEventListener("change", this.handleEmail.bind(this));
    signUpInputs.appendChild(signUpEmailInput);

    /* Save a reference of the signUpEmailInput for dynamic state change. */
    this.signUpEmailElement = signUpEmailInput;

    /* The passwerd input. */
    const signUpPasswordInput = document.createElement("cdb-input");
    signUpPasswordInput.setAttribute("type", "password");
    signUpPasswordInput.setAttribute("placeholder", "Enter a password...");
    signUpPasswordInput.addEventListener("input", this.handlePassword.bind(this));
    signUpInputs.appendChild(signUpPasswordInput);

    /* Save a reference of the signUpPasswordInput for dynamic state change. */
    this.signUpPasswordElement = signUpPasswordInput;

    /* The second password input. */
    const signUpPasswordTwoInput = document.createElement("cdb-input");
    signUpPasswordTwoInput.setAttribute("type", "password");
    signUpPasswordTwoInput.setAttribute("placeholder", "Enter the password again...");
    signUpPasswordTwoInput.addEventListener("input", this.handlePassword.bind(this));
    signUpInputs.appendChild(signUpPasswordTwoInput);

    /* Save a reference of the signUpPasswordTwoInput for dynamic state change. */
    this.signUpPasswordTwoElement = signUpPasswordTwoInput;

    /* The submit button. */
    const signUpSubmitButton = document.createElement("cdb-button");
    signUpSubmitButton.setAttribute("label", "Sign up");
    signUpSubmitButton.addEventListener("click", this.signUp.bind(this));
    signUpInputs.appendChild(signUpSubmitButton);

    /* Save a reference of the signUpSubmitButton for dynamic state change. */
    this.signUpSubmitButtonElement = signUpSubmitButton;
  }

  handleLoginChange() {
    this.signInEmailElement.removeAttribute("error");
    this.signInPasswordElement.removeAttribute("error");
  }

  /* Shows the sign in inputs in the login component. */
  showSignIn() {
    this.setAttribute("signup", false);
  }

  /* Shows the sign up inputs in the login component. */
  showSignUp() {
    this.setAttribute("signup", true);
  }

  handleEmail() {
    const email = this.signUpEmailElement.value;

    const data = { email: email };

    postFetch("../php/emailExists.php", data, false, (res) => {
      if (res === "true") {
        this.signUpEmailElement.setAttribute("error", true);
      } else if (res === "false") {
        this.signUpEmailElement.removeAttribute("error");
      }
    });
  }

  handleUsername() {
    const username = this.signUpUsernameElement.value;

    const data = { username: username };

    postFetch("../php/usernameExists.php", data, false, (res) => {
      if (res === "true") {
        this.signUpUsernameElement.setAttribute("error", true);
      } else if (res === "false") {
        this.signUpUsernameElement.removeAttribute("error");
      }
    });
  }

  handlePassword() {
    const password = this.signUpPasswordElement.value;
    const passwordTwo = this.signUpPasswordTwoElement.value;

    if (password !== passwordTwo && passwordTwo !== "") {
      this.signUpPasswordTwoElement.setAttribute("error", true);
    } else {
      this.signUpPasswordTwoElement.removeAttribute("error");
    }
  }

  signUp() {
    const username = this.signUpUsernameElement.value;
    const email = this.signUpEmailElement.value;
    const password = this.signUpPasswordElement.value;
    const passwordTwo = this.signUpPasswordTwoElement.value;

    if (
      password != passwordTwo ||
      this.signUpUsernameElement.getAttribute("error") ||
      this.signUpEmailElement.getAttribute("error")
    ) {
      return;
    }

    const data = { username: username, email: email, password: password };

    postFetch("../php/signUp.php", data, false, (res) => {
      switch (res) {
        case "success":
          this.dispatchEvent(new CustomEvent("signup"));
          break;
        case "limitreached":
          // Add text to indicate waiting
          break;
      }
    });
  }

  signIn() {
    const email = this.signInEmailElement.value;
    const password = this.signInPasswordElement.value;

    const data = { email: email, password: password };

    postFetch("../php/login.php", data, false, (res) => {
      if (res === "true") {
        this.dispatchEvent(new CustomEvent("login"));
      } else {
        this.signInEmailElement.setAttribute("error", true);
        this.signInPasswordElement.setAttribute("error", true);
      }
    });
  }

  /* Returns the attributes which should be observed. */
  static get observedAttributes() {
    return ["signup", "open"];
  }

  /* Handles attributes changing. */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[name] = newValue;

    /* Updates only the necessary parts of the component on update. */
    if (name === "signup") {
      if (newValue == "true") {
        this.signInElement.classList.remove("login__tab--active");
        this.signUpElement.classList.add("login__tab--active");
        this.signInInputsElement.classList.remove("login__inputs--active");
        this.signUpInputsElement.classList.add("login__inputs--active");
      } else {
        this.signInElement.classList.add("login__tab--active");
        this.signUpElement.classList.remove("login__tab--active");
        this.signInInputsElement.classList.add("login__inputs--active");
        this.signUpInputsElement.classList.remove("login__inputs--active");
      }
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-login", Login);
