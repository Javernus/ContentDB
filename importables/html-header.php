<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ContentDB</title>

    <link href="../theme/colours.css" rel="stylesheet">
    <link href="../theme/main.css" rel="stylesheet">
    <link href="./style.css" rel="stylesheet">

    <script type="text/javascript" src="../components/nav-bar/nav-bar.js"></script>
    <script type="text/javascript" src="../components/nav-item/nav-item.js"></script>
    <script type="text/javascript" src="../components/icon/icon.js"></script>
    <script type="text/javascript" src="../components/carousel/carousel.js"></script>
    <script type="text/javascript" src="../components/carousel-item/carousel-item.js"></script>
    <script type="text/javascript" src="../components/button/button.js"></script>
    <script type="text/javascript" src="../components/input/input.js"></script>
    <script type="text/javascript" src="../components/dialog/dialog.js"></script>
    <script type="text/javascript" src="../components/login/login.js"></script>
    <script type="text/javascript" src="../components/genre-card/genre-card.js"></script>
    <script type="text/javascript" src="../components/genre-row/genre-row.js"></script>
    <script type="text/javascript" src="../components/watch-item/watch-item.js"></script>
    <script type="text/javascript" src="../components/rating/rating.js"></script>
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
      <cdb-navigation-item slot="items" label="Home" href="/home/"><cdb-icon slot="icon" src="../src/home.svg#nav-home" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="items" label="Genres" href="/genres/"><cdb-icon slot="icon" src="../src/genres.svg#nav-genres" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="items" label="Search TBWO" href="/search/"><cdb-icon slot="icon" src="../src/search.svg#nav-search" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="bottom-items" label="Settings" href="/settings/"><cdb-icon slot="icon" src="../src/settings.svg#nav-settings" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>

      <script>
        const bar = document.getElementById("navigation-bar");
        const loggedIn = <?php echo isset($_COOKIE["UserID"]) ? "true" : "false"; ?>;

        const navItemProfile = document.createElement("cdb-navigation-item");
        !loggedIn && navItemProfile.classList.add("nav-item--hidden");
        navItemProfile.setAttribute("slot", "bottom-items");
        navItemProfile.setAttribute("label", "Profile");
        navItemProfile.setAttribute("href", "/profile/");
        bar.appendChild(navItemProfile);

        const navIconProfile = document.createElement("cdb-icon");
        navIconProfile.setAttribute("slot", "icon");
        navIconProfile.setAttribute("src", "../src/profile.svg#nav-profile");
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
        navIconSignOut.setAttribute("src", "../src/sign-out.svg#nav-sign-out");
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
        navIconSignIn.setAttribute("src", "../src/sign-in.svg#nav-sign-in");
        navIconSignIn.setAttribute("size", 2);
        navIconSignIn.setAttribute("colour", "var(--primary-main)");
        navItemSignIn.appendChild(navIconSignIn);

      function toggleSignInDialog() {
        login.removeAttribute("signup");
        dialog.toggleAttribute("open");
      }

      function signOut() {
        fetch("../php/logout.php", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .catch((error) => {
            console.log(error);
          });

        navItemProfile.classList.add("nav-item--hidden");
        navItemSignOut.classList.add("nav-item--hidden");
        navItemSignIn.classList.remove("nav-item--hidden");
      }

      function signIn() {
        dialog.removeAttribute("open");
        navItemProfile.classList.remove("nav-item--hidden");
        navItemSignOut.classList.remove("nav-item--hidden");
        navItemSignIn.classList.add("nav-item--hidden");
      }

      const dialog = document.createElement("cdb-dialog");
      dialog.setAttribute("id", "login-dialog");
      document.body.appendChild(dialog);

      const login = document.createElement("cdb-login");
      login.setAttribute("id", "user-login");
      login.addEventListener("login", signIn);
      dialog.appendChild(login);

      function hideSplashScreen() {
        const splashScreen = document.getElementById("splash-screen");
        splashScreen.classList.add("disappear");
      }

      window.onload = hideSplashScreen;
      </script>
    </cdb-navigation-bar>
    <div class="content">
