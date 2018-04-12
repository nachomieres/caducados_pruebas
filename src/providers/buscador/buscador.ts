import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';

import firebase from 'firebase';
/*
  Generated class for the BuscadorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BuscadorProvider {
  base =  firebase.database().ref ('caducados');
  eroski: string = 'https://www.compraonline.grupoeroski.com/es/search/results/?q=';
  fecha: string = '';
  array = [];

  constructor(public http: Http, public alertCtrl: AlertController) {
    console.log('Hello BuscadorProvider Provider');
    //his.base = firebase.database().ref ('caducados');
  }

  buscaeEroski (codigo: string) {
    console.log (this.eroski + codigo);
    return this.http.get (this.eroski + codigo).map (res => {
      //let array= [];
      //return res.text () ;
      let articulo;
      let parser = new DOMParser ();
      let producto = parser.parseFromString (res.text (), "text/html").getElementsByClassName ('product-description');
      let description = parser.parseFromString (producto[0].innerHTML, "text/html").getElementsByClassName ('description-text');
      let nombre = parser.parseFromString (description[0].innerHTML, "text/html").getElementsByTagName ('a');
      console.log (nombre);
      let imagen = parser.parseFromString (producto[0].innerHTML, "text/html").getElementsByTagName ('img');
      console.log (imagen[0].attributes[2].textContent);
      this.array.push ({
        nombre: nombre[0].innerText,
        imagen: imagen[0].attributes[2].textContent
      });
      return this.array;
    }); 
    }

    buscaCarrefour (codigo: string) {
      let carrefour: string = 'https://www.carrefour.es/global/?Ntt=' + codigo + '&search=Buscar';
      this.presentPrompt ();
      return this.http.get (carrefour).map (res => {
        let array= [];
        //return res.text () ;
        let articulo;
        let parser = new DOMParser ();
        let producto = parser.parseFromString (res.text (), "text/html").getElementsByClassName ('enlace-producto');
        let imagen = parser.parseFromString (res.text (), "text/html").getElementsByClassName ('img-producto');
        let precio = parser.parseFromString (res.text (), "text/html").getElementsByClassName ('precio-nuevo');
        array.push ({
          nombre: producto[0].attributes['title'].textContent,
          imagen: imagen[0].attributes['src'].textContent,
          precio: precio[0].textContent 
        });
        let fechaCaducidad = this.fecha.split ('-');
        console.log (fechaCaducidad);
        firebase.database ().ref ('caducados/' + this.fecha).push ({
          nombre: array[0].nombre,
          precio: array[0].precio,
          imagen: array[0].imagen
        })
        return array;
      }); 
    }

    async presentPrompt() {
      let alert = this.alertCtrl.create({
        title: 'Fecha Caducidad:',
        inputs: [
          {
            name: 'Fecha de caducidad:',
            placeholder: 'fecha',
            type: 'date'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Añadir',
            handler: data => {
              this.fecha = data;
              console.log (this.array);
            }
          }
        ]
      });
      alert.present();
    }

}
