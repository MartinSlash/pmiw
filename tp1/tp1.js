let acciones = [];
const NOMBRES = ['caminar', 'Saltar', 'Enemigo']; 
const FRAMES_POR_ACCION = [9, 8, 6]; 
const ESCALA_PERSONAJE = 1.6; 
const ESCALA_ENEMIGO = 0.55; 

const CAMINAR = 0;
const SALTAR = 1;
const ENEMIGO = 2;
let accionActual = CAMINAR; 

let estadoIntro = "CAMINANDO_INICIO"; 

let x = -60;
let yPiso = 460;
let y = yPiso;
let velocidadPersonaje = 3;

let vy = 0;                  
const FUERZA_SALTO = -14.5; 
const GRAVEDAD = 0.55;     

let imgFondo;
let imgLogo;

let xEnemigo = 400; 
let yLogo = -200;   
let velocidadLogo = 5;

function cargarAccion(nombreAccion, cantidadFrames) {
  let frames = [];
  for (let i = 1; i <= cantidadFrames; i++) {
    let archivoNombre;
    if (nombreAccion === 'caminar') {
      archivoNombre = `${nombreAccion}_${nf(i, 3)}.png`;
    } else {
      archivoNombre = `${nombreAccion}_${i}.png`;
    }
    // Corregido: Ahora busca todos los sprites dentro de data/
    let img = loadImage(`data/${archivoNombre}`);
    frames.push(img);
  }
  return frames;
}

function elegirFrame(frames, velocidadAnimacion) {
  let index = floor(frameCount / velocidadAnimacion) % frames.length;
  return frames[index];
}

function reiniciarSecuencia() {
  x = -60;
  y = yPiso;
  vy = 0;
  yLogo = -200;
  velocidadLogo = 5;
  estadoIntro = "CAMINANDO_INICIO";
  accionActual = CAMINAR;
}

function preload() {
  imgFondo = loadImage('data/fondoVerde.jpg');
  imgLogo = loadImage('data/logoHK.png');

  for (let a = 0; a < NOMBRES.length; a++) {
    acciones.push(cargarAccion(NOMBRES[a], FRAMES_POR_ACCION[a]));
  }
}

function setup() {
  createCanvas(800, 600);
  noSmooth();
}

function draw() {

  if (estadoIntro === "CAMINANDO_INICIO") {
    accionActual = CAMINAR;
    y = yPiso;
    x += velocidadPersonaje;

    if (x >= xEnemigo - 110) {
      estadoIntro = "SALTANDO";
      vy = FUERZA_SALTO; 
    }

  } else if (estadoIntro === "SALTANDO") {
    accionActual = SALTAR;
    x += velocidadPersonaje * 1.45; 

    y += vy;           
    vy += GRAVEDAD;    

    if (y >= yPiso) {
      y = yPiso; 
      vy = 0;
      estadoIntro = "CORRIENDO_SALIDA";
    }

  } else if (estadoIntro === "CORRIENDO_SALIDA") {
    accionActual = CAMINAR;
    y = yPiso;
    x += velocidadPersonaje * 1.4;
    
    if (x > width + 50) {
      estadoIntro = "CAIDA_LOGO";
    }

  } else if (estadoIntro === "CAIDA_LOGO") {
    if (yLogo < 110) {
      yLogo += velocidadLogo;
      velocidadLogo += 0.4;
    } else {
      yLogo = 110; 
      estadoIntro = "FINALIZADO";
    }
  }

  image(imgFondo, 0, 0, width, height);

  let framesEnemigo = acciones[ENEMIGO];
  let imgEnemigoActual = elegirFrame(framesEnemigo, 6);
  
  let anchoE = imgEnemigoActual.width * ESCALA_ENEMIGO;
  let altoE = imgEnemigoActual.height * ESCALA_ENEMIGO;
  
  let yBaseSuelo = 546; 
  image(imgEnemigoActual, xEnemigo - anchoE / 2, yBaseSuelo - altoE, anchoE, altoE);

  if (estadoIntro !== "CAIDA_LOGO" && estadoIntro !== "FINALIZADO") {
    let listaFrames = acciones[accionActual];
    let imgActual = elegirFrame(listaFrames, 5);

    let ancho = imgActual.width * ESCALA_PERSONAJE;
    let alto = imgActual.height * ESCALA_PERSONAJE;
    
    image(imgActual, x, y, ancho, alto);
  }

  if (estadoIntro === "CAIDA_LOGO" || estadoIntro === "FINALIZADO") {
    let anchoLogo = imgLogo.width * 0.6;
    let altoLogo = imgLogo.height * 0.6;
    image(imgLogo, width / 2 - anchoLogo / 2, yLogo, anchoLogo, altoLogo);
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarSecuencia();
  }
}
