class Obstaculo {
  constructor(x, y, ancho, alto, tipo, textura = null) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto; // Alto de colision
    this.tipo = tipo; // "plataforma" | "bloque" | "meta"
    this.textura = textura;
    this.esSolido = (tipo === "plataforma" || tipo === "bloque"); // Solo estos frenan al jugador
  }

  dibujar() {
    noStroke();

    if (this.tipo === "plataforma" || this.tipo === "bloque") {
      if (this.textura) {
        // Ajuste visual para que la textura encaje bien con la hitbox del piso/bloque
        let alturaVisual = this.alto + 50;
        let offsetVisualY = 35;

        image(this.textura, this.x, this.y - offsetVisualY, this.ancho, alturaVisual);
      } else {
        fill(120);
        rect(this.x, this.y, this.ancho, this.alto);
      }
    } else if (this.tipo === "meta") {
      
      // meta final
      
      fill(100);
      rect(this.x, this.y, 4, this.alto);
      fill(46, 204, 113);
      triangle(this.x + 4, this.y, this.x + 35, this.y + 15, this.x + 4, this.y + 30);
    }
  }
}
