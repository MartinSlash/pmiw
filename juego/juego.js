let juego;
let spritesJugador = [];
let imgPiedra;
let imgFondo;
let imgPincho; 

function preload() {
  spritesJugador[0] = loadImage('frame1.png');
  spritesJugador[1] = loadImage('frame2.png');
  spritesJugador[2] = loadImage('frame3.png');
  
  imgPiedra = loadImage('piedras.jpg');
  imgFondo = loadImage('fondo.jpg');
  imgPincho = loadImage('pincho.jpg'); // Carga la imagen de los pinchos
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


class Juego {
  constructor(sprites, texturaPiedra, texturaFondo, texturaPincho) {
    this.spritesJugador = sprites;
    this.texturaPiedra = texturaPiedra;
    this.texturaFondo = texturaFondo;
    this.texturaPincho = texturaPincho;
    this.reiniciar();
  }

  reiniciar() {
    this.jugador = new Personaje(50, 200, this.spritesJugador);
    this.obstaculos = [];
    this.balas = [];
    this.balasVerticales = [];
    this.camaraX = 0;
    this.tiempo = 60;
    this.gano = false;

    let tex = this.texturaPiedra;
    let pin = this.texturaPincho;

    // Generación del mapa pasando las texturas correspondientes
    this.obstaculos.push(new Obstaculo(0, 360, 300, 40, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(380, 300, 140, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(600, 260, 100, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(780, 320, 120, 20, "plataforma", tex));

    this.obstaculos.push(new Obstaculo(1000, 360, 300, 40, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(1100, 280, 40, 40, "bloque", tex));
    this.obstaculos.push(new Obstaculo(1140, 220, 40, 40, "bloque", tex));
    this.obstaculos.push(new Obstaculo(1350, 280, 120, 20, "plataforma", tex));

    this.obstaculos.push(new Obstaculo(1600, 360, 200, 40, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(1820, 280, 80, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(2000, 230, 80, 20, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(2180, 290, 80, 20, "plataforma", tex));

    this.obstaculos.push(new Obstaculo(2400, 360, 700, 40, "plataforma", tex));
    this.obstaculos.push(new Obstaculo(2520, 340, 60, 20, "pincho", pin)); // Textura de pincho
    this.obstaculos.push(new Obstaculo(2700, 280, 40, 40, "bloque", tex));

    this.obstaculos.push(new Obstaculo(3000, 260, 40, 100, "meta"));
  }

  actualizar() {
    if (frameCount % 60 === 0 && this.jugador.vivo && !this.gano) {
      this.tiempo--;
      if (this.tiempo <= 0) {
        this.jugador.vivo = false;
      }
    }

    this.camaraX = this.jugador.x - width / 3;
    if (this.camaraX < 0) this.camaraX = 0;

    if (!this.jugador.vivo || this.gano) return;

    this.jugador.actualizar(this.obstaculos);

    if (this.jugador.y > height + 50) {
      this.jugador.vivo = false;
    }

    if (frameCount % 120 === 0) {
      this.balas.push(new Bala(this.camaraX + width + 30, random(160, 310)));
    }

    if (frameCount % 60 === 0) {
      this.balasVerticales.push(new BalaVertical(random(this.camaraX + 50, this.camaraX + width - 50), -30));
    }

    for (let i = 0; i < this.obstaculos.length; i++) {
      let obs = this.obstaculos[i];
      if (obs.tipo === "pincho" && this.jugador.toca(obs)) {
        this.tiempo -= 15;
      }
      if (obs.tipo === "meta" && this.jugador.toca(obs)) {
        this.gano = true;
      }
    }

    for (let i = this.balas.length - 1; i >= 0; i--) {
      let b = this.balas[i];
      b.actualizar();
      if (b.toca(this.jugador)) {
        this.tiempo -= 15;
        this.balas.splice(i, 1);
      }
    }

    for (let i = this.balasVerticales.length - 1; i >= 0; i--) {
      let bv = this.balasVerticales[i];
      bv.actualizar();
      if (bv.toca(this.jugador)) {
        this.tiempo -= 15;
        this.balasVerticales.splice(i, 1);
      }
    }
  }

  dibujar() {
    if (this.texturaFondo) {
      image(this.texturaFondo, 0, 0, width, height);
    } else {
      background(255);
    }

    push();
    translate(-this.camaraX, 0);

    this.jugador.dibujar();

    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].dibujar();
    }

    for (let i = 0; i < this.balas.length; i++) {
      this.balas[i].dibujar();
    }

    for (let i = 0; i < this.balasVerticales.length; i++) {
      this.balasVerticales[i].dibujar();
    }

    pop();

    this.dibujarUI();
  }

  dibujarUI() {
    textSize(16);
    textAlign(LEFT, TOP);
    fill(255);
    text("Tiempo: " + this.tiempo + "s", 20, 20);

    if (this.gano) {
      fill(46, 204, 113);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("¡NIVEL COMPLETADO!", width / 2, height / 2);
    } else if (!this.jugador.vivo) {
      fill(231, 76, 60);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("¡GAME OVER!", width / 2, height / 2);
    }
  }

  teclaPresionada(codigo, tecla) {
    if (codigo === UP_ARROW || codigo === 32 || tecla === 'w' || tecla === 'W') {
      this.jugador.saltar();
    }

    if (!this.jugador.vivo || this.gano) {
      if (tecla === 'r' || tecla === 'R') {
        this.reiniciar();
      }
    }
  }
}
