import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // Inicializacion de firebase
    firebase.initializeApp({
      apiKey: "AIzaSyDCTIDlsOs4xplACdWvsTLySnSJ6Axq0hE",
      authDomain: "fir-crud-28197.firebaseapp.com",
      databaseURL: "https://fir-crud-28197.firebaseio.com",
      projectId: "fir-crud-28197",
      storageBucket: "fir-crud-28197.appspot.com",
      messagingSenderId: "855319143844"
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
