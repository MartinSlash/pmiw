class Pincho {
  constructor(x, y, ancho, alto, textura = null) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.textura = textura;
    this.esSolido = false; // Los pinchos no frenan al personaje, solo hacen daño al tocarlos
  }

  dibujar() {
    noStroke();
    if (this.textura) {
      image(this.textura, this.x, this.y, this.ancho, this.alto);
    } else {
      fill(60);
      for (let i = 0; i < this.ancho; i += 15) {
        triangle(
          this.x + i,
          this.y + this.alto,
          this.x + i + 7.5,
          this.y,
          this.x + i + 15,
          this.y + this.alto
        );
      }
    }
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
