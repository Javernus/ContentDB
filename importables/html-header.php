<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ContentDB</title>

    <link href="/theme/colours.css" rel="stylesheet">
    <link href="/theme/main.css" rel="stylesheet">
    <link href="./style.css" rel="stylesheet">

    <script type="text/javascript" src="../components/nav-bar/nav-bar.js"></script>
    <script type="text/javascript" src="../components/nav-item/nav-item.js"></script>
    <script type="text/javascript" src="../components/icon/icon.js"></script>
    <script type="text/javascript" src="../components/icon/responsive-icon.js"></script>
    <script type="text/javascript" src="../components/carousel/carousel.js"></script>
    <script type="text/javascript" src="../components/carousel-item/carousel-item.js"></script>
    <script type="text/javascript" src="../components/button/button.js"></script>
    <script type="text/javascript" src="../components/input/input.js"></script>
    <script type="text/javascript" src="../components/dialog/dialog.js"></script>
    <script type="text/javascript" src="../components/login/login.js"></script>
    <script type="text/javascript" src="../components/browse-card/browse-card.js"></script>
    <script type="text/javascript" src="../components/browse-row/browse-row.js"></script>
    <script type="text/javascript" src="../components/watch-item/watch-item.js"></script>
    <script type="text/javascript" src="../components/rating/rating.js"></script>

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
            console.log(error);
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
    <cdb-navigation-bar id="navigation-bar">
      <cdb-navigation-item slot="items" label="Home" href="/home/"><cdb-icon slot="icon" src="/src/nav.svg#home" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="items" label="Browse" href="/browse/"><cdb-icon slot="icon" src="/src/nav.svg#browse" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="items" label="Search TBWO" href="/search/"><cdb-icon slot="icon" src="/src/nav.svg#search" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="bottom-items" label="Settings" href="/settings/"><cdb-icon slot="icon" src="/src/nav.svg#settings" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>

      <script>
        /* Script by Jake. */

        /* Set whether you are logged in for JS. */
        const loggedIn = <?php echo isset($_COOKIE["UserID"]) ? "true" : "false"; ?>;

        /* Get the navigation bar to append children to it for changes based on login state. */
        const bar = document.getElementById("navigation-bar");

        /* The navigation items. */

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

      function signOut() {
        postFetch("../php/logout.php", {}, false, () => {});

          navItemProfile.classList.add("nav-item--hidden");
          navItemSignOut.classList.add("nav-item--hidden");
          navItemSignIn.classList.remove("nav-item--hidden");
        }

        /* Updates the nav bar and hides the dialog on login. */
        function handleLogin() {
          dialog.removeAttribute("open");
          navItemProfile.classList.remove("nav-item--hidden");
          navItemSignOut.classList.remove("nav-item--hidden");
          navItemSignIn.classList.add("nav-item--hidden");
        }

        /* Create the dialog with login. */

        const dialog = document.createElement("cdb-dialog");
        dialog.setAttribute("id", "login-dialog");
        document.body.appendChild(dialog);

        const login = document.createElement("cdb-login");
        login.setAttribute("id", "user-login");
        login.addEventListener("login", handleLogin);
        login.addEventListener("signup", handleLogin);
        dialog.appendChild(login);

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
    </cdb-navigation-bar>
    <div class="content">
