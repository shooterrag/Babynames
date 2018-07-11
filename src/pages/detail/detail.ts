import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DbServiceProvider } from '../../providers/db-service/db-service';
import { TextToSpeech } from '@ionic-native/text-to-speech';
  
@IonicPage({
  name: 'detail-page'
})
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  dbtext: string;
  namelists = [];
  nameFilterlists = [];
  isLoadingList: boolean;
  
  constructor(public navCtrl: NavController, private dbService: DbServiceProvider, private tts: TextToSpeech) {

    console.log('Show detail page');

    this.dbService.getDatabaseState().subscribe(rdy => {

      console.log('### constructor DetailPage rdy = '+rdy);
      if (rdy) {
        this.listData();
      }
    });
  }

  listData() {
    this.isLoadingList = true;
    this.dbService.listData().then(datas => {
      this.namelists = datas;
      this.initializeItems();
    });
  }
  
  playSound(dbtext: string){
    console.log('## Play Sound ## ' + dbtext);

    this.tts.speak({ text: dbtext, locale: 'th-TH'}).then(() => {
          console.log('Success')
    })  
    .catch((reason: any) => console.log('Error : ' + JSON.stringify(reason)));
  }

  initializeItems() {
    this.nameFilterlists = this.namelists;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      console.log('## Type : '+val);
      this.nameFilterlists = this.nameFilterlists.filter((namestr) => {
        return (namestr.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  ionViewDidEnter(){
    this.isLoadingList = false;
  }
}
