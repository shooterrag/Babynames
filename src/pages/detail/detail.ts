import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbServiceProvider } from '../../providers/db-service/db-service';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import 'rxjs/add/operator/debounceTime';
  
@IonicPage({
  name: 'detail-page'
})
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  dbtext: string;
  searchTerm: string = '';
  searchControl: FormControl;
  key: string;
  namelists = [];
  nameFilterlists = [];
  isLoadingList: boolean;
  
  constructor(public navCtrl: NavController,public navParams: NavParams, private platform: Platform, private dbService: DbServiceProvider, private tts: TextToSpeech) {

    console.log('Show detail page');
    this.searchControl = new FormControl();
    this.key = this.navParams.get('item');
    console.log('Show detail page key = '+ this.key);
    
  }

  listData() {
    this.isLoadingList = true;
    this.namelists = this.dbService.listData(this.key);
    this.initializeItems();
    this.isLoadingList = false;
  }
  
  playSound(dbtext: string){
    dbtext = dbtext.split('-').join('');

    console.log('## Play Sound ## ' + dbtext);

    let rateVal = 1.0;
    if (this.platform.is('ios')) rateVal = 1.75;

    this.tts.speak({ text: dbtext, locale: 'th-TH', rate: rateVal}).then(() => {
          console.log('Success');
    })
    .catch((reason: any) => console.log('Error : ' + JSON.stringify(reason)));
   
  }

  initializeItems() {
    this.nameFilterlists = this.namelists;
  }

  setFilteredItems() {
    this.initializeItems();
    this.nameFilterlists = this.nameFilterlists.filter((namestr) => {

      //console.log('## searchTerm : '+this.searchTerm.toLowerCase()+ 'Match: '+(namestr.desc.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) +' word : '+namestr.desc.toLowerCase());
      return (namestr.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) ||
              (namestr.desc.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1) ;
    });
  }

  ionViewDidLoad(){
    console.log('### ionViewDidLoad ###');
   
    this.dbService.getDatabaseState().subscribe(rdy => {
      console.log('### constructor DetailPage rdy = '+rdy);
      if (rdy) {
        this.listData();
        this.searchControl.valueChanges.debounceTime(500).subscribe(search => {
          this.setFilteredItems();
        });
      }
    });

  }
  ionViewDidEnter(){

  }

}
