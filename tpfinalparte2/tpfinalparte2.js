let jugador;
let obstaculos = [];
let balas = [];
let balasVerticales = [];

let camaraX = 0;
let tiempo = 60;
let gano = false;

function setup() {
  createCanvas(800, 400);
  reiniciarJuego();
}

function reiniciarJuego() {
  jugador = new Personaje(50, 200);
  obstaculos = [];
  balas = [];
  balasVerticales = [];
  camaraX = 0;
  tiempo = 60;
  gano = false;

  // Mapa
  obstaculos.push(new Obstaculo(0, 360, 300, 40, "plataforma"));
  obstaculos.push(new Obstaculo(380, 300, 140, 20, "plataforma"));
  obstaculos.push(new Obstaculo(600, 260, 100, 20, "plataforma"));
  obstaculos.push(new Obstaculo(780, 320, 120, 20, "plataforma"));

  obstaculos.push(new Obstaculo(1000, 360, 300, 40, "plataforma"));
  obstaculos.push(new Obstaculo(1100, 280, 40, 40, "bloque"));
  obstaculos.push(new Obstaculo(1140, 220, 40, 40, "bloque"));
  obstaculos.push(new Obstaculo(1350, 280, 120, 20, "plataforma"));

  obstaculos.push(new Obstaculo(1600, 360, 200, 40, "plataforma"));
  obstaculos.push(new Obstaculo(1820, 280, 80, 20, "plataforma"));
  obstaculos.push(new Obstaculo(2000, 230, 80, 20, "plataforma"));
  obstaculos.push(new Obstaculo(2180, 290, 80, 20, "plataforma"));

  obstaculos.push(new Obstaculo(2400, 360, 700, 40, "plataforma"));
  obstaculos.push(new Obstaculo(2520, 340, 60, 20, "pincho"));
  obstaculos.push(new Obstaculo(2700, 280, 40, 40, "bloque"));

  obstaculos.push(new Obstaculo(3000, 260, 40, 100, "meta"));
}

function draw() {
  background(255);

  // Contador simple de tiempo (baja 1 segundo cada 60 frames)
  if (frameCount % 60 === 0 && jugador.vivo && !gano) {
    tiempo--;
    if (tiempo <= 0) {
      jugador.vivo = false;
    }
  }

  // Cámara que sigue al jugador
  camaraX = jugador.x - width / 3;
  if (camaraX < 0) camaraX = 0;

  // Generar balas con random
  if (frameCount % 120 === 0 && jugador.vivo && !gano) {
    balas.push(new Bala(camaraX + width + 30, random(160, 310)));
  }

  if (frameCount % 60 === 0 && jugador.vivo && !gano) {
    balasVerticales.push(new BalaVertical(random(camaraX + 50, camaraX + width - 50), -30));
  }

  // --- DIBUJAR MUNDO CON CÁMARA ---
  push();
  translate(-camaraX, 0);

  if (jugador.vivo && !gano) {
    jugador.actualizar(obstaculos);
  }
  jugador.dibujar();

  // Caída al abismo
  if (jugador.y > height + 50) {
    jugador.vivo = false;
  }

  // Obstáculos fijos
  for (let i = 0; i < obstaculos.length; i++) {
    let obs = obstaculos[i];
    obs.dibujar();

    if (obs.tipo === "pincho" && jugador.toca(obs) && jugador.vivo && !gano) {
      tiempo -= 15; // Quita tiempo si pisa pinchos
    }

    if (obs.tipo === "meta" && jugador.toca(obs)) {
      gano = true;
    }
  }

  // Balas horizontales
  for (let i = balas.length - 1; i >= 0; i--) {
    let b = balas[i];
    if (jugador.vivo && !gano) b.actualizar();
    b.dibujar();

    if (b.toca(jugador) && jugador.vivo && !gano) {
      tiempo -= 15;
      balas.splice(i, 1);
    }
  }

  // Balas verticales
  for (let i = balasVerticales.length - 1; i >= 0; i--) {
    let bv = balasVerticales[i];
    if (jugador.vivo && !gano) bv.actualizar();
    bv.dibujar();

    if (bv.toca(jugador) && jugador.vivo && !gano) {
      tiempo -= 15;
      balasVerticales.splice(i, 1);
    }
  }

  pop();

  // --- INTERFAZ / TEXTO FIJO ---
  textSize(16);
  textAlign(LEFT, TOP);
  fill(30);
  text("Tiempo: " + tiempo + "s", 20, 20);

  if (gano) {
    fill(46, 204, 113);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("¡NIVEL COMPLETADO!", width / 2, height / 2);
  } else if (!jugador.vivo) {
    fill(231, 76, 60);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("¡GAME OVER!", width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 32 || key === 'w' || key === 'W') {
    jugador.saltar();
  }

  if (!jugador.vivo || gano) {
    if (key === 'r' || key === 'R') {
      reiniciarJuego();
    }
  }
}
