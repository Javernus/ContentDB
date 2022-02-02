<?php
  include '../importables/html-header.php';
?>


    <h1 class="title" id="page-title">Umbrim your content.</h1>
    <div id="account-buttons">
      <script>
        /* Script by Jake. */
        const buttonsContainer = document.getElementById("account-buttons");

        const SIbutton = document.createElement("cdb-button");
        SIbutton.setAttribute("label", "Sign In");
        SIbutton.setAttribute("id", "homesignin");
        loggedIn && SIbutton.classList.add("button--hidden");
        SIbutton.addEventListener("click", showLogin);
        buttonsContainer.appendChild(SIbutton);

        const SUbutton = document.createElement("cdb-button");
        SUbutton.setAttribute("label", "Sign Up");
        SUbutton.setAttribute("id", "homesignup");
        loggedIn && SUbutton.classList.add("button--hidden");
        SUbutton.addEventListener("click", showSignUp);
        buttonsContainer.appendChild(SUbutton);

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

    <div class="carousels" id="carousels">
			<div class="carousel-item">
        <h2>New Releases</h2>
        <cdb-carousel>
       	<?php
          include '../php/databaseLogin.php';

          $sql = 'CALL GetNewContent()';
          $stmt = $db->prepare($sql);
        	$stmt->execute();
        	$result = $stmt->fetchAll();

					foreach ($result as $row) {
						echo "<cdb-carousel-item url=$row[Image] src=$row[Image] fsid=$row[0]></cdb-carousel-item>";
					}

        ?>
        </cdb-carousel>
      </div>

      <div class="carousel-item">
        <h2>Top Rated</h2>
        <cdb-carousel>
        <?php
          include '../php/databaseLogin.php';
          $sql = 'CALL GetTopContent()';
          $stmt = $db->prepare($sql);
        	$stmt->execute();
        	$result = $stmt->fetchAll();

					foreach ($result as $row) {
						echo "<cdb-carousel-item url=$row[Image] src=$row[Image] fsid=$row[0]></cdb-carousel-item>";
					}
        ?>
        </cdb-carousel>
      </div>
    </div>

		<div class="slideshow">
			<div class="slide-item">
       	<?php
          include '../php/databaseLogin.php';

					echo "<cdb-browse-row label='New Releases'>";
          $sql = 'SELECT * FROM `content` ORDER BY `ReleaseYear` DESC LIMIT 10';
          $stmt = $db->prepare($sql);
        	$stmt->execute();
        	$result = $stmt->fetchAll();

					foreach ($result as $row) {
						echo "<cdb-browse-card url=$row[Image] src=$row[Image] fsid=$row[0]></cdb-browse-card>";
					}

					echo "</cdb-browse-row>";

        ?>
			</div>

				<div class="slide-item">
       	<?php
          include '../php/databaseLogin.php';

					echo "<cdb-browse-row label='Top rated'>";
          $sql = 'SELECT * FROM `content` ORDER BY `FSID` ASC LIMIT 15';
          $stmt = $db->prepare($sql);
        	$stmt->execute();
        	$result = $stmt->fetchAll();

					foreach ($result as $row) {
						echo "<cdb-browse-card url=$row[Image] src=$row[Image] fsid=$row[0]></cdb-browse-card>";
					}

					echo "</cdb-browse-row>";

        ?>
			</div>
		</div>

<?php
  include '../importables/html-footer.php';
?>
