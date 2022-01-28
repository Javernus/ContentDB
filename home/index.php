<?php
  include '../importables/html-header.php';
?>


    <h1 class="title">Umbrim your content.</h1>
    <div id="account-buttons">
      <script>
        const buttonsContainer = document.getElementById("account-buttons");

        const SUbutton = document.createElement("cdb-button");
        SUbutton.setAttribute("label", "Sign In");
        SUbutton.addEventListener("click", showLogin);
        buttonsContainer.appendChild(SUbutton);

        const SIbutton = document.createElement("cdb-button");
        SIbutton.setAttribute("label", "Sign Up");
        SIbutton.addEventListener("click", showSignUp);
        buttonsContainer.appendChild(SIbutton);

        function showLogin() {
          login.removeAttribute("signup");
          dialog.setAttribute("open", true);
        }

        function showSignUp() {
          login.setAttribute("signup", true);
          dialog.setAttribute("open", true);
        }
      </script>
    </div>

    <div class="carousels">
      <div class="carousel-item">
        <h2>Most Viewed</h2>
        <cdb-carousel>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
        </cdb-carousel>
      </div>

      <div class="carousel-item">
        <h2>Top Rated</h2>
        <cdb-carousel>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
          <cdb-carousel-item src="https://m.media-amazon.com/images/M/MV5BNjViNWRjYWEtZTI0NC00N2E3LTk0NGQtMjY4NTM3OGNkZjY0XkEyXkFqcGdeQXVyMjUxMTY3ODM@._V1_QL75_UX380_CR0,0,380,562_.jpg"></cdb-carousel-item>
        </cdb-carousel>
      </div>
    </div>

<?php
  include '../importables/html-footer.php';
?>
