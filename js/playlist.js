// Creating a song constructor object
function Song (title, artist, duration) {
    Media.call(this, title, duration);
    this.artist = artist;
}

Song.prototype = Object.create(Media.prototype);

// Creating a movie constructor object
function Movie (title, year, duration) {
    Media.call(this, title, duration);
    this.year = year;
}

Movie.prototype = Object.create(Media.prototype);

// Creating a playlist constructor object
function Playlist () {
    this.songs = [];
    this.nowPlayingIndex = 0;
}

Playlist.prototype.add = function (song) {
    this.songs.push(song);
}

Playlist.prototype.play = function () {
    var currentSong = this.songs[this.nowPlayingIndex];
    currentSong.play();
}

Playlist.prototype.stop = function () {
    var currentSong = this.songs[this.nowPlayingIndex];
    currentSong.stop();
}

Playlist.prototype.next = function () {
    this.stop();
    this.nowPlayingIndex++;
    if (this.nowPlayingIndex === this.songs.length) {
        this.nowPlayingIndex = 0;
    }
    this.play();
}

// Creating our own playlist, as an instance of the Playlist object
var playlist = new Playlist ();

// Creating our songs
var aQuestionOfHeaven = new Song ('A Question of Heaven','Iced Earth','11:42');
var spaceMan = new Song ('Spaceman','The Killers','5:36');
var starLight = new Song ('Starlight','Muse','4:52');

// Adding the songs to the playlist
playlist.add(aQuestionOfHeaven);
playlist.add(spaceMan);
playlist.add(starLight);

// Creating our movies
var spiderman = new Movie('Spiderman 3','2016','3:20');

// Adding movies to the playlist
playlist.add(spiderman);