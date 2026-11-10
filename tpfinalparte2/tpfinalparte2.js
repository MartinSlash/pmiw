let juego;
let spritesJugador = [];
let imgPiedra;
let imgFondo;
let imgPincho; 

function preload() {
  spritesJugador[0] = loadImage('frame1.png');
  spritesJugador[1] = loadImage('frame2.png');
  spritesJugador[2] = loadImage('frame3.png');
  
  imgPiedra = loadImage('piedra.png');
  imgFondo = loadImage('fondo.jpg');
  imgPincho = loadImage('pincho.png'); 
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
  juego.teclaPresionada(keyCode, key);
}
