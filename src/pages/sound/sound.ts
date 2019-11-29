import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the SoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'sound-page'
})

@Component({
  selector: 'page-sound',
  templateUrl: 'sound.html',
})
export class SoundPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private tts: TextToSpeech) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoundPage');
  }

  playSound(dbtext: string){
    console.log('## Play Sound ## ' + dbtext);

    this.tts.speak({ text: dbtext, locale: 'th-TH'}).then(() => {
          console.log('Success')
    })  
    .catch((reason: any) => console.log('Error : ' + JSON.stringify(reason)));
  }

}
