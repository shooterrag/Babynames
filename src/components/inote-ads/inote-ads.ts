import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

/**
 * Generated class for the InoteAdsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'inote-ads',
  templateUrl: 'inote-ads.html'
})
export class InoteAdsComponent {

  text: string;

  constructor(private admobFree: AdMobFree) { 

    console.log('Hello InoteAdsComponent Component');
    //this.text = 'Inote Ads';

    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: true,
      autoShow: true,
      //bannerAtTop: true,
      //overlap: true,
      id: 'ca-app-pub-7898701566961277/2369845231'
     };
     this.admobFree.banner.config(bannerConfig);
     
     this.admobFree.banner.prepare()
       .then(() => {

        // this.text = 'Inote load Ads success';
         //this.admobFree.banner.show();
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }

}
