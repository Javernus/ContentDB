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
    <script type="text/javascript" src="../components/dialog/dialog.js"></script>
    <script type="text/javascript" src="../components/login/login.js"></script>
    <script type="text/javascript" src="../components/genre-card/genre-card.js"></script>
    <script type="text/javascript" src="../components/genre-row/genre-row.js"></script>
    <script type="text/javascript" src="../components/watch-item/watch-item.js"></script>
    <script type="text/javascript" src="../components/rating/rating.js"></script>
    <script type="text/javascript" src="./functions.js"></script>
  </head>
  <body>
    <cdb-navigation-bar>
      <cdb-navigation-item slot="items" label="Home" href="/home/"><cdb-icon slot="icon" src="../src/home.svg#nav-home" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="items" label="Genres" href="/genres/"><cdb-icon slot="icon" src="../src/genres.svg#nav-genres" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="items" label="Search TBWO" href="/search/"><cdb-icon slot="icon" src="../src/search.svg#nav-search" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>
      <cdb-navigation-item slot="bottom-items" label="Settings" href="/settings/"><cdb-icon slot="icon" src="../src/settings.svg#nav-settings" size="2" colour="var(--primary-main)"></cdb-icon></cdb-navigation-item>

      <?php
        const logged_in = true;

        if (logged_in) {
          echo "<cdb-navigation-item slot=\"bottom-items\" label=\"Profile\" href=\"/profile/\"><cdb-icon slot=\"icon\" src=\"../src/profile.svg#nav-profile\" size=\"2\" colour=\"var(--primary-main)\"></cdb-icon></cdb-navigation-item>";
          echo "<cdb-navigation-item slot=\"bottom-items\" label=\"Sign Out\" href=\"/sign-out/\"><cdb-icon slot=\"icon\" src=\"../src/sign-out.svg#nav-sign-out\" size=\"2\" colour=\"var(--primary-main)\"></cdb-icon></cdb-navigation-item>";
          echo "<cdb-navigation-item slot=\"bottom-items\" label=\"Sign In\" onclick=\"toggleSignInDialog()\"><cdb-icon slot=\"icon\" src=\"../src/sign-in.svg#nav-sign-in\" size=\"2\" colour=\"var(--primary-main)\"></cdb-icon></cdb-navigation-item>";
        } else {
          echo "<cdb-navigation-item slot=\"bottom-items\" label=\"Sign In\" onclick=\"toggleSignInDialog()\"><cdb-icon slot=\"icon\" src=\"../src/sign-in.svg#nav-sign-in\" size=\"2\" colour=\"var(--primary-main)\"></cdb-icon></cdb-navigation-item>";
        }
      ?>

    </cdb-navigation-bar>

    <script>
      const show_login = false;

      const centrer = document.createElement("div");
      centrer.classList.add("dialog-centrer");
      document.body.appendChild(centrer);

      const dialog = document.createElement("cdb-dialog");
      show_login && dialog.setAttribute("open", true);
      centrer.appendChild(dialog);

      const login = document.createElement("cdb-login");
      dialog.appendChild(login);

      function toggleSignInDialog() {
        dialog.toggleAttribute("open");
      }
    </script>
    <div class="content">
