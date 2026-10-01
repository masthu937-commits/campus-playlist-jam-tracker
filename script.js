// ==========================================
// CAMPUSJAM - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// SONG DATA
// ==========================================

let songs = [

    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop",
        votes: 124,
        color: "purple",
        voted: false,
        link: "https://www.youtube.com/results?search_query=The+Weeknd+Blinding+Lights"
    },

    {
        name: "Until I Found You",
        artist: "Stephen Sanchez",
        genre: "Indie",
        votes: 98,
        color: "pink",
        voted: false,
        link: "https://www.youtube.com/results?search_query=Stephen+Sanchez+Until+I+Found+You"
    },

    {
        name: "Believer",
        artist: "Imagine Dragons",
        genre: "Rock",
        votes: 87,
        color: "blue",
        voted: false,
        link: "https://www.youtube.com/results?search_query=Imagine+Dragons+Believer"
    },

    {
        name: "Perfect",
        artist: "Ed Sheeran",
        genre: "Pop",
        votes: 74,
        color: "orange",
        voted: false,
        link: "https://www.youtube.com/results?search_query=Ed+Sheeran+Perfect"
    },

    {
        name: "Golden Hour",
        artist: "JVKE",
        genre: "Indie",
        votes: 68,
        color: "green",
        voted: false,
        link: "https://www.youtube.com/results?search_query=JVKE+Golden+Hour"
    }

];


// ==========================================
// JAM SESSION DATA
// ==========================================

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


// ==========================================
// MUSIC QUOTES
// ==========================================

const musicQuotes = [

    {
        quote: '"Where words fail, music speaks."',
        author: "— Hans Christian Andersen"
    },

    {
        quote: '"Music gives a soul to the universe."',
        author: "— Plato"
    },

    {
        quote: '"Music is the shorthand of emotion."',
        author: "— Leo Tolstoy"
    },

    {
        quote:
            '"One good thing about music, when it hits you, you feel no pain."',
        author: "— Bob Marley"
    },

    {
        quote:
            '"Music can change the world because it can change people."',
        author: "— Bono"
    },

    {
        quote:
            '"Music is the universal language of mankind."',
        author: "— Henry Wadsworth Longfellow"
    },

    {
        quote:
            '"Without music, life would be a mistake."',
        author: "— Friedrich Nietzsche"
    },

    {
        quote:
            '"Music expresses that which cannot be put into words."',
        author: "— Victor Hugo"
    },

    {
        quote:
            '"Music is what feelings sound like."',
        author: "— Unknown"
    }

];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

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


// ==========================================
// DISPLAY SONGS
// ==========================================

function displaySongs(list = songs) {

    songList.innerHTML = "";

    list.forEach(function(song) {

        const realIndex =
            songs.indexOf(song);

        const songElement =
            document.createElement("div");

        songElement.className = "song";

        songElement.innerHTML = `

            <div class="song-number">
                ${realIndex + 1}
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

            <a
                href="${song.link}"
                target="_blank"
                class="listen-btn"
            >
                ▶ Listen
            </a>

            <button
                class="vote-btn ${song.voted ? "voted" : ""}"
                onclick="voteSong(${realIndex})"
            >

                ${song.voted ? "♥" : "♡"}

                ${song.votes}

            </button>

        `;

        songList.appendChild(songElement);

    });

    songCount.innerText = songs.length;
}


// ==========================================
// VOTE SONG
// ==========================================

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


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    function() {

        const search =
            searchInput.value
            .toLowerCase()
            .trim();

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


// ==========================================
// DISPLAY JAM SESSIONS
// ==========================================

function displaySessions() {

    sessionList.innerHTML = "";

    sessions.forEach(function(session, index) {

        const element =
            document.createElement("div");

        element.className = "session-card";

        element.innerHTML = `

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
                👥 ${session.people}
                students attending
            </p>

            <button
                class="join-btn
                ${session.joined ? "joined" : ""}"
                onclick="joinSession(${index})"
            >

                ${
                    session.joined
                    ? "✓ Joined"
                    : "Join Session"
                }

            </button>

        `;

        sessionList.appendChild(element);

    });

    sessionCount.innerText =
        sessions.length;
}


// ==========================================
// JOIN SESSION
// ==========================================

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


// ==========================================
// ADD SONG MODAL
// ==========================================

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


// ==========================================
// ADD SONG FORM
// ==========================================

const songForm =
    document.getElementById("songForm");


songForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById(
                "songName"
            ).value.trim();

        const artist =
            document.getElementById(
                "artistName"
            ).value.trim();

        const genre =
            document.getElementById(
                "genre"
            ).value;


        const colors = [
            "purple",
            "pink",
            "blue",
            "orange",
            "green"
        ];


        const randomColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        songs.push({

            name: name,

            artist: artist,

            genre: genre,

            votes: 0,

            color: randomColor,

            voted: false,

            link:
                "https://www.youtube.com/results?search_query="
                +
                encodeURIComponent(
                    name + " " + artist
                )

        });


        displaySongs();


        songForm.reset();


        songModal.classList.remove(
            "show"
        );


        document
            .getElementById("playlist")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// CREATE SESSION MODAL
// ==========================================

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

        sessionModal.classList.add("show");

    }
);


closeSessionModal.addEventListener(
    "click",
    function() {

        sessionModal.classList.remove("show");

    }
);


// ==========================================
// CREATE SESSION FORM
// ==========================================

const sessionForm =
    document.getElementById("sessionForm");


sessionForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "sessionName"
            ).value.trim();


        const date =
            document.getElementById(
                "sessionDate"
            ).value;


        const location =
            document.getElementById(
                "sessionLocation"
            ).value.trim();


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


        document
            .getElementById("sessions")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// DARK MODE
// ==========================================

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

            localStorage.setItem(
                "campusjam-theme",
                "dark"
            );

        } else {

            darkModeBtn.innerText = "🌙";

            localStorage.setItem(
                "campusjam-theme",
                "light"
            );

        }

    }
);


// ==========================================
// LOAD SAVED THEME
// ==========================================

const savedTheme =
    localStorage.getItem(
        "campusjam-theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    darkModeBtn.innerText = "☀️";

}


// ==========================================
// MUSIC QUOTES
// ==========================================

const musicQuote =
    document.getElementById(
        "musicQuote"
    );

const quoteAuthor =
    document.getElementById(
        "quoteAuthor"
    );

const quoteBtn =
    document.getElementById(
        "quoteBtn"
    );


function showRandomQuote() {

    const randomIndex =
        Math.floor(
            Math.random() *
            musicQuotes.length
        );


    const selectedQuote =
        musicQuotes[randomIndex];


    musicQuote.style.opacity = "0";

    quoteAuthor.style.opacity = "0";


    setTimeout(function() {

        musicQuote.innerText =
            selectedQuote.quote;

        quoteAuthor.innerText =
            selectedQuote.author;


        musicQuote.style.opacity = "1";

        quoteAuthor.style.opacity = "1";

    }, 200);

}


quoteBtn.addEventListener(
    "click",
    showRandomQuote
);


// ==========================================
// MUSIC PLAYER
// ==========================================

const playBtn =
    document.getElementById("playBtn");

const progressBar =
    document.getElementById(
        "progressBar"
    );

let playing = false;

let progress = 0;

let playerTimer;


playBtn.addEventListener(
    "click",
    function() {

        playing = !playing;


        if (playing) {

            playBtn.innerText = "Ⅱ";

            playerTimer =
                setInterval(
                    function() {

                        progress += 1;

                        if (progress >= 100) {

                            progress = 0;

                        }

                        progressBar.style.width =
                            progress + "%";

                    },
                    100
                );

        } else {

            playBtn.innerText = "▶";

            clearInterval(playerTimer);

        }

    }
);


// ==========================================
// CLOSE MODALS
// ==========================================

window.addEventListener(
    "click",
    function(event) {

        if (event.target === songModal) {

            songModal.classList.remove(
                "show"
            );

        }

        if (event.target === sessionModal) {

            sessionModal.classList.remove(
                "show"
            );

        }

    }
);


// ==========================================
// ESCAPE KEY CLOSE MODAL
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            songModal.classList.remove(
                "show"
            );

            sessionModal.classList.remove(
                "show"
            );

        }

    }
);


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

displaySongs();

displaySessions();
