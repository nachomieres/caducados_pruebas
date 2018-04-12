import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BuscadorProvider } from '../../providers/buscador/buscador';
import { AlertController } from 'ionic-angular';

declare var window;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  nombre: string = '';
  imagen: string = '';
  precio: string = '';
  mostrar = false;
  constructor(public navCtrl: NavController, public barcode: BarcodeScanner, public buscador: BuscadorProvider) {

  }

  escanea () {
    this.barcode.scan().then(barcodeData => {
      this.buscador.buscaCarrefour (barcodeData.text).subscribe (data => {
        console.log (data);
        this.nombre = data[0].nombre;
        this.imagen = data[0].imagen;
        this.precio = data[0].precio;
        this.mostrar = true;
        console.log (data);
      });
     }).catch(err => {
         console.log('Error', err);
     });
  }
  escaneaWeb () {
    this.buscador.buscaCarrefour ('8410297121104').subscribe (data => {
      this.nombre = data[0].nombre;
      this.imagen = data[0].imagen;
      this.precio = data[0].precio;
      this.mostrar = true;
    });
  }
}
