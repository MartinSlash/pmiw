let estado = 0;

let imagenes = [];
let flecha;
let musicaFondo;

let flechaX = 710;
let flechaY = 35;
let flechaAncho = 50;
let flechaAlto = 40;

let yCinematica = 450;
let tiempoCinematica = 0;

let enTransicion = false;
let tiempoInicioTransicion = 0;
let duracionTransicion = 700;
let estadoDestino = 0;
let imgA = 1;
let imgB = 1;

function preload() {
  imagenes[1]  = loadImage('data/pantalla1.jpg');
  imagenes[2]  = loadImage('data/pantalla2.png');
  imagenes[3]  = loadImage('data/pantalla3.png');
  imagenes[4]  = loadImage('data/pantalla4decisor.jpg');
  imagenes[5]  = loadImage('data/pantalla5.jpg');
  imagenes[6]  = loadImage('data/Pantalla5izquierda.jpg');
  imagenes[7]  = loadImage('data/pantalla6.jpg');
  imagenes[8]  = loadImage('data/pantalla6izquierda.jpg');
  imagenes[9]  = loadImage('data/pantalla7derecha.jpg');
  imagenes[10] = loadImage('data/pantalla7izquierda.jpg');
  imagenes[11] = loadImage('data/pantalla7.jpg');
  imagenes[12] = loadImage('data/pantalla8decisor.jpg');
  imagenes[13] = loadImage('data/pantalla9derecha.jpg');
  imagenes[14] = loadImage('data/pantalla9izquierda.jpg');
  imagenes[15] = loadImage('data/pantalla10derecha.jpg');
  imagenes[16] = loadImage('data/pantalla10izquierda.jpg');
  imagenes[17] = loadImage('data/pantalla11derecha.jpg');
  imagenes[18] = loadImage('data/pantalla12decisor.jpg');
  imagenes[19] = loadImage('data/pantalla13izquierda.jpg');
  imagenes[20] = loadImage('data/pantalla13derecha.jpg');
  imagenes[21] = loadImage('data/pantalla14derecha.jpg');
  imagenes[22] = loadImage('data/pantalla14izquierda.jpg');
  imagenes[23] = loadImage('data/pantalla15decrecha.jpg');
  imagenes[24] = loadImage('data/pantalla15izquierda.jpg');
  imagenes[25] = loadImage('data/pantalla9final.jpg');

  flecha = loadImage('data/flecha.png');
  musicaFondo = loadSound('musica.mp3');
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(0);

  if (musicaFondo && !musicaFondo.isPlaying()) {
    musicaFondo.loop();
    musicaFondo.setVolume(0.5);
  }

  if (enTransicion) {
    let tiempoTrans = millis() - tiempoInicioTransicion;
    let desplazamiento = (tiempoTrans * width) / duracionTransicion;

    if (imagenes[imgA]) {
      image(imagenes[imgA], -desplazamiento, 0, width, height);
    }

    if (imagenes[imgB]) {
      image(imagenes[imgB], width - desplazamiento, 0, width, height);
    }

    if (tiempoTrans >= duracionTransicion) {
      enTransicion = false;
      estado = estadoDestino;
    }
  } 
  else {
    if (estado === 0) {
      if (imagenes[1]) image(imagenes[1], 0, 0, width, height);

      let bx = width / 2 - 110;
      let by = height / 2 + 50;
      let bw = 220;
      let bh = 50;

      if (detectarBoton(bx, by, bw, bh)) {
        fill(70, 130, 255);
      } else {
        fill(40, 40, 40, 230);
      }

      stroke(200, 160, 80);
      strokeWeight(2);
      rect(bx, by, bw, bh, 10);

      noStroke();
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text("EMPEZAR HISTORIA", width / 2, by + bh / 2);
      textAlign(LEFT, BASELINE);
    }
    else if (estado === 1) {
      let tiempoPasado = millis() - tiempoCinematica;

      if (tiempoPasado < 1000) {
        yCinematica = map(tiempoPasado, 0, 1000, height, -height);
        if (imagenes[2]) image(imagenes[2], 0, yCinematica, width, height);
      } else {
        estado = 2;
        tiempoCinematica = millis();
      }
    }
    else if (estado === 2) {
      let tiempoPasado = millis() - tiempoCinematica;

      if (tiempoPasado < 1000) {
        yCinematica = map(tiempoPasado, 0, 1000, height, -height);
        if (imagenes[3]) image(imagenes[3], 0, yCinematica, width, height);
      } else {
        iniciarTransicion(3, 3, 4);
      }
    }
    else if (estado === 3) {
      if (imagenes[4]) image(imagenes[4], 0, 0, width, height);
      dibujarCuadroTexto("¿Cómo puedo escapar?", false);

      dibujarBotonOpcion("Forzar la puerta", 620, 200, 45);
      dibujarBotonOpcion("Buscar paso secreto", 140, 330, 45);
    }
    else if (estado === 4) {
      if (imagenes[6]) image(imagenes[6], 0, 0, width, height);
      dibujarCuadroTexto("El Príncipe logra escapar.", true);
    }
    else if (estado === 5) {
      if (imagenes[8]) image(imagenes[8], 0, 0, width, height);
      dibujarCuadroTexto("Es sorprendido por los guardias.", false);

      dibujarBotonOpcion("Pelear desarmado", 360, 280, 45);
      dibujarBotonOpcion("Intentar escapar", 700, 240, 45);
    }
    else if (estado === 6) {
      if (imagenes[10]) image(imagenes[10], 0, 0, width, height);
      dibujarCuadroTexto("El Príncipe es capturado y ejecutado.", true);
    }
    else if (estado === 7) {
      if (imagenes[9]) image(imagenes[9], 0, 0, width, height);
      dibujarCuadroTexto("El Príncipe logra escapar de los guardias.", true);
    }
    else if (estado === 8) {
      if (imagenes[5]) image(imagenes[5], 0, 0, width, height);
      dibujarCuadroTexto("El Príncipe descubre un paso secreto.", true);
    }
    else if (estado === 9) {
      if (imagenes[7]) image(imagenes[7], 0, 0, width, height);
      dibujarCuadroTexto("Llega al nivel superior del calabozo.", true);
    }
    else if (estado === 10) {
      if (imagenes[11]) image(imagenes[11], 0, 0, width, height);
      dibujarCuadroTexto("Encuentra una espada que puede usar.", true);
    }
    else if (estado === 11) {
      if (imagenes[12]) image(imagenes[12], 0, 0, width, height);
      dibujarCuadroTexto("Un espejo místico bloquea la salida.", false);

      dibujarBotonOpcion("Atacar a la sombra", 380, 250, 45);
      dibujarBotonOpcion("Guardar la espada", 520, 350, 45);
    }
    else if (estado === 12) {
      if (imagenes[14]) image(imagenes[14], 0, 0, width, height);
      dibujarCuadroTexto("Al golpear a la sombra, siente el mismo dolor.", true);
    }
    else if (estado === 13) {
      if (imagenes[16]) image(imagenes[16], 0, 0, width, height);
      dibujarCuadroTexto("La sombra lo desarma y lo empuja al vacío.", true);
    }
    else if (estado === 14) {
      if (imagenes[13]) image(imagenes[13], 0, 0, width, height);
      dibujarCuadroTexto("Camina con calma y la sombra se fusiona con él.", true);
    }
    else if (estado === 15) {
      if (imagenes[17]) image(imagenes[17], 0, 0, width, height);
      dibujarCuadroTexto("Irrumpe en el salón justo a tiempo.", true);
    }
    else if (estado === 16) {
      if (imagenes[18]) image(imagenes[18], 0, 0, width, height);
      dibujarCuadroTexto("¿Cómo se enfrenta a Jaffar?", false);

      dibujarBotonOpcion("Ataque rápido", 380, 230, 45);
      dibujarBotonOpcion("Luchar con cuidado", 470, 330, 45);
    }
    else if (estado === 18) {
      if (imagenes[19]) image(imagenes[19], 0, 0, width, height);
      dibujarCuadroTexto("Esquiva la guardia y desarma a Jaffar.", true);
    }
    else if (estado === 19) {
      if (imagenes[20]) image(imagenes[20], 0, 0, width, height);
      dibujarCuadroTexto("Resiste los ataques mágicos con paciencia.", true);
    }
    else if (estado === 20) {
      if (imagenes[22]) image(imagenes[22], 0, 0, width, height);
      dibujarCuadroTexto("El Visir cae derrotado.", true);
    }
    else if (estado === 21) {
      if (imagenes[21]) image(imagenes[21], 0, 0, width, height);
      dibujarCuadroTexto("Logra asestar el golpe definitivo.", true);
    }
    else if (estado === 17 || estado === 22 || estado === 23) {
      let imgFinal = imagenes[25];
      if (estado === 22) imgFinal = imagenes[24];
      if (estado === 23) imgFinal = imagenes[23];

      if (imgFinal) image(imgFinal, 0, 0, width, height);

      let bx = width / 2 - 80;
      let by = height - 60;
      let bw = 160;
      let bh = 45;

      if (detectarBoton(bx, by, bw, bh)) {
        fill(70, 130, 255);
      } else {
        fill(40, 40, 40, 220);
      }

      noStroke();
      rect(bx, by, bw, bh, 8);
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text("REINICIAR", width / 2, by + bh / 2);
      textAlign(LEFT, BASELINE);
    }
  }
}

function iniciarTransicion(nuevoEstado, a, b) {
  estadoDestino = nuevoEstado;
  imgA = a;
  imgB = b;
  tiempoInicioTransicion = millis();
  enTransicion = true;
}

function dibujarCuadroTexto(mensaje, mostrarFlecha) {
  push();
  noStroke();
  fill(60, 60, 60, 190);
  rect(20, 20, 760, 80, 20);

  fill(250);
  textSize(18);
  textAlign(LEFT, TOP);
  text(mensaje, 40, 35, 650, 50);

  if (mostrarFlecha && flecha) {
    image(flecha, flechaX, flechaY, flechaAncho, flechaAlto);
  }
  pop();
}

function dibujarBotonOpcion(textoOpcion, x, y, radio) {
  let d = dist(mouseX, mouseY, x, y);

  if (d < radio) {
    push();
    fill(255, 200, 50, 180);
    stroke(255);
    strokeWeight(3);
    ellipse(x, y, radio * 2);

    rectMode(CENTER);
    fill(0, 220);
    noStroke();
    let tw = textWidth(textoOpcion) + 24;
    rect(x, y + radio + 20, tw, 28, 6);

    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(textoOpcion, x, y + radio + 20);
    pop();
  }
}

function detectarBoton(x, y, ancho, alto) {
  return mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto;
}

function mousePressed() {
  if (typeof userStartAudio === "function") {
    userStartAudio();
  }

  if (enTransicion) return;

  if (estado === 0) {
    let bx = width / 2 - 110;
    let by = height / 2 + 50;
    if (detectarBoton(bx, by, 220, 50)) {
      estado = 1;
      tiempoCinematica = millis();
    }
  }
  else if  (estado === 4 ||  estado === 6 ||  estado === 7 ||  estado === 8 ||  estado === 9 ||
            estado === 10 || estado === 12 || estado === 13 || estado === 14 || estado === 15 || 
            estado === 18 || estado === 19 || estado === 20 || estado === 21) {
    if (detectarBoton(flechaX, flechaY, flechaAncho, flechaAlto)) {
      if (estado === 4)       iniciarTransicion(5, 6, 8);
      else if (estado === 6)  iniciarTransicion(17, 10, 25);
      else if (estado === 7)  iniciarTransicion(9, 9, 7);
      else if (estado === 8)  iniciarTransicion(9, 5, 7);
      else if (estado === 9)  iniciarTransicion(10, 7, 11);
      else if (estado === 10) iniciarTransicion(11, 11, 12);
      else if (estado === 12) iniciarTransicion(13, 14, 16);
      else if (estado === 13) iniciarTransicion(17, 16, 25);
      else if (estado === 14) iniciarTransicion(15, 13, 17);
      else if (estado === 15) iniciarTransicion(16, 17, 18);
      else if (estado === 18) iniciarTransicion(20, 19, 22);
      else if (estado === 19) iniciarTransicion(21, 20, 21);
      else if (estado === 20) iniciarTransicion(22, 22, 24); 
      else if (estado === 21) iniciarTransicion(23, 21, 23); 
    }
  }

  else if (estado === 3) {
    if (dist(mouseX, mouseY, 620, 200) < 45)       iniciarTransicion(4, 4, 6);
    else if (dist(mouseX, mouseY, 140, 330) < 45)   iniciarTransicion(8, 4, 5);
  }
  else if (estado === 5) {
    if (dist(mouseX, mouseY, 360, 280) < 45)      iniciarTransicion(6, 8, 10);
    else if (dist(mouseX, mouseY, 700, 240) < 45)  iniciarTransicion(7, 8, 9);
  }
  else if (estado === 11) {
    if (dist(mouseX, mouseY, 380, 250) < 45)      iniciarTransicion(12, 12, 14);
    else if (dist(mouseX, mouseY, 520, 350) < 45)  iniciarTransicion(14, 12, 13);
  }
  else if (estado === 16) {
    if (dist(mouseX, mouseY, 380, 230) < 45) {
      iniciarTransicion(18, 18, 19);
    } else if (dist(mouseX, mouseY, 470, 330) < 45) {
      iniciarTransicion(19, 18, 20);
    }
  }

  else if (estado === 17 || estado === 22 || estado === 23) {
    let bx = width / 2 - 80;
    let by = height - 60;
    if (detectarBoton(bx, by, 160, 45)) {
      estado = 0;
    }
  }
}
