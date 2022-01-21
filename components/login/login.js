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
    link.href = "../components/login/login.css";
    link.rel = "stylesheet";
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
    const signInEmailInput = document.createElement("input");
    signInEmailInput.classList.add("login__input");
    signInEmailInput.id = "email";
    signInEmailInput.placeholder = "Enter your email...";
    signInInputs.appendChild(signInEmailInput);

    /* Save a reference of the signInEmailInput for dynamic state change. */
    this.signInEmailElement = signInEmailInput;

    /* The password input. */
    const signInPasswordInput = document.createElement("input");
    signInPasswordInput.classList.add("login__input");
    signInPasswordInput.open = true;
    signInPasswordInput.id = "password";
    signInPasswordInput.type = "password";
    signInPasswordInput.placeholder = "Enter your password...";
    signInInputs.appendChild(signInPasswordInput);

    /* Save a reference of the signInPasswordInput for dynamic state change. */
    this.signInPasswordElement = signInPasswordInput;

    /* The submit button. */
    const signInSubmitButton = document.createElement("button");
    signInSubmitButton.classList.add("login__submit");
    signInSubmitButton.type = "submit";
    signInSubmitButton.textContent = "Log in";
    signInInputs.appendChild(signInSubmitButton);

    /* Save a reference of the signInSubmitButton for dynamic state change. */
    this.signInSubmitButtonElement = signInSubmitButton;

    /* The div containing the inputs for sign up. */
    const signUpInputs = document.createElement("div");
    signUpInputs.classList.add("login__inputs");
    this.signup && signUpInputs.classList.add("login__inputs--active");
    this.shadow.appendChild(signUpInputs);

    /* Save a reference of the signUpInputs container for dynamic state change. */
    this.signUpInputsElement = signUpInputs;

    /* The username input. */
    const signUpUsernameInput = document.createElement("input");
    signUpUsernameInput.classList.add("login__input");
    signUpUsernameInput.classList.add("login__input--error");
    signUpUsernameInput.id = "text";
    signUpUsernameInput.placeholder = "Enter a username...";
    signUpInputs.appendChild(signUpUsernameInput);

    /* Save a reference of the signUpUsernameInput for dynamic state change. */
    this.signUpUsernameElement = signUpUsernameInput;

    /* The email input. */
    const signUpEmailInput = document.createElement("input");
    signUpEmailInput.classList.add("login__input");
    signUpEmailInput.id = "email";
    signUpEmailInput.placeholder = "Enter your email...";
    signUpInputs.appendChild(signUpEmailInput);

    /* Save a reference of the signUpEmailInput for dynamic state change. */
    this.signUpEmailElement = signUpEmailInput;

    /* The passwerd input. */
    const signUpPasswordInput = document.createElement("input");
    signUpPasswordInput.classList.add("login__input");
    signUpPasswordInput.open = true;
    signUpPasswordInput.id = "password";
    signUpPasswordInput.type = "password";
    signUpPasswordInput.placeholder = "Enter a password...";
    signUpInputs.appendChild(signUpPasswordInput);

    /* Save a reference of the signUpPasswordInput for dynamic state change. */
    this.signUpPasswordElement = signUpPasswordInput;

    /* The second password input. */
    const signUpPasswordTwoInput = document.createElement("input");
    signUpPasswordTwoInput.classList.add("login__input");
    signUpPasswordTwoInput.open = true;
    signUpPasswordTwoInput.id = "password";
    signUpPasswordTwoInput.type = "password";
    signUpPasswordTwoInput.placeholder = "Enter the password again...";
    signUpInputs.appendChild(signUpPasswordTwoInput);

    /* Save a reference of the signUpPasswordTwoInput for dynamic state change. */
    this.signUpPasswordTwoElement = signUpPasswordTwoInput;

    /* The submit button. */
    const signUpSubmitButton = document.createElement("button");
    signUpSubmitButton.classList.add("login__submit");
    signUpSubmitButton.type = "submit";
    signUpSubmitButton.textContent = "Sign up";
    signUpInputs.appendChild(signUpSubmitButton);

    /* Save a reference of the signUpSubmitButton for dynamic state change. */
    this.signUpSubmitButtonElement = signUpSubmitButton;
  }

  /* Shows the sign in inputs in the login component. */
  showSignIn() {
    this.setAttribute("signup", false);
  }

  /* Shows the sign up inputs in the login component. */
  showSignUp() {
    this.setAttribute("signup", true);
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
