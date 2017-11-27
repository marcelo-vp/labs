// Creating a song constructor object
function Song (title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.isPlaying = false;
}

Song.prototype.play = function () {
    this.isPlaying = true;
}

Song.prototype.stop = function () {
    this.isPlaying = false;
}

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