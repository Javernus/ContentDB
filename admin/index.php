<script>
  const show_stuff =
<?php
  /* PHP by Jake. */
  session_start();
  if (!isset($_COOKIE["UserID"])) {
    include("../error/404.php");
    exit();
  }

  include("../php/isAdmin.php");

  if (!$admin) {
    include("../error/404.php");
    exit();
  }
?>
;</script>

<?php
  include '../importables/html-header.php';
?>

  <div class="centrer">
    <h1>Add content to the Umbrim database.</h1>
    <div id="add-movie">
      <script>
        /* Script by Jake. */
        const addMovieForm = document.getElementById("add-movie");

        const inputEntries = ["Title", "Image URL", "Description", "Rating", "Duration", "ReleaseYear"];
        const inputs = [];

        for (const inputEntry of inputEntries) {
          inputs[inputEntry] = document.createElement("cdb-input");
          inputs[inputEntry].setAttribute("placeholder", `Enter the content ${inputEntry}...`);
          addMovieForm.appendChild(inputs[inputEntry]);
        }

        const submit = document.createElement("cdb-button");
        submit.setAttribute("label", "Add to the database!");
        submit.addEventListener("click", submitContent);
        addMovieForm.appendChild(submit);

        function submitContent() {
          const data = {
            title: inputs[inputEntries[0]].value,
            image: inputs[inputEntries[1]].value,
            description: inputs[inputEntries[2]].value,
            rating: inputs[inputEntries[3]].value,
            duration: inputs[inputEntries[4]].value,
            releaseyear: inputs[inputEntries[5]].value,
          }

          console.log(data);

          postFetch("../php/addContent.php", data, false, () => {})
        }
      </script>
    </div>
  </div>

<?php
  include '../importables/html-footer.php';
?>
