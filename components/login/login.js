/**
 * The Login component. An interface item made for the dialog to allow a person to log in or sign up.
 * Attributes
 *  - signup: determines whether to show the sign in or sign up page.
 *
 * Made by Jake.
 */
class Login extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.signup = false;
  }

  connectedCallback() {
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

    /* The form to enable autocomplete. */
    const form = document.createElement("form");
    form.setAttribute("autocomplete", "on");
    this.shadow.appendChild(form);

    /* The div containing the inputs for sign in. */
    const signInInputs = document.createElement("div");
    signInInputs.classList.add("login__inputs");
    !this.signup && signInInputs.classList.add("login__inputs--active");
    form.appendChild(signInInputs);

    /* Save a reference of the signInInputs container for dynamic state change. */
    this.signInInputsElement = signInInputs;

    /* Placeholder div for status text */
    const status = document.createElement("div");
    status.classList.add("login__status");
    status.textContent = "status";
    signInInputs.appendChild(status);

    this.signInStatus = status;

    /* The username input. */
    const signInUsernameInput = document.createElement("cdb-input");
    signInUsernameInput.setAttribute("autocomplete", "username");
    signInUsernameInput.setAttribute("name", "username");
    signInUsernameInput.setAttribute("id", "signinusername");
    signInUsernameInput.setAttribute("placeholder", "Enter your username...");
    signInUsernameInput.addEventListener("input", this.handleLoginChange.bind(this));
    signInInputs.appendChild(signInUsernameInput);

    /* Save a reference of the signInUsernameInput for dynamic state change. */
    this.signInUsernameElement = signInUsernameInput;

    /* The password input. */
    const signInPasswordInput = document.createElement("cdb-input");
    signInPasswordInput.setAttribute("type", "password");
    signInPasswordInput.setAttribute("name", "password");
    signInPasswordInput.setAttribute("id", "signinpassword");
    signInPasswordInput.setAttribute("autocomplete", "current-password");
    signInPasswordInput.setAttribute("placeholder", "Enter your password...");
    signInPasswordInput.addEventListener("keypress", this.signInEnter.bind(this));
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
    form.appendChild(signUpInputs);

    /* Save a reference of the signUpInputs container for dynamic state change. */
    this.signUpInputsElement = signUpInputs;

    /* Placeholder div for status text */
    const signUpStatus = document.createElement("div");
    signUpStatus.classList.add("login__status");
    signUpStatus.textContent = "status";
    signUpInputs.appendChild(signUpStatus);

    this.signUpStatus = signUpStatus;

    /* The username input. */
    const signUpUsernameInput = document.createElement("cdb-input");
    signUpUsernameInput.setAttribute("autocomplete", "off");
    signUpUsernameInput.setAttribute("name", "username");
    signUpUsernameInput.setAttribute("id", "signupusername");
    signUpUsernameInput.setAttribute("placeholder", "Enter a username...");
    signUpUsernameInput.addEventListener("change", this.handleUsername.bind(this));
    signUpInputs.appendChild(signUpUsernameInput);

    /* Save a reference of the signUpUsernameInput for dynamic state change. */
    this.signUpUsernameElement = signUpUsernameInput;

    /* The passwerd input. */
    const signUpPasswordInput = document.createElement("cdb-input");
    signUpPasswordInput.setAttribute("type", "password");
    signUpPasswordInput.setAttribute("name", "password");
    signUpPasswordInput.setAttribute("id", "signuppassword");
    signUpPasswordInput.setAttribute("autocomplete", "new-password");
    signUpPasswordInput.setAttribute("placeholder", "Enter a password...");
    signUpPasswordInput.addEventListener("input", this.handlePassword.bind(this));
    signUpInputs.appendChild(signUpPasswordInput);

    /* Save a reference of the signUpPasswordInput for dynamic state change. */
    this.signUpPasswordElement = signUpPasswordInput;

    /* The second password input. */
    const signUpPasswordTwoInput = document.createElement("cdb-input");
    signUpPasswordTwoInput.setAttribute("type", "password");
    signUpPasswordTwoInput.setAttribute("name", "password");
    signUpPasswordTwoInput.setAttribute("id", "signuppasswordtwo");
    signUpPasswordTwoInput.setAttribute("autocomplete", "new-password");
    signUpPasswordTwoInput.setAttribute("placeholder", "Enter the password again...");
    signUpPasswordTwoInput.addEventListener("keypress", this.signUpEnter.bind(this));
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
    this.signInStatus.style.color = "transparent";
    this.signInUsernameElement.removeAttribute("error");
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

  handleUsername() {
    const username = this.signUpUsernameElement.value;

    const data = { username: username };

    postFetch("../php/usernameExists.php", data, false, (res) => {
      if (res === "true") {
        this.signUpStatus.style.color = "var(--signal)";
        this.signUpStatus.textContent = "Username already exists.";
        this.signUpUsernameElement.setAttribute("error", true);
      } else if (res === "false") {
        this.signUpUsernameElement.removeAttribute("error");
        this.signUpStatus.style.color = "transparent";
      }
    });
  }

  handlePassword() {
    const password = this.signUpPasswordElement.value;
    const passwordTwo = this.signUpPasswordTwoElement.value;

    if (password !== passwordTwo && passwordTwo !== "") {
      this.signUpPasswordTwoElement.setAttribute("error", true);
      this.signUpStatus.style.color = "var(--signal)";
      this.signUpStatus.textContent = "Passwords do not match.";
    } else {
      this.signUpStatus.style.color = "transparent";
      this.signUpPasswordTwoElement.removeAttribute("error");
    }
  }

  signUpEnter(event) {
    if (event.keyCode == 13) {
      this.signUp();
    }
  }

  signUp() {
    const username = this.signUpUsernameElement.value;
    const password = this.signUpPasswordElement.value;
    const passwordTwo = this.signUpPasswordTwoElement.value;

    if (password != passwordTwo || this.signUpUsernameElement.getAttribute("error")) {
      return;
    }

    const data = { username: username, password: password };

    postFetch("../php/signUp.php", data, false, (res) => {
      switch (res) {
        case "success":
          this.dispatchEvent(new CustomEvent("signup"));
          break;
        case "limitreached":
          this.signUpStatus.textContent = "You reached a sign up limit.";
          this.signUpStatus.style.color = "var(--signal)";
          break;
      }
    });
  }

  signInEnter(event) {
    if (event.keyCode == 13) {
      this.signIn();
    }
  }

  signIn() {
    const username = this.signInUsernameElement.value;
    const password = this.signInPasswordElement.value;

    const data = { username: username, password: password };

    postFetch("../php/login.php", data, false, (res) => {
      if (res === "true") {
        this.dispatchEvent(new CustomEvent("login"));
        window.location.href = "/profile";
      } else {
        this.signInStatus.textContent = "Incorrect username or password.";
        this.signInStatus.style.color = "var(--signal)";
        this.signInUsernameElement.setAttribute("error", true);
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
    if (name === "signup" && this.signInElement) {
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
