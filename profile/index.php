<?php
  include '../importables/html-header.php';
?>


<div style='justify-content:left; padding-left: 5%; padding-right: 5%;' id="profilepage">
    <div class='title'>
        <h1>Profile</h1>
    </div>
    <script>
        /* Scripts by Jake. */
        const watchList = document.createElement("div");
        watchList.classList.add("tab-bar");

        const tabs = ["To Watch", "Watching", "Watched", "Favourites", "Friends", "Comments"]

        function showTab(event) {
            const listId = event.target.id.replace("tab", "list");
            const list = document.getElementById(listId);

            for (const tab of event.target.parentElement.children) {
                tab.classList.remove("tab--active");
            }

            event.target.classList.add("tab--active");

            for (const list of document.getElementsByClassName("list-view")) {
                list.classList.remove("list-view--active")
            }

            if (list) {
                list.classList.add("list-view--active")
            }
        }

        for (const tabName of tabs) {
            const tab = document.createElement("div");
            tab.classList.add("tab");
            tabName === "To Watch" && tab.classList.add("tab--active");
            tab.id = tabName.replaceAll(" ", "").toLowerCase() + "tab";
            tab.textContent = tabName;
            tab.addEventListener("click", showTab);
            watchList.appendChild(tab);
        }

        document.getElementById("profilepage").appendChild(watchList);

    </script>
    <div class='list-container'>
        <div id='towatchlist' class="list-view list-view--active"></div>
        <script>
            /* Scripts by Timo, updated by Jake. */
            for (let i = 0; i < 10; i++) {
                const list_element = document.createElement('div');
                list_element.innerHTML = '<watch-item title="Spiderman: Long Title From Home" src="./image/Spiderman.png" rating="3"><p>What is that? A spider?!</p></watch-list>';
                document.getElementById('towatchlist').appendChild(list_element);
            }
        </script>
    </div>
</div>

<?php
  include '../importables/html-footer.php';
?>
