<!-- This is the home page. This page shows Umbrim's slogan, the sign in and sign up buttons and 
     two carousels of movies and series, which represent "New Releases" and "Top Rated". 

     Made by Mario. 
-->

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

		<!-- Dynamic loading by Montijn -->
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
						echo "<cdb-carousel-item url=$row[Image] src=$row[Image] href='/content/?FSID=$row[0]'></cdb-carousel-item>";
					}

        ?>
        </cdb-carousel>
      </div>

      <!-- Creates a carousel for "Top Rated". -->
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
      <!-- Only creates a slide component of "New Releases" instead of a carousel if a screen is too small for the carousel. -->
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

        <!-- Only creates a slide component of "Top Rated" instead of a carousel if a screen is too small for the carousel. -->
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
