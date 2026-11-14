class Bala {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 25;
    this.alto = 8;
    this.velocidad = 6;
  }

  actualizar() {
    this.x -= this.velocidad;
  }

  dibujar() {
    noStroke();
    fill(50);
    rect(this.x, this.y, this.ancho, this.alto);
  }

  toca(jugador) {
    return (
      this.x < jugador.x + jugador.ancho &&
      this.x + this.ancho > jugador.x &&
      this.y < jugador.y + jugador.alto &&
      this.y + this.alto > jugador.y
    );
  }
}
