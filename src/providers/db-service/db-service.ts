import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DbServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbServiceProvider {

  private database : SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;



  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'babynames.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          // this.fillDatabase();
          this.storage.get('database_filled').then(val => {
            console.log('#### database_filled val = '+val);
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }

 
  fillDatabase() {
    console.log('####### Start fillDatabase #######');
    this.http.get('assets/sql/babynames.db.sql')
      .map(res => res.text())
      .subscribe(sql => {
        //console.log('####### fillDatabase ####### sql : '+sql);


          this.sqlitePorter.importSqlToDb(this.database, sql).then(data => {
            console.log('####### sqlitePorter.importSqlToDb ####### '+data);

            this.databaseReady.next(true);
            this.storage.set('database_filled', true);

          })
          .catch(e => console.log('importSqlToDb error : ' + e));
          
      });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  listData() {

    console.log('### select data start ###');
    return this.database.executeSql('SELECT * FROM baby_name', {})
      .then(res => {
        console.log('### select baby_name success ### size = '+JSON.stringify(res));
        let datas = [];
        if (res.rows.length > 0) {
          //for (var i = 0; i < 30 ; i++) {
          for (var i = 0; i < res.rows.length; i++) {
            datas.push({ id: res.rows.item(i).id, name: res.rows.item(i).name, spell: res.rows.item(i).spell, desc: res.rows.item(i).desc, day: res.rows.item(i).day, gender: res.rows.item(i).gender  });
          }
        }
        return datas;
      })
      .catch(e => {
        console.log('Error: ', e);
        return [];
      });

  }
}
