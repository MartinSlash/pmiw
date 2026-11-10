class Obstaculo {
  constructor(x, y, ancho, alto, tipo, textura = null) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto; 
    this.tipo = tipo; 
    this.textura = textura;
    this.esSolido = (tipo === "plataforma" || tipo === "bloque");
  }

  dibujar() {
    noStroke();

    if (this.tipo === "plataforma" || this.tipo === "bloque") {
      if (this.textura) {
        let alturaVisual = this.alto + 50; 
        let offsetVisualY = 35;            

        image(this.textura, this.x, this.y - offsetVisualY, this.ancho, alturaVisual);
      } else {
        fill(120);
        rect(this.x, this.y, this.ancho, this.alto);
      }
    } else if (this.tipo === "pincho") {
      if (this.textura) {
        // Dibuja la imagen del pincho que le pasamos desde el sketch
        let alturaPincho = this.alto + 15;
        let offsetYPincho = 15;
        image(this.textura, this.x, this.y - offsetYPincho, this.ancho, alturaPincho);
      } else {
        
        fill(60);
        for (let i = 0; i < this.ancho; i += 15) {
          triangle(this.x + i, this.y + this.alto, this.x + i + 7.5, this.y, this.x + i + 15, this.y + this.alto);
        }
      }
    } else if (this.tipo === "meta") {
      fill(100);
      rect(this.x, this.y, 4, this.alto);
      fill(46, 204, 113);
      triangle(this.x + 4, this.y, this.x + 35, this.y + 15, this.x + 4, this.y + 30);
    }
  }
}

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

class BalaVertical {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 12;
    this.alto = 28;
    this.velocidad = 7;
  }

  actualizar() {
    this.y += this.velocidad;
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
