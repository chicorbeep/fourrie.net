// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

const USERNAME = "c74e"; // Put your LastFM username here
const BASE_URL = `https://lastfm-last-played.biancarosa.com.br/${USERNAME}/latest-song`;

const getTrack = async () => {
    const request = await fetch(BASE_URL);
    const json = await request.json();
    let status

    let isPlaying = json.track['@attr']?.nowplaying || false;

    if(!isPlaying) {

        document.getElementById("listening-msg").innerText = "Last played";
        document.getElementById("listening").innerHTML = `
        <img src="${json.track.image[1]['#text']}">
        <div id="trackInfo">
        <h3 id="trackName">${json.track.name}</h3>
        <p id="artistName">${json.track.artist['#text']}</p>
        </div>
        `
        return;
    } else {
        // Trigger if a song is playing
    }

    document.getElementById("listening-msg").innerText = "Currently playing";
    document.getElementById("listening").innerHTML = `
    <img src="${json.track.image[1]['#text']}">
    <div id="trackInfo">
    <h3 id="trackName">${json.track.name}</h3>
    <p id="artistName">${json.track.artist['#text']}</p>
    </div>
    `
};

getTrack();
setInterval(() => { getTrack(); }, 30000);