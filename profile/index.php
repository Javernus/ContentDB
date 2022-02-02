<?php
  include '../importables/html-header.php';
?>


<div style='justify-content:left; padding-left: 5%; padding-right: 5%;' id="profilepage">
    <div class='title'>
        <?php

            ini_set('display_errors', 1);
            ini_set('display_startup_errors', 1);
            error_reporting(E_ALL);

            include "../php/databaseLogin.php";

            $user = intval($_COOKIE['UserID']);

            $sql = 'CALL GetUsernameByUID(:p0);';
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':p0',$user,PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch();

            echo "<h1>".$result['Username']."'s profile</h1>";
        ?>
    </div>
    <script>
        /* Scripts by Jake. */

        /* Creates the tab bar and dropdown select. */
        const watchList = document.createElement("div");
        watchList.classList.add("tab-bar");

        const watchSelectList = document.createElement("select");
        watchSelectList.classList.add("tab-select");

        /* The chevron down icon to indicate the select list is a list. */
        const chevronDown = document.createElement("cdb-icon");
        chevronDown.classList.add("tab-select__chevron");
        chevronDown.setAttribute("src", "../src/chevrons.svg#bottom");
        chevronDown.setAttribute("size", 1.5);
        chevronDown.setAttribute("colour", "var(--text-colour)");
        watchList.appendChild(chevronDown);

        const tabs = ["To Watch", "Watching", "Watched", "Favourites", "Friends", "Comments"];

        /* Handles clicking a tab. */
        function showTab(event) {
            const listId = event.target.id.replace("tab", "list");
            const list = document.getElementById(listId);

            /* Update the dropdown. */
            for (const option of watchSelectList.options) {
                option.toggleAttribute("selected", false);

                if (option.id === event.target.id.replace("tab", "option")) {
                    option.toggleAttribute("selected", true);
                }
            }

            /* Update the tabs. */
            for (const tab of watchList.children) {
                tab.classList.remove("tab--active");
            }

            event.target.classList.add("tab--active");

            /* Update the list views. */
            for (const list of document.getElementsByClassName("list-view")) {
                list.classList.remove("list-view--active")
            }

            if (list) {
                list.classList.add("list-view--active")
            }
        }

        /* Handles selecting a tab through the select dropdown. */
        function showSelectTab(event) {
            const listId = event.target.value.replace("option", "list");
            const list = document.getElementById(listId);

            /* Updates the tabs */
            for (const tab of watchList.children) {
                if (tab.nodeName === "DIV") {
                    tab.classList.remove("tab--active");
                }

                if (tab.id === event.target.value.replace("option", "tab")) {
                    console.log(tab);
                    tab.classList.add("tab--active");
                }
            }

            /* Updates the list views. */
            for (const list of document.getElementsByClassName("list-view")) {
                list.classList.remove("list-view--active");
            }

            if (list) {
                list.classList.add("list-view--active");
            }
        }

        /* Creates the tabs for desktop (divs) and mobile (options). */
        for (const tabName of tabs) {
            const tab = document.createElement("div");
            tab.classList.add("tab");
            tabName === "To Watch" && tab.classList.add("tab--active");
            tab.setAttribute("id", tabName.replaceAll(" ", "").toLowerCase() + "tab");
            tab.textContent = tabName;
            tab.addEventListener("click", showTab);
            watchList.appendChild(tab);

            const option = document.createElement("option");
            option.classList.add("tab-option");
            tabName === "To Watch" && option.toggleAttribute("selected", true);
            option.setAttribute("id", tabName.replaceAll(" ", "").toLowerCase() + "option");
            option.setAttribute("value", tabName.replaceAll(" ", "").toLowerCase() + "option");
            option.textContent = tabName;
            option.addEventListener("click", showSelectTab);
            watchSelectList.appendChild(option);
        }

        /* Append the tab bar and dropdown to the page. */
        document.getElementById("profilepage").appendChild(watchList);
        watchSelectList.addEventListener("change", showSelectTab);
        watchList.appendChild(watchSelectList);

    </script>
    <div class='list-container'>
        <div id='towatchlist' class="list-view list-view--active">
            <?php

                $user = intval($_COOKIE['UserID']);
                $state = 1;

                $sql = 'CALL GetWatchlist(:p0,:p1);';
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':p0',$user,PDO::PARAM_INT);
                $stmt->bindParam(':p1',$state,PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetchAll();

                foreach ($result as $row) {
                    $fsid = intval($row['FSID']);
                    $sql = "CALL GetContentByFSID(:p0)";
                    $stmt = $db->prepare($sql);
                    $stmt->bindParam(':p0',$fsid, PDO::PARAM_INT);
                    $stmt->execute();
                    $result = $stmt->fetch();
                    echo "<watch-item title='$result[Title]' src='$result[Image]' rating='3'><p>$result[Description]</p></watch-item>";
                }
            ?>
        </div>
    </div>

    <div class='list-container'>
        <div id='watchinglist' class="list-view">
            <?php

                $user = intval($_COOKIE['UserID']);
                $state = 2;

                $sql = 'CALL GetWatchlist(:p0,:p1);';
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':p0',$user,PDO::PARAM_INT);
                $stmt->bindParam(':p1',$state,PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetchAll();

                foreach ($result as $row) {
                    $fsid = intval($row['FSID']);
                    $sql = "CALL GetContentByFSID(:p0)";
                    $stmt = $db->prepare($sql);
                    $stmt->bindParam(':p0',$fsid, PDO::PARAM_INT);
                    $stmt->execute();
                    $result = $stmt->fetch();
                    echo "<watch-item title='$result[Title]' src='$result[Image]' rating='3'><p>$result[Description]</p></watch-item>";
                }
            ?>
        </div>
    </div>

    <div class='list-container'>
        <div id='watchedlist' class="list-view">
            <?php

                $user = intval($_COOKIE['UserID']);
                $state = 3;

                $sql = 'CALL GetWatchlist(:p0,:p1);';
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':p0',$user,PDO::PARAM_INT);
                $stmt->bindParam(':p1',$state,PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetchAll();

                foreach ($result as $row) {
                    $fsid = intval($row['FSID']);
                    $sql = "CALL GetContentByFSID(:p0)";
                    $stmt = $db->prepare($sql);
                    $stmt->bindParam(':p0',$fsid, PDO::PARAM_INT);
                    $stmt->execute();
                    $result = $stmt->fetch();
                    echo "<watch-item title='$result[Title]' src='$result[Image]' rating='3'><p>$result[Description]</p></watch-item>";
                }
            ?>
        </div>
    </div>
</div>

<?php
  include '../importables/html-footer.php';
?>
