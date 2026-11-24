//https://www.youtube.com/watch?v=T0V_50s2t4U

let juego;
let spritesJugador = [];
let imgPiedra;
let imgFondo;
let imgPincho; 
let musicaJuego; 

function preload() {
  spritesJugador[0] = loadImage('data/frame1.png');
  spritesJugador[1] = loadImage('data/frame2.png');
  spritesJugador[2] = loadImage('data/frame3.png');
  imgGanar = loadImage("data/pantallaganaste.jpg");
  imgperder = loadImage("data/pantallaperdiste.jpg"); 
  imgmenu = loadImage("data/pantallamenu.jpg");
  
  imgPiedra = loadImage('data/piedra.png'); 
  imgFondo = loadImage('data/fondo.jpg');
  imgPincho = loadImage('data/pincho.png'); 
  
  musicaJuego = loadSound('data/8bitmusic.mp3'); 
}

function setup() {
  createCanvas(800, 400);

  juego = new Juego(spritesJugador, imgPiedra, imgFondo, imgPincho);
}

function draw() {
  juego.actualizar();
  juego.dibujar();
}

function keyPressed() {
  // suena la musica con la primera tecla
  if (musicaJuego && !musicaJuego.isPlaying()) {
    musicaJuego.loop();
    musicaJuego.setVolume(0.4);
  }

  juego.teclaPresionada(keyCode, key);
}
