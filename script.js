/* =========================================
   CAMPUSJAM APPLICATION
========================================= */


/* =========================================
   DATA
========================================= */

const defaultSongs = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop",
        votes: 124,
        art: "art-purple",
        voted: false
    },
    {
        id: 2,
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        genre: "Indie",
        votes: 98,
        art: "art-pink",
        voted: false
    },
    {
        id: 3,
        title: "Believer",
        artist: "Imagine Dragons",
        genre: "Rock",
        votes: 87,
        art: "art-blue",
        voted: false
    },
    {
        id: 4,
        title: "Perfect",
        artist: "Ed Sheeran",
        genre: "Pop",
        votes: 74,
        art: "art-orange",
        voted: false
    },
    {
        id: 5,
        title: "Daylight",
        artist: "David Kushner",
        genre: "Indie",
        votes: 61,
        art: "art-purple",
        voted: false
    }
];


const defaultSessions = [
    {
        id: 1,
        name: "Friday Night Jam",
        date: "2026-10-05",
        time: "18:30",
        location: "College Auditorium",
        members: 18,
        joined: false
    },
    {
        id: 2,
        name: "Acoustic Evening",
        date: "2026-10-09",
        time: "17:00",
        location: "Campus Garden",
        members: 12,
        joined: false
    },
    {
        id: 3,
        name: "Open Mic Night",
        date: "2026-10-15",
        time: "19:00",
        location: "Student Activity Center",
        members: 24,
        joined: false
    }
];


const defaultActivities = [
    {
        icon: "♫",
        text: "Sneha added",
        item: "Until I Found You",
        time: "5 min ago"
    },
    {
        icon: "🎸",
        text: "Arjun created",
        item: "Friday Night Jam",
        time: "18 min ago"
    },
    {
        icon: "♡",
        text: "Rahul voted for",
        item: "Blinding Lights",
        time: "32 min ago"
    },
    {
        icon: "♙",
        text: "Priya joined",
        item: "Open Mic Night",
        time: "1 hr ago"
    }
];


/* =========================================
   APPLICATION STATE
========================================= */

let songs =
    JSON.parse(
        localStorage.getItem("campusjam_songs")
    ) || defaultSongs;

let sessions =
    JSON.parse(
        localStorage.getItem("campusjam_sessions")
    ) || defaultSessions;

let contributions =
    Number(
        localStorage.getItem("campusjam_contributions")
    ) || 12;


/* =========================================
   DOM
========================================= */

const songList =
    document.getElementById("songList");

const sessionList =
    document.getElementById("sessionList");

const totalSongs =
    document.getElementById("totalSongs");

const totalSessions =
    document.getElementById("totalSessions");

const myContributions =
    document.getElementById("myContributions");

const songSearch =
    document.getElementById("songSearch");

const genreFilter =
    document.getElementById("genreFilter");

const globalSearch =
    document.getElementById("globalSearch");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");


/* =========================================
   STORAGE
========================================= */

function saveData() {

    localStorage.setItem(
        "campusjam_songs",
        JSON.stringify(songs)
    );

    localStorage.setItem(
        "campusjam_sessions",
        JSON.stringify(sessions)
    );

    localStorage.setItem(
        "campusjam_contributions",
        contributions
    );
}


/* =========================================
   SONG RENDERING
========================================= */

function renderSongs() {

    const search =
        songSearch.value
            .trim()
            .toLowerCase();

    const genre =
        genreFilter.value;


    const filteredSongs =
        songs
            .filter(song => {

                const matchesSearch =
                    song.title
                        .toLowerCase()
                        .includes(search) ||

                    song.artist
                        .toLowerCase()
                        .includes(search);

                const matchesGenre =
                    genre === "all" ||
                    song.genre === genre;

                return (
                    matchesSearch &&
                    matchesGenre
                );
            })
            .sort(
                (a, b) =>
                    b.votes - a.votes
            );


    songList.innerHTML = "";


    if (filteredSongs.length === 0) {

        songList.innerHTML = `

            <div class="empty-state">

                <p>
                    🎵 No songs found.
                </p>

                <small>
                    Try another search.
                </small>

            </div>

        `;

        return;
    }


    filteredSongs.forEach(
        (song, index) => {

            const element =
                document.createElement("div");

            element.className = "song";


            element.innerHTML = `

                <span class="song-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <div
                    class="album-art ${song.art}"
                >
                    ♪
                </div>

                <div class="song-info">

                    <strong>
                        ${escapeHTML(song.title)}
                    </strong>

                    <small>
                        ${escapeHTML(song.artist)}
                    </small>

                    <br>

                    <span class="genre-tag">
                        ${escapeHTML(song.genre)}
                    </span>

                </div>

                <button
                    class="vote ${song.voted ? "voted" : ""}"
                    data-id="${song.id}"
                >
                    ${song.voted ? "♥" : "♡"}
                    ${song.votes}
                </button>

            `;


            songList.appendChild(element);

        }
    );


    document
        .querySelectorAll(".vote")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    voteSong(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    totalSongs.textContent =
        songs.length;

}


/* =========================================
   VOTE
========================================= */

function voteSong(id) {

    const song =
        songs.find(
            item => item.id === id
        );

    if (!song) return;


    if (song.voted) {

        song.votes--;

        song.voted = false;

        showToast(
            "Vote removed",
            `Removed your vote from ${song.title}.`
        );

    } else {

        song.votes++;

        song.voted = true;

        contributions++;

        showToast(
            "Vote added",
            `You voted for ${song.title}.`
        );

    }


    saveData();

    renderSongs();

    updateStats();

}


/* =========================================
   SESSIONS
========================================= */

function renderSessions() {

    sessionList.innerHTML = "";


    const sorted =
        [...sessions].sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );


    sorted
        .slice(0, 4)
        .forEach(session => {

            const date =
                new Date(
                    session.date
                );


            const day =
                date.getDate();


            const month =
                date.toLocaleString(
                    "en-US",
                    {
                        month: "short"
                    }
                );


            const element =
                document.createElement("div");


            element.className =
                "session";


            element.innerHTML = `

                <div class="session-date">

                    <strong>
                        ${day}
                    </strong>

                    <small>
                        ${month.toUpperCase()}
                    </small>

                </div>

                <div>

                    <h3>
                        ${escapeHTML(session.name)}
                    </h3>

                    <p>
                        🕐 ${session.time}
                    </p>

                    <p>
                        📍 ${escapeHTML(session.location)}
                    </p>

                    <p>
                        👥 ${session.members} attending
                    </p>

                    <button
                        class="join-button ${
                            session.joined
                                ? "joined"
                                : ""
                        }"
                        data-id="${session.id}"
                    >
                        ${
                            session.joined
                                ? "✓ Joined"
                                : "Join Session"
                        }
                    </button>

                </div>

            `;


            sessionList.appendChild(element);

        });


    document
        .querySelectorAll(".join-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    joinSession(
                        Number(
                            button.dataset.id
                        )
                    );

                }
            );

        });


    totalSessions.textContent =
        sessions.length;

}


/* =========================================
   JOIN SESSION
========================================= */

function joinSession(id) {

    const session =
        sessions.find(
            item => item.id === id
        );

    if (!session) return;


    if (session.joined) {

        session.joined = false;

        session.members--;

        showToast(
            "Left session",
            `You left ${session.name}.`
        );

    } else {

        session.joined = true;

        session.members++;

        contributions++;

        showToast(
            "Session joined",
            `You're joining ${session.name}.`
        );

    }


    saveData();

    renderSessions();

    updateStats();

}


/* =========================================
   ADD SONG MODAL
========================================= */

const songModal =
    document.getElementById("songModal");

const songForm =
    document.getElementById("songForm");


function openModal(modal) {

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";
}


function closeModal(modal) {

    modal.classList.remove("active");

    document.body.style.overflow =
        "";
}


document
    .getElementById("quickAdd")
    .addEventListener(
        "click",
        () => openModal(songModal)
    );


document
    .getElementById("viewAllSongs")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("playlist")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


songForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const title =
            document
                .getElementById("songTitle")
                .value.trim();


        const artist =
            document
                .getElementById("songArtist")
                .value.trim();


        const genre =
            document
                .getElementById("songGenre")
                .value;


        const arts = [
            "art-purple",
            "art-pink",
            "art-blue",
            "art-orange"
        ];


        const newSong = {

            id: Date.now(),

            title,

            artist,

            genre,

            votes: 0,

            art:
                arts[
                    Math.floor(
                        Math.random() *
                        arts.length
                    )
                ],

            voted: false

        };


        songs.push(newSong);

        contributions++;

        saveData();

        renderSongs();

        updateStats();


        songForm.reset();

        closeModal(songModal);


        showToast(
            "Song added",
            `${title} was added to Campus Playlist.`
        );

    }
);


/* =========================================
   CREATE SESSION
========================================= */

const sessionModal =
    document.getElementById("sessionModal");

const sessionForm =
    document.getElementById("sessionForm");


document
    .getElementById("createSessionButton")
    .addEventListener(
        "click",
        () => openModal(sessionModal)
    );


sessionForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("sessionName")
                .value.trim();


        const date =
            document
                .getElementById("sessionDate")
                .value;


        const time =
            document
                .getElementById("sessionTime")
                .value;


        const location =
            document
                .getElementById("sessionLocation")
                .value.trim();


        const newSession = {

            id: Date.now(),

            name,

            date,

            time,

            location,

            members: 1,

            joined: true

        };


        sessions.push(newSession);

        contributions++;

        saveData();

        renderSessions();

        updateStats();


        sessionForm.reset();

        closeModal(sessionModal);


        showToast(
            "Jam created",
            `${name} is now open for the campus.`
        );

    }
);


/* =========================================
   CLOSE MODALS
========================================= */

document
    .querySelectorAll(".close-modal")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.close;

                closeModal(
                    document.getElementById(id)
                );

            }
        );

    });


document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal(modal);

                }

            }
        );

    });


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            document
                .querySelectorAll(
                    ".modal.active"
                )
                .forEach(modal =>
                    closeModal(modal)
                );

        }

    }
);


/* =========================================
   SEARCH
========================================= */

songSearch.addEventListener(
    "input",
    renderSongs
);


genreFilter.addEventListener(
    "change",
    renderSongs
);


/* Global search */

globalSearch.addEventListener(
    "input",
    event => {

        const query =
            event.target.value
                .toLowerCase()
                .trim();


        if (!query) return;


        const matchingSong =
            songs.find(song =>
                song.title
                    .toLowerCase()
                    .includes(query) ||

                song.artist
                    .toLowerCase()
                    .includes(query)
            );


        if (matchingSong) {

            document
                .getElementById("playlist")
                .scrollIntoView({
                    behavior: "smooth"
                });


            songSearch.value =
                query;

            renderSongs();

        }

    }
);


/* =========================================
   DARK MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem(
        "campusjam_theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☾";

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const dark =
            document.body.classList.contains(
                "dark"
            );


        themeToggle.textContent =
            dark ? "☾" : "☀";


        localStorage.setItem(
            "campusjam_theme",
            dark ? "dark" : "light"
        );

    }
);


/* =========================================
   MOBILE SIDEBAR
========================================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");


mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".nav-item"
                    )
                    .forEach(nav =>
                        nav.classList.remove(
                            "active"
                        )
                    );


                item.classList.add(
                    "active"
                );


                sidebar.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================================
   STATS
========================================= */

function updateStats() {

    totalSongs.textContent =
        songs.length;

    totalSessions.textContent =
        sessions.length;

    myContributions.textContent =
        contributions;

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(
    title,
    message
) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================
   SECURITY HELPER
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        value;

    return div.innerHTML;

}


/* =========================================
   INITIALIZE
========================================= */

function initializeApp() {

    renderSongs();

    renderSessions();

    updateStats();

}


initializeApp();
