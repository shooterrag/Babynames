import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Module
import { ComponentsModule } from '../components/components.module';
// import { DetailPageModule } from '../pages/detail/detail.module';
// import { SoundPageModule } from '../pages/sound/sound.module';

//Native
import { AdMobFree } from '@ionic-native/admob-free';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

//Page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Provider
import { DbServiceProvider } from '../providers/db-service/db-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule, 
    ComponentsModule,
    // DetailPageModule,
    // SoundPageModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    //Native
    AdMobFree, SQLite, SQLitePorter, TextToSpeech, ScreenOrientation, 

    {provide: ErrorHandler, useClass: IonicErrorHandler},

    //Provider
    DbServiceProvider
  ]
})
export class AppModule {}
