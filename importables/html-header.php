<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Umbrim</title>

    <link href="/theme/colours.css" rel="stylesheet">
    <link href="/theme/main.css" rel="stylesheet">
    <link href="./style.css" rel="stylesheet">

    <script type="text/javascript" src="../components/nav-bar/nav-bar.js"></script>
    <script type="text/javascript" src="../components/nav-item/nav-item.js"></script>
    <script type="text/javascript" src="../components/icon/icon.js"></script>
    <script type="text/javascript" src="../components/content-card/content-card.js"></script>
    <script type="text/javascript" src="../components/icon/responsive-icon.js"></script>
    <script type="text/javascript" src="../components/carousel/carousel.js"></script>
    <script type="text/javascript" src="../components/carousel-item/carousel-item.js"></script>
    <script type="text/javascript" src="../components/button/button.js"></script>
    <script type="text/javascript" src="../components/input/input.js"></script>
    <script type="text/javascript" src="../components/dialog/dialog.js"></script>
    <script type="text/javascript" src="../components/cookie-dialog/cookie-dialog.js"></script>
    <script type="text/javascript" src="../components/login/login.js"></script>
    <script type="text/javascript" src="../components/settings/settings.js"></script>
    <script type="text/javascript" src="../components/search/search.js"></script>
    <script type="text/javascript" src="../components/browse-card/browse-card.js"></script>
    <script type="text/javascript" src="../components/browse-row/browse-row.js"></script>
    <script type="text/javascript" src="../components/watch-item/watch-item.js"></script>
    <script type="text/javascript" src="../components/result/result.js"></script>
    <script type="text/javascript" src="../components/rating/rating.js"></script>
    <script type="text/javascript" src="../components/comment/comment.js"></script>


    <script>
      function postFetch(url, data, json, callback) {
        fetch(url, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            return json ? res.json() : res.text();
          })
          .then((res) => {
            callback(res);
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    </script>
  </head>
  <body>
    <div id="splash-screen">
      <h1>Umbrim: Clean Watch Lists.</h1>
      <div>
        <div class="multi-spinner-container">
          <div class="multi-spinner">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                  <div class="multi-spinner">
                    <div class="multi-spinner">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <?php
        // show cookie dialog if there is no session yet
        if (!isset($_COOKIE['cookie-dialog'])) {
          echo '<cdb-cookie-dialog open="true"></cdb-cookie-dialog>';
        } else {
          include_once("../php/setSession.php");
        }
    ?>

    <cdb-navigation-bar id="navigation-bar">
      <cdb-navigation-item slot="items" label="Home" href="/home/"><cdb-icon slot="icon" src="/src/nav.svg#home" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="items" label="Browse" href="/browse/"><cdb-icon slot="icon" src="/src/nav.svg#browse" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>

      <script>
        /* Script by Jake. */

        /* Set whether you are logged in for JS. */
        const loggedIn = <?php echo isset($_COOKIE["UserID"]) ? "true" : "false"; ?>;
        const isAdmin = <?php
          if (!isset($_COOKIE["UserID"])) {
            echo "false";
          } else {
            include("../php/isAdmin.php");
          }
        ?>;

        /* Get the navigation bar to append children to it for changes based on login state. */
        const bar = document.getElementById("navigation-bar");

        const navItemSearch = document.createElement("cdb-navigation-item");
        navItemSearch.setAttribute("slot", "items");
        navItemSearch.setAttribute("label", "Search");
        navItemSearch.addEventListener("click", toggleSearchDialog);
        bar.appendChild(navItemSearch);

        const navIconSearch = document.createElement("cdb-icon");
        navIconSearch.setAttribute("slot", "icon");
        navIconSearch.setAttribute("src", "/src/nav.svg#search");
        navIconSearch.setAttribute("size", 2);
        navIconSearch.setAttribute("colour", "var(--primary-main)");
        navItemSearch.appendChild(navIconSearch);

        /* The navigation items. */
        const settingsItem = document.createElement("cdb-navigation-item");
        !loggedIn && settingsItem.classList.add("nav-item--hidden");
        settingsItem.setAttribute("slot", "bottom-items");
        settingsItem.setAttribute("id", "settings");
        settingsItem.setAttribute("label", "Settings");
        settingsItem.addEventListener("click", toggleSettings);
        bar.appendChild(settingsItem);

        const settingsIcon = document.createElement("cdb-icon");
        settingsIcon.setAttribute("slot", "icon");
        settingsIcon.setAttribute("src", "/src/nav.svg#settings");
        settingsIcon.setAttribute("size", 2);
        settingsIcon.setAttribute("colour", "var(--primary-main)");
        settingsItem.appendChild(settingsIcon);

        const navItemAdmin = document.createElement("cdb-navigation-item");
        !isAdmin && navItemAdmin.classList.add("nav-item--hidden");
        navItemAdmin.setAttribute("slot", "items");
        navItemAdmin.setAttribute("label", "Add Content");
        navItemAdmin.setAttribute("href", "/admin/");
        bar.appendChild(navItemAdmin);

        const navIconAdmin = document.createElement("cdb-icon");
        navIconAdmin.setAttribute("slot", "icon");
        navIconAdmin.setAttribute("src", "/src/plus.svg#plus");
        navIconAdmin.setAttribute("size", 2);
        navIconAdmin.setAttribute("colour", "var(--primary-main)");
        navItemAdmin.appendChild(navIconAdmin);

        const navItemProfile = document.createElement("cdb-navigation-item");
        !loggedIn && navItemProfile.classList.add("nav-item--hidden");
        navItemProfile.setAttribute("slot", "bottom-items");
        navItemProfile.setAttribute("label", "Profile");
        navItemProfile.setAttribute("href", "/profile/");
        bar.appendChild(navItemProfile);

        const navIconProfile = document.createElement("cdb-icon");
        navIconProfile.setAttribute("slot", "icon");
        navIconProfile.setAttribute("src", "/src/nav.svg#profile");
        navIconProfile.setAttribute("size", 2);
        navIconProfile.setAttribute("colour", "var(--primary-main)");
        navItemProfile.appendChild(navIconProfile);

        const navItemSignOut = document.createElement("cdb-navigation-item");
        !loggedIn && navItemSignOut.classList.add("nav-item--hidden");
        navItemSignOut.setAttribute("slot", "bottom-items");
        navItemSignOut.setAttribute("label", "Sign Out");
        navItemSignOut.addEventListener("click", signOut);
        bar.appendChild(navItemSignOut);

        const navIconSignOut = document.createElement("cdb-icon");
        navIconSignOut.setAttribute("slot", "icon");
        navIconSignOut.setAttribute("src", "/src/nav.svg#sign-out");
        navIconSignOut.setAttribute("size", 2);
        navIconSignOut.setAttribute("colour", "var(--primary-main)");
        navItemSignOut.appendChild(navIconSignOut);

        const navItemSignIn = document.createElement("cdb-navigation-item");
        loggedIn && navItemSignIn.classList.add("nav-item--hidden");
        navItemSignIn.setAttribute("slot", "bottom-items");
        navItemSignIn.setAttribute("label", "Sign In");
        navItemSignIn.addEventListener("click", toggleSignInDialog);
        bar.appendChild(navItemSignIn);

        const navIconSignIn = document.createElement("cdb-icon");
        navIconSignIn.setAttribute("slot", "icon");
        navIconSignIn.setAttribute("src", "/src/nav.svg#sign-in");
        navIconSignIn.setAttribute("size", 2);
        navIconSignIn.setAttribute("colour", "var(--primary-main)");
        navItemSignIn.appendChild(navIconSignIn);

        /* Toggles the login dialog. */
        function toggleSignInDialog() {
          login.removeAttribute("signup");
          dialog.toggleAttribute("open");
        }

        function toggleSettings() {
            settings.toggleAttribute("open");
            settingsDialog.toggleAttribute("open");
        }

        /* Toggles the search dialog. */
        function toggleSearchDialog() {
          searchDialog.toggleAttribute("open");
          search.focus();
        }

        function toggleSettings() {
            settings.toggleAttribute("open");
            settingsDialog.toggleAttribute("open");
        }

      function signOut() {
        postFetch("../php/logout.php", {}, false, () => {});

          navItemAdmin.classList.add("nav-item--hidden");
          settingsItem.classList.add("nav-item--hidden");
          navItemProfile.classList.add("nav-item--hidden");
          navItemSignOut.classList.add("nav-item--hidden");
          navItemSignIn.classList.remove("nav-item--hidden");

          const SUButton = document.getElementById("homesignup");
          const SIButton = document.getElementById("homesignin");

          if (SUButton && SIButton) {
            SUButton.classList.remove("button--hidden");
            SIButton.classList.remove("button--hidden");
          }
        }

        /* Updates the nav bar and hides the dialog on login. */
        function handleLogin() {
          dialog.removeAttribute("open");
          settingsItem.classList.remove("nav-item--hidden");
          navItemProfile.classList.remove("nav-item--hidden");
          navItemSignOut.classList.remove("nav-item--hidden");
          navItemSignIn.classList.add("nav-item--hidden");

          postFetch("../php/isAdmin.php", {}, false, (res) => {
            if (res === "true") {
              navItemAdmin.classList.remove("nav-item--hidden");
            }
          });

          const SUButton = document.getElementById("homesignup");
          const SIButton = document.getElementById("homesignin");

          if (SUButton && SIButton) {
            SUButton.classList.add("button--hidden");
            SIButton.classList.add("button--hidden");
          }
        }

        /* Create the dialog for settings. */
        const settingsDialog = document.createElement("cdb-dialog");
        settingsDialog.setAttribute("id", "settings-dialog");
        document.body.appendChild(settingsDialog);

        const settings = document.createElement("cdb-settings");
        settings.setAttribute("id", "settings");
        settings.setAttribute("open", true);
        settingsDialog.appendChild(settings);

        /* Create the dialog with login. */
        const dialog = document.createElement("cdb-dialog");
        dialog.setAttribute("id", "login-dialog");
        document.body.appendChild(dialog);

        const login = document.createElement("cdb-login");
        login.setAttribute("id", "user-login");
        login.addEventListener("login", handleLogin);
        login.addEventListener("signup", handleLogin);
        dialog.appendChild(login);

        /* Create the dialog with login. */
        const searchDialog = document.createElement("cdb-dialog");
        searchDialog.setAttribute("id", "login-dialog");
        document.body.appendChild(searchDialog);

        const search = document.createElement("cdb-search");
        searchDialog.appendChild(search);

        /* Hide the splash screen after load. */

        const splashScreen = document.getElementById("splash-screen");

        function hideSplashScreen() {
          splashScreen.addEventListener("transitionend", deleteSplashScreen);
          splashScreen.classList.add("disappear");
        }

        function deleteSplashScreen() {
          splashScreen.remove();
        }

        window.addEventListener("load", hideSplashScreen);
      </script>
      <cdb-navigation-item slot="bottom-items" label="ToS & Privacy" href="/tos/"><cdb-icon slot="icon" src="/src/tos.svg#tos" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
    </cdb-navigation-bar>
    <div class="content">
