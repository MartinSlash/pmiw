class Personaje {
  constructor(x, y, sprites) {
    this.x = x;
    this.y = y;
    this.ancho = 60;
    this.alto = 90;
    this.vx = 0;
    this.vy = 0;
    this.gravedad = 0.6;
    this.enSuelo = false;
    this.vivo = true;
    this.sprites = sprites;
  }

  actualizar(obstaculos) {
    if (!this.vivo) return;

    this.vx = 0;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.vx = -5;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.vx = 5;
    }

    this.x += this.vx;
    this.evaluarColisionX(obstaculos);

    this.vy += this.gravedad;
    this.y += this.vy;
    this.enSuelo = false;
    this.evaluarColisionY(obstaculos);
  }

  saltar() {
    if (this.enSuelo && this.vivo) {
      this.vy = -12;
      this.enSuelo = false;
    }
  }

  evaluarColisionX(obstaculos) {
    for (let i = 0; i < obstaculos.length; i++) {
      let obs = obstaculos[i];
      if (obs.esSolido && this.toca(obs)) {
        if (this.vx > 0) this.x = obs.x - this.ancho;
        if (this.vx < 0) this.x = obs.x + obs.ancho;
        this.vx = 0;
      }
    }
  }

  evaluarColisionY(obstaculos) {
    for (let i = 0; i < obstaculos.length; i++) {
      let obs = obstaculos[i];
      if (obs.esSolido && this.toca(obs)) {
        if (this.vy > 0) {
          this.y = obs.y - this.alto;
          this.vy = 0;
          this.enSuelo = true;
        } else if (this.vy < 0) {
          this.y = obs.y + obs.alto;
          this.vy = 0;
        }
      }
    }
  }

  toca(obs) {
    return (
      this.x < obs.x + obs.ancho &&
      this.x + this.ancho > obs.x &&
      this.y < obs.y + obs.alto &&
      this.y + this.alto > obs.y
    );
  }

  dibujar() {
    let imgActual;

    if (!this.enSuelo) {
      imgActual = this.sprites[2];
    } else if (this.vx !== 0) {
      let paso = floor(frameCount / 10) % 2;
      imgActual = this.sprites[paso];
    } else {
      imgActual = this.sprites[0];
    }

    if (imgActual) {
      image(imgActual, this.x, this.y + 12, this.ancho, this.alto);
    } else {
      noStroke();
      fill(46, 204, 113);
      rect(this.x, this.y, this.ancho, this.alto);
    }
  }
}
