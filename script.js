function showNotification(message) {

    const notification =
        document.getElementById("notification");

    notification.querySelector("p").textContent =
        message;

    notification.classList.add("show");

    setTimeout(function () {

        notification.classList.remove("show");

    }, 2500);
}


/* SCROLL TO PLAYLISTS */

function scrollToPlaylists() {

    document
        .getElementById("playlists")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* OPEN PLAYLIST */

function openPlaylist() {

    document
        .getElementById("playlistModal")
        .classList.add("show");

}


/* CLOSE PLAYLIST */

function closePlaylist() {

    document
        .getElementById("playlistModal")
        .classList.remove("show");

}


/* OPEN JAM */

function openJam() {

    document
        .getElementById("jamModal")
        .classList.add("show");

}


/* CLOSE JAM */

function closeJam() {

    document
        .getElementById("jamModal")
        .classList.remove("show");

}


/* CREATE PLAYLIST */

function createPlaylist() {

    const name =
        document.getElementById(
            "playlistName"
        ).value;

    const category =
        document.getElementById(
            "playlistCategory"
        ).value;

    const description =
        document.getElementById(
            "playlistDescription"
        ).value;


    if (
        name === "" ||
        description === ""
    ) {

        showNotification(
            "Please fill all playlist details."
        );

        return;

    }


    const icons = {

        study: "📚",

        party: "🎉",

        chill: "🌙",

        rock: "🎸"

    };


    const colors = {

        study: "purple-cover",

        party: "pink-cover",

        chill: "blue-cover",

        rock: "orange-cover"

    };


    const card =
        document.createElement("div");

    card.className =
        "playlist-card";

    card.setAttribute(
        "data-category",
        category
    );


    card.innerHTML = `

        <div class="playlist-cover ${colors[category]}">

            ${icons[category]}

            <button
                onclick="likePlaylist(this)"
            >
                ♡
            </button>

        </div>

        <div class="playlist-content">

            <h3>${name}</h3>

            <p>${description}</p>

            <div class="playlist-info">
                🎵 1 song • 👥 1 member
            </div>

            <button
                class="play-btn"
                onclick="playMusic(this)"
            >
                ▶ Play
            </button>

        </div>
    `;


    document
        .getElementById("playlistGrid")
        .prepend(card);


    const count =
        document.getElementById(
            "playlistCount"
        );


    count.textContent =
        Number(count.textContent) + 1;


    closePlaylist();


    document.getElementById(
        "playlistName"
    ).value = "";


    document.getElementById(
        "playlistDescription"
    ).value = "";


    showNotification(
        "🎵 Playlist created successfully!"
    );

}


/* LIKE PLAYLIST */

function likePlaylist(button) {

    button.classList.toggle("liked");


    if (
        button.classList.contains("liked")
    ) {

        button.textContent = "♥";

        showNotification(
            "❤️ Added to favourites!"
        );

    } else {

        button.textContent = "♡";

        showNotification(
            "Removed from favourites."
        );

    }

}


/* PLAY MUSIC */

function playMusic(button) {

    button.textContent =
        "❚❚ Playing";


    showNotification(
        "🎵 Playlist is now playing!"
    );


    setTimeout(function () {

        button.textContent =
            "▶ Play";

    }, 2000);

}


/* FILTER PLAYLIST */

function filterPlaylist(category) {

    const cards =
        document.querySelectorAll(
            ".playlist-card"
        );


    cards.forEach(function(card) {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* SHOW ALL */

function showAll() {

    const cards =
        document.querySelectorAll(
            ".playlist-card"
        );


    cards.forEach(function(card) {

        card.style.display = "block";

    });


    document.getElementById(
        "searchInput"
    ).value = "";


    showNotification(
        "🎵 Showing all playlists."
    );

}


/* SEARCH PLAYLISTS */

function searchPlaylists() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const cards =
        document.querySelectorAll(
            ".playlist-card"
        );


    cards.forEach(function(card) {

        const text =
            card.textContent.toLowerCase();


        if (text.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


/* JOIN JAM */

function joinJam(button) {

    if (button.textContent === "Join") {

        button.textContent =
            "Joined ✓";

        button.style.background =
            "#8b5cf6";

        button.style.color =
            "white";


        showNotification(
            "🎸 You joined the jam session!"
        );

    }

}


/* CREATE JAM */

function createJam() {

    const name =
        document.getElementById(
            "jamName"
        ).value;

    const date =
        document.getElementById(
            "jamDate"
        ).value;

    const time =
        document.getElementById(
            "jamTime"
        ).value;

    const location =
        document.getElementById(
            "jamLocation"
        ).value;


    if (
        name === "" ||
        date === "" ||
        time === "" ||
        location === ""
    ) {

        showNotification(
            "Please fill all jam details."
        );

        return;

    }


    const dateObject =
        new Date(date);


    const day =
        dateObject.getDate();


    const month =
        dateObject
            .toLocaleString(
                "en-US",
                {
                    month: "short"
                }
            )
            .toUpperCase();


    const jam =
        document.createElement("div");


    jam.className =
        "jam-card";


    jam.innerHTML = `

        <div class="date">

            <strong>${day}</strong>

            <small>${month}</small>

        </div>

        <div class="jam-details">

            <h3>${name}</h3>

            <p>
                📍 ${location} • ${time}
            </p>

            <small>
                👥 0 students joined
            </small>

        </div>

        <button onclick="joinJam(this)">
            Join
        </button>

    `;


    document
        .querySelector(".jam-list")
        .appendChild(jam);


    const count =
        document.getElementById(
            "jamCount"
        );


    count.textContent =
        Number(count.textContent) + 1;


    closeJam();


    document.getElementById(
        "jamName"
    ).value = "";


    document.getElementById(
        "jamDate"
    ).value = "";


    document.getElementById(
        "jamTime"
    ).value = "";


    document.getElementById(
        "jamLocation"
    ).value = "";


    showNotification(
        "🎸 Jam session created successfully!"
    );

}


/* CONNECT WITH USER */

function connectUser(button) {

    if (
        button.textContent === "Connect"
    ) {

        button.textContent =
            "Connected ✓";

        button.style.background =
            "#8b5cf6";


        showNotification(
            "👥 Connection request sent!"
        );

    }

}


/* LOGIN */

document
    .querySelector(".login-btn")
    .addEventListener(
        "click",
        function() {

            showNotification(
                "🔐 Login feature coming soon!"
            );

        }
    );


/* CLOSE MODALS */

window.addEventListener(
    "click",
    function(event) {

        const playlistModal =
            document.getElementById(
                "playlistModal"
            );

        const jamModal =
            document.getElementById(
                "jamModal"
            );


        if (
            event.target === playlistModal
        ) {

            closePlaylist();

        }


        if (
            event.target === jamModal
        ) {

            closeJam();

        }

    }
);
