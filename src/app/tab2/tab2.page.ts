import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // API用
  postObj: any = {};
  returnObj: any = {};
  matchedList: any[] = [];

  interval: any;

  information_flag: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    public gs: GlobalService,
  ) {}

  // 自動ログイン管理, 記事取得
  ngOnInit(){
    this.interval = setInterval(() => {
      // Function
      if(this.information_flag == false){
        this.information_flag = true;
        this.getList();
      }
    }, 1500);
  }

  getList = () => {
    this.postObj["id"] = localStorage.id;
    this.postObj["hash"] = localStorage.hash;

    const body = this.postObj;
    console.log(body);
    this.gs.http('https://kn46itblog.com/biz/oncon10/php_apis/matched/show/list', body).subscribe(
      res => {
        console.log(res);
        this.returnObj = res;
        if(res["status"] == 200){
          this.matchedList = res["matching"];
          console.log(this.matchedList);
        }
      },
      error => console.error(error)
    );
  }

  // 記事の投稿対象混乱を防ぐために, 仕様から外しておく
  /*
  navigateToSelf = () => {
    this.router.navigate(['/self', 2, '2']);
  }
  navigateToEdit = () => {
    this.router.navigate(['/edit', 2]);
  }
  */

}
