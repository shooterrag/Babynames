import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { DbServiceProvider } from '../../providers/db-service/db-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  daylists = [];
  isLoadingList: boolean;

  constructor(public navCtrl: NavController){ //, private dbService: DbServiceProvider) {
    console.log('Show home page');
    
  }

  openNavDetailsPage(page, item) {
    this.navCtrl.push(page, {item: item});
  }

  // listData() {
  //   this.isLoadingList = true;
  //   this.dbService.listDay().then(datas => {
  //     this.daylists = datas;
  //     this.isLoadingList = false;
  //   });
  // }
  
  async ionViewDidLoad(){
    console.log('### ionViewDidLoad ###');
   
    // if (this.dbService) {
    //   await this.dbService.getDatabaseState().toPromise().then(rdy => {
    //     console.log('### constructor DetailPage rdy = '+rdy);
    //     if (rdy) {
    //       this.listData();
    //     }
    //   });
    // }
  }
  ionViewDidEnter(){
    console.log('### ionViewDidEnter ###');
    // this.listDataJSON();
  }

}
