// ================================
// CAMPUSJAM JAVASCRIPT
// ================================


// SONG DATA

let songs = [
    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop",
        votes: 124,
        color: "purple",
        voted: false
    },

    {
        name: "Until I Found You",
        artist: "Stephen Sanchez",
        genre: "Indie",
        votes: 98,
        color: "pink",
        voted: false
    },

    {
        name: "Believer",
        artist: "Imagine Dragons",
        genre: "Rock",
        votes: 87,
        color: "blue",
        voted: false
    },

    {
        name: "Perfect",
        artist: "Ed Sheeran",
        genre: "Pop",
        votes: 74,
        color: "orange",
        voted: false
    }
];


// SESSION DATA

let sessions = [
    {
        name: "Friday Night Jam",
        date: "October 5, 2026",
        location: "College Auditorium",
        people: 18,
        joined: false
    },

    {
        name: "Acoustic Evening",
        date: "October 9, 2026",
        location: "Campus Garden",
        people: 12,
        joined: false
    },

    {
        name: "Open Mic Night",
        date: "October 15, 2026",
        location: "Student Activity Center",
        people: 24,
        joined: false
    }
];


// GET HTML ELEMENTS

const songList =
    document.getElementById("songList");

const sessionList =
    document.getElementById("sessionList");

const songCount =
    document.getElementById("songCount");

const sessionCount =
    document.getElementById("sessionCount");

const searchInput =
    document.getElementById("searchInput");


// DISPLAY SONGS

function displaySongs(list = songs) {

    songList.innerHTML = "";

    list.forEach(function(song, index) {

        const songElement =
            document.createElement("div");

        songElement.className = "song";

        songElement.innerHTML = `

            <div class="song-number">
                ${index + 1}
            </div>

            <div class="album-small ${song.color}">
                ♪
            </div>

            <div class="song-info">

                <strong>
                    ${song.name}
                </strong>

                <small>
                    ${song.artist}
                </small>

                <br>

                <span class="genre">
                    ${song.genre}
                </span>

            </div>

            <button
                class="vote-btn ${
                    song.voted ? "voted" : ""
                }"
                onclick="voteSong(${index})"
            >

                ${song.voted ? "♥" : "♡"}
                ${song.votes}

            </button>

        `;

        songList.appendChild(songElement);

    });

    songCount.innerText = songs.length;
}


// VOTE SONG

function voteSong(index) {

    if (songs[index].voted) {

        songs[index].votes--;
        songs[index].voted = false;

    } else {

        songs[index].votes++;
        songs[index].voted = true;

    }

    songs.sort(function(a, b) {
        return b.votes - a.votes;
    });

    displaySongs();

}


// SEARCH SONGS

searchInput.addEventListener(
    "input",
    function() {

        const search =
            searchInput.value.toLowerCase();

        const filtered =
            songs.filter(function(song) {

                return (
                    song.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    song.artist
                        .toLowerCase()
                        .includes(search)

                    ||

                    song.genre
                        .toLowerCase()
                        .includes(search)
                );

            });

        displaySongs(filtered);

    }
);


// DISPLAY SESSIONS

function displaySessions() {

    sessionList.innerHTML = "";

    sessions.forEach(function(session, index) {

        const sessionElement =
            document.createElement("div");

        sessionElement.className =
            "session-card";

        sessionElement.innerHTML = `

            <div class="session-date">
                📅 ${session.date}
            </div>

            <h3>
                ${session.name}
            </h3>

            <p>
                📍 ${session.location}
            </p>

            <p>
                👥 ${session.people} students attending
            </p>

            <button
                class="join-btn ${
                    session.joined
                        ? "joined"
                        : ""
                }"
                onclick="joinSession(${index})"
            >

                ${
                    session.joined
                        ? "✓ Joined"
                        : "Join Session"
                }

            </button>

        `;

        sessionList.appendChild(
            sessionElement
        );

    });

    sessionCount.innerText =
        sessions.length;
}


// JOIN SESSION

function joinSession(index) {

    if (sessions[index].joined) {

        sessions[index].joined = false;

        sessions[index].people--;

    } else {

        sessions[index].joined = true;

        sessions[index].people++;

    }

    displaySessions();

}


// ==================================
// ADD SONG MODAL
// ==================================

const songModal =
    document.getElementById("songModal");

const addSongBtn =
    document.getElementById("addSongBtn");

const closeSongModal =
    document.getElementById("closeSongModal");


addSongBtn.addEventListener(
    "click",
    function() {

        songModal.classList.add("show");

    }
);


closeSongModal.addEventListener(
    "click",
    function() {

        songModal.classList.remove("show");

    }
);


// ADD SONG FORM

const songForm =
    document.getElementById("songForm");


songForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById("songName").value;

        const artist =
            document.getElementById("artistName").value;

        const genre =
            document.getElementById("genre").value;


        const colors = [
            "purple",
            "pink",
            "blue",
            "orange"
        ];


        const newSong = {

            name: name,

            artist: artist,

            genre: genre,

            votes: 0,

            color:
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ],

            voted: false

        };


        songs.push(newSong);

        displaySongs();


        songForm.reset();

        songModal.classList.remove("show");

    }
);


// ==================================
// CREATE SESSION
// ==================================

const sessionModal =
    document.getElementById("sessionModal");

const createSessionBtn =
    document.getElementById(
        "createSessionBtn"
    );

const closeSessionModal =
    document.getElementById(
        "closeSessionModal"
    );


createSessionBtn.addEventListener(
    "click",
    function() {

        sessionModal.classList.add(
            "show"
        );

    }
);


closeSessionModal.addEventListener(
    "click",
    function() {

        sessionModal.classList.remove(
            "show"
        );

    }
);


// SESSION FORM

const sessionForm =
    document.getElementById(
        "sessionForm"
    );


sessionForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "sessionName"
            ).value;


        const date =
            document.getElementById(
                "sessionDate"
            ).value;


        const location =
            document.getElementById(
                "sessionLocation"
            ).value;


        const formattedDate =
            new Date(date)
                .toLocaleDateString(
                    "en-US",
                    {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }
                );


        sessions.push({

            name: name,

            date: formattedDate,

            location: location,

            people: 1,

            joined: true

        });


        displaySessions();


        sessionForm.reset();

        sessionModal.classList.remove(
            "show"
        );

    }
);


// ==================================
// DARK MODE
// ==================================

const darkModeBtn =
    document.getElementById(
        "darkModeBtn"
    );


darkModeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            darkModeBtn.innerText = "☀️";

        } else {

            darkModeBtn.innerText = "🌙";

        }

    }
);


// ==================================
// PLAY BUTTON
// ==================================

const playBtn =
    document.getElementById("playBtn");


let playing = false;


playBtn.addEventListener(
    "click",
    function() {

        playing = !playing;

        playBtn.innerText =
            playing ? "Ⅱ" : "▶";

    }
);


// ==================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==================================

window.addEventListener(
    "click",
    function(event) {

        if (
            event.target === songModal
        ) {

            songModal.classList.remove(
                "show"
            );

        }

        if (
            event.target === sessionModal
        ) {

            sessionModal.classList.remove(
                "show"
            );

        }

    }
);


// ==================================
// START APPLICATION
// ==================================

displaySongs();

displaySessions();
