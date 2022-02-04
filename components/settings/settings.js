/**
 * The settings component. An interface item made for the dialog to allow a person to change their password or delete their account.
 */
class Settings extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    /* Setting the defaults of the attributes. */
    this.open = false;

    /* The link component for the css. */
    const link = document.createElement("link");
    link.setAttribute("href", "/components/settings/settings.css");
    link.setAttribute("rel", "stylesheet");
    this.shadow.appendChild(link);

    /* The div containing the tabs. */
    const settingsTabs = document.createElement("div");
    settingsTabs.classList.add("settings__tabs");
    this.shadow.appendChild(settingsTabs);

    /* The div button for the page. */
    const settingsTab = document.createElement("div");
    settingsTab.textContent = "Account settings";
    settingsTab.classList.add("settings__tab");
    settingsTab.classList.add("settings__tab--active");
    settingsTabs.appendChild(settingsTab);

    /* The div containing the inputs for sign in. */
    const settingsInputs = document.createElement("div");
    settingsInputs.classList.add("settings__inputs");
    settingsInputs.classList.add("settings__inputs--active");
    this.shadow.appendChild(settingsInputs);

    /* Save a reference of the settingsInputs container for dynamic state change. */
    this.settingsInputsElement = settingsInputs;

    /* placeholder for error or success message. */
    const passwordMessage = document.createElement("div");
    passwordMessage.classList.add("settings__message");
    passwordMessage.textContent = "";
    settingsInputs.appendChild(passwordMessage);

    this.passwordMessage = passwordMessage;

    /* The div conataining the cookies toggle. */
    const cookies = document.createElement("div");
    cookies.classList.add("settings__cookies");
    settingsInputs.appendChild(cookies);

    const cookiesText = document.createElement("h3");
    cookiesText.classList.add("settings__cookies--text");
    cookiesText.textContent = "Cookies";
    cookies.appendChild(cookiesText);

    /* The toggle for cookies */
    const cookiesToggle = document.createElement("label");
    cookiesToggle.classList.add("settings__switch");
    cookies.appendChild(cookiesToggle);

    /* The input for the cookies toggle. */
    const cookiesToggleInput = document.createElement("input");
    cookiesToggleInput.setAttribute("type", "checkbox");
    cookiesToggleInput.checked = false;
    cookiesToggle.addEventListener("change", this.turnOffCookies.bind(this));
    cookiesToggle.appendChild(cookiesToggleInput);
    this.cookieToggleElement = cookiesToggle;

    /* The span for the cookies toggle. */
    const cookiesToggleSpan = document.createElement("span");
    cookiesToggleSpan.classList.add("settings__slider");
    cookiesToggleSpan.classList.add("settings__slider--round");
    cookiesToggle.appendChild(cookiesToggleSpan);

    /* The old password input. */
    const signInPasswordInput = document.createElement("cdb-input");
    signInPasswordInput.setAttribute("type", "password");
    signInPasswordInput.setAttribute("placeholder", "Enter old password...");
    signInPasswordInput.addEventListener("input", this.handlesettingsChange.bind(this));
    settingsInputs.appendChild(signInPasswordInput);

    this.signInPasswordInput = signInPasswordInput;

    /* New password input. */
    const signInPasswordTwoInput = document.createElement("cdb-input");
    signInPasswordTwoInput.setAttribute("type", "password");
    signInPasswordTwoInput.setAttribute("placeholder", "Enter new password...");
    signInPasswordTwoInput.addEventListener("input", this.handlePassword.bind(this));
    settingsInputs.appendChild(signInPasswordTwoInput);

    this.signInPasswordTwoInput = signInPasswordTwoInput;

    /* New password input two. */
    const signInPasswordThreeInput = document.createElement("cdb-input");
    signInPasswordThreeInput.setAttribute("type", "password");
    signInPasswordThreeInput.setAttribute("placeholder", "Confirm Password...");
    signInPasswordThreeInput.addEventListener("input", this.handlePassword.bind(this));
    settingsInputs.appendChild(signInPasswordThreeInput);

    /* Save a reference of the signInPasswordInput for dynamic state change. */
    this.signInPasswordThreeInput = signInPasswordThreeInput;

    /* The submit button. */
    const signInSubmitButton = document.createElement("cdb-button");
    signInSubmitButton.setAttribute("label", "Change Password");
    signInSubmitButton.addEventListener("click", this.changePassword.bind(this));
    settingsInputs.appendChild(signInSubmitButton);

    /* Delete account button. */
    const deleteAccountButton = document.createElement("cdb-button");
    deleteAccountButton.setAttribute("label", "Delete Account");
    deleteAccountButton.setAttribute("id", "delete-account-button");
    deleteAccountButton.classList.add("settings__delete");
    deleteAccountButton.addEventListener("click", () => {
      deleteAccountButton.setAttribute("label", "Are you sure?");
      deleteAccountButton.addEventListener("click", this.deleteUser.bind(this));
    });
    settingsInputs.appendChild(deleteAccountButton);
  }

  handlesettingsChange() {
    this.signInPasswordInput.removeAttribute("error");
    this.signInPasswordThreeInput.removeAttribute("error");
  }

  changePassword() {
    const oldPassword = this.signInPasswordInput.value;
    const newPassword = this.signInPasswordTwoInput.value;

    if (newPassword !== this.signInPasswordThreeInput.value) {
      this.signInPasswordThreeInput.setAttribute("error", true);
      return;
    }

    let data = { oldpassword: oldPassword, newpassword: newPassword };

    postFetch("../php/changePassword.php", data, false, (res) => {
      if (res) {
        this.passwordMessage.style.color = "var(--green-signal)";
        this.passwordMessage.textContent = "Password changed successfully";
      } else {
        this.signInPasswordInput.setAttribute("error", true);
        this.passwordMessage.style.color = "var(--signal)";
        this.passwordMessage.textContent = "Incorrect password";
      }
    });
  }

  logout() {
    postFetch("../php/logout.php", {}, false, (response) => {
      window.location.href = "/";
    });
  }

  deleteUser() {
    let data = document.cookie;

    postFetch("../php/deleteUser.php", data, true, (res) => {
      res = JSON.parse(res);
      this.logout();
    });
  }

  handlePassword() {
    const password = this.signInPasswordTwoInput.value;
    const passwordTwo = this.signInPasswordThreeInput.value;

    if (password !== passwordTwo && passwordTwo !== "") {
      this.signInPasswordThreeInput.setAttribute("error", true);
    } else {
      this.signInPasswordThreeInput.removeAttribute("error");
    }
  }

  turnOffCookies() {
    if (!this.cookieToggleElement.checked) {
      // TODO turn off cookies
    }
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
        this.signInElement.classList.remove("settings__tab--active");
        this.signUpElement.classList.add("settings__tab--active");
        this.settingsInputsElement.classList.remove("settings__inputs--active");
        this.signUpInputsElement.classList.add("settings__inputs--active");
      } else {
        this.signInElement.classList.add("settings__tab--active");
        this.signUpElement.classList.remove("settings__tab--active");
        this.settingsInputsElement.classList.add("settings__inputs--active");
        this.signUpInputsElement.classList.remove("settings__inputs--active");
      }
    }
  }
}

/* Defines the custom element. */
customElements.define("cdb-settings", Settings);
