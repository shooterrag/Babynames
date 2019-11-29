import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      console.log('Platform ready');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.show();
      // statusBar.styleDefault();
      //statusBar.hide();

      // let status bar overlay webview
      //statusBar.overlaysWebView(true);

      // set status bar to white
      // statusBar.styleBlackTranslucent();
      // statusBar.styleBlackOpaque();
      statusBar.styleLightContent();
      //statusBar.backgroundColorByHexString('#ffffff');

      splashScreen.hide();

      // screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
}

