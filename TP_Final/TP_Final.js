// --- CARGA DE VARIABLES DE IMAGEN (1 A 12) ---
let imgP1, imgP2, imgP3, imgP4, imgP5, imgP6, imgP7, imgP8, imgP9, imgP10, imgP11, imgP12;

let estadoActual = 'pantalla1';

// --- TRANSICIÓN RETRO (CORTINA NEGRA) ---
let enTransicion = false;
let alfaCortina = 0;
let velocidadTransicion = 18;
let estadoSiguiente = '';

function preload() {
  imgP1  = loadImage('data/pantalla1.jpg');
  imgP2  = loadImage('data/pantalla2.jpg');
  imgP3  = loadImage('data/pantalla3.jpg');
  imgP4  = loadImage('data/pantalla4decisor.jpg');
  imgP5  = loadImage('data/pantalla5.jpg');
  imgP6  = loadImage('data/pantalla6.jpg');
  imgP7  = loadImage('data/pantalla7.jpg');
  imgP8  = loadImage('data/pantalla8decisor.jpg'); // Cambiado a pantalla8decisor
  imgP9  = loadImage('data/pantalla9.jpg');
  imgP10 = loadImage('data/pantalla10.jpg');
  imgP11 = loadImage('data/pantalla11.jpg');        // Cambiado a pantalla11
  imgP12 = loadImage('data/pantalla12decisor.jpg'); // Nueva pantalla 12 decisor
}

// 1. ESTRUCTURA COMPLETA DE LA HISTORIA
let historia = {
  pantalla1: { tipo: 'imagen', imagenKey: 'imgP1', siguiente: 'pantalla2' },
  pantalla2: { tipo: 'imagen', imagenKey: 'imgP2', siguiente: 'pantalla3' },
  pantalla3: { tipo: 'imagen', imagenKey: 'imgP3', siguiente: 'pantalla4' },

  pantalla4: {
    tipo: 'decision_imagen',
    imagenKey: 'imgP4',
    opciones: [
      { texto: "Forzar la puerta", destino: 'escapa_puerta', x: 620, y: 390, radio: 40 },
      { texto: "Buscar paso secreto", destino: 'paso_secreto', x: 80, y: 350, radio: 40 }
    ]
  },

  paso_secreto: {
    tipo: 'imagen',
    imagenKey: 'imgP5',
    siguiente: 'armeria',
    textoOverlay: "El Príncipe descubre un paso secreto detrás de una piedra."
  },

  armeria: {
    tipo: 'imagen',
    imagenKey: 'imgP6',
    siguiente: 'encuentra_espada',
    textoOverlay: "Llega al nivel inferior y entra a la armería."
  },

  encuentra_espada: {
    tipo: 'imagen',
    imagenKey: 'imgP7',
    siguiente: 'sala_espejo',
    textoOverlay: "Encuentra una espada que puede usar para defenderse."
  },

  // Pantalla 8: El Espejo (pantalla8decisor.jpg)
  sala_espejo: {
    tipo: 'decision_imagen',
    imagenKey: 'imgP8',
    textoOverlay: "El Príncipe se abre paso por los pasillos y llega a una gran sala vacía donde un espejo místico bloquea la única salida.",
    opciones: [
      { texto: "Atacar a la sombra", destino: 'derrota_sombra', x: 350, y: 350, radio: 40 },
      { texto: "Guardar la espada", destino: 'fusion_sombra', x: 650, y: 350, radio: 40 }
    ]
  },

  derrota_sombra: {
    tipo: 'final',
    texto: "FINAL TRÁGICO\n\nAl golpear a la sombra sientes tu propio dolor. La sombra te desarma y caes al vacío.",
    color: [180, 40, 40]
  },

  fusion_sombra: {
    tipo: 'imagen',
    imagenKey: 'imgP9',
    siguiente: 'sube_escalones',
    textoOverlay: "El Príncipe enfunda su arma y camina con calma hacia la figura sombría."
  },

  sube_escalones: {
    tipo: 'imagen',
    imagenKey: 'imgP10',
    siguiente: 'salon_jaffar',
    textoOverlay: "La sombra se fusiona con él, otorgándole la energía y vitalidad necesarias para cruzar el espejo."
  },

  // Pantalla 11: Irrumpe en el salón (pantalla11.jpg)
  salon_jaffar: {
    tipo: 'imagen',
    imagenKey: 'imgP11',
    siguiente: 'duelo_jaffar',
    textoOverlay: "Sube a toda prisa los escalones hacia los aposentos reales "
  },

  // Pantalla 12: Duelo final con Jaffar (pantalla12decisor.jpg)
  duelo_jaffar: {
    tipo: 'decision_imagen',
    imagenKey: 'imgP12',
    opciones: [
      { 
        texto: "Aprovechar el poder de la sombra para un ataque rápido", 
        destino: 'ataque_sombra_exito', 
        x: 240, 
        y: 450, 
        radio: 40 
      },
      { 
        texto: "Luchar con cuidado y buscar el momento justo", 
        destino: 'resiste_ataques', 
        x: 560, 
        y: 450, 
        radio: 40 
      }
    ]
  },

  ataque_sombra_exito: {
    tipo: 'imagen',
    imagenKey: 'imgP11',
    siguiente: 'final_heroico',
    textoOverlay: "Utiliza la agilidad recuperada para esquivar la guardia de Jaffar y desarmarlo en segundos."
  },

  resiste_ataques: {
    tipo: 'imagen',
    imagenKey: 'imgP11',
    siguiente: 'final_clasico',
    textoOverlay: "El Príncipe resiste los ataques mágicos del Visir con paciencia y asesta el golpe definitivo."
  },

  final_tragico: {
    tipo: 'final',
    texto: "FINAL TRÁGICO\n\nCaes en la trampa del salón. El tiempo expira y Jaffar toma el control.",
    color: [180, 40, 40]
  },
  final_clasico: {
    tipo: 'final',
    texto: "FINAL CLÁSICO\n\nSalva a la Princesa en el último segundo. ¡Reino restaurado!",
    color: [40, 140, 100]
  },
  final_heroico: {
    tipo: 'final',
    texto: "FINAL HEROICO\n\nRescata a la Princesa con tiempo de sobra y es proclamado Príncipe.",
    color: [40, 160, 60]
  }
};

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(15);
  let nodo = historia[estadoActual];

  if (nodo.tipo === 'imagen') {
    dibujarPantallaImagen(nodo);
  } else if (nodo.tipo === 'decision_imagen') {
    dibujarPantallaDecisionImagen(nodo);
  } else if (nodo.tipo === 'final') {
    dibujarPantallaFinal(nodo);
  }

  gestionarTransicion();
}

// 2. RENDERS Y DIBUJO DE INTERFAZ

function dibujarPantallaImagen(nodo) {
  let img = getImagen(nodo.imagenKey);
  image(img, 0, 0, width, height);

  rectMode(CENTER);
  
  if (nodo.textoOverlay) {
    fill(0, 200);
    rect(width / 2, 50, 740, 50, 8);
    fill(255);
    textSize(14);
    text(nodo.textoOverlay, width / 2, 50);
  }

  fill(0, 180);
  rect(width / 2, height - 30, 300, 35, 8);
  fill(255);
  textSize(14);
  text("Haz click para continuar", width / 2, height - 30);
  rectMode(CORNER);
}

function dibujarPantallaDecisionImagen(nodo) {
  let img = getImagen(nodo.imagenKey);
  image(img, 0, 0, width, height);

  if (nodo.textoOverlay) {
    rectMode(CENTER);
    fill(0, 200);
    rect(width / 2, 50, 740, 50, 8);
    fill(255);
    textSize(13);
    textWrap(WORD);
    text(nodo.textoOverlay, width / 2, 50);
    rectMode(CORNER);
  }

  for (let i = 0; i < nodo.opciones.length; i++) {
    let opt = nodo.opciones[i];

    let d = dist(mouseX, mouseY, opt.x, opt.y);
    if (d < opt.radio) {
      fill(255, 200, 50, 220);
      stroke(255);
      strokeWeight(3);
    } else {
      fill(20, 20, 35, 180);
      stroke(200, 160, 80);
      strokeWeight(2);
    }

    ellipse(opt.x, opt.y, opt.radio * 2);

    noStroke();
    fill(255);
    textSize(14);
    text(opt.texto, opt.x, opt.y + opt.radio + 15);
  }
}

function dibujarPantallaFinal(nodo) {
  rectMode(CENTER);
  fill(nodo.color);
  rect(width / 2, height / 2, 620, 250, 12);

  fill(255);
  textSize(20);
  textWrap(WORD);
  text(nodo.texto, width / 2 - 280, height / 2 - 20, 560);
  
  textSize(14);
  text("Haz click para reiniciar la aventura", width / 2, height / 2 + 70);
  rectMode(CORNER);
}

// 3. TRANSICIÓN CORTINA NEGRA

function gestionarTransicion() {
  if (alfaCortina > 0 || enTransicion) {
    noStroke();
    fill(0, alfaCortina);
    rect(0, 0, width, height);

    if (enTransicion) {
      alfaCortina += velocidadTransicion;
      if (alfaCortina >= 255) {
        alfaCortina = 255;
        estadoActual = estadoSiguiente;
        enTransicion = false;
      }
    } else {
      alfaCortina -= velocidadTransicion;
      if (alfaCortina <= 0) alfaCortina = 0;
    }
  }
}

function cambiarEstado(nuevoEstado) {
  if (!enTransicion) {
    estadoSiguiente = nuevoEstado;
    enTransicion = true;
  }
}

function getImagen(key) {
  if (key === 'imgP1')  return imgP1;
  if (key === 'imgP2')  return imgP2;
  if (key === 'imgP3')  return imgP3;
  if (key === 'imgP4')  return imgP4;
  if (key === 'imgP5')  return imgP5;
  if (key === 'imgP6')  return imgP6;
  if (key === 'imgP7')  return imgP7;
  if (key === 'imgP8')  return imgP8;
  if (key === 'imgP9')  return imgP9;
  if (key === 'imgP10') return imgP10;
  if (key === 'imgP11') return imgP11;
  if (key === 'imgP12') return imgP12;
}

// 4. CONTROL DE CLICS CON EL MOUSE

function mousePressed() {
  if (enTransicion) return;

  let nodo = historia[estadoActual];

  if (nodo.tipo === 'imagen') {
    cambiarEstado(nodo.siguiente);
  } 
  else if (nodo.tipo === 'decision_imagen') {
    for (let i = 0; i < nodo.opciones.length; i++) {
      let opt = nodo.opciones[i];
      if (dist(mouseX, mouseY, opt.x, opt.y) < opt.radio) {
        cambiarEstado(opt.destino);
        break;
      }
    }
  } 
  else if (nodo.tipo === 'final') {
    cambiarEstado('pantalla1');
  }
}
