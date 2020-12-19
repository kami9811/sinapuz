import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../global.service';

import { ModalController } from '@ionic/angular';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  matched_id: string;

  age: number;
  gender: string = '';
  school: string = '';
  profile: string = '';

  open: number;

  imgHeight: number = 600;

  image_1: any = '';
  image_1_button: string = '登録する';
  image_1_flag: boolean = false;
  image_2: any = '';
  image_2_button: string = '登録する';
  image_2_flag: boolean = false;
  image_3: any = '';
  image_3_button: string = '登録する';
  image_3_flag: boolean = false;
  image_sns: any = '';
  image_sns_button: string = '登録する';
  image_sns_flag: boolean = false;

  register_disabled: boolean = true;
  register_outline: string = 'outline';
  register_button: string = '登録(画像が未登録です...)';

  postObj: any = {};
  returnObj: any = {};

  constructor(
    private router: Router,
    public gs: GlobalService,
    private route: ActivatedRoute,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.matched_id = params['matched_id'];
        this.postObj["id"] = localStorage.id;
        this.postObj["matched_id"] = this.matched_id;
        this.postObj["hash"] = localStorage.hash;
        const body = this.postObj;

        this.gs.http('https://kn46itblog.com/biz/oncon10/php_apis/matched/show/user', body).subscribe(
          res => {
            console.log(res);
            // console.log(this.returnObj["status"]);
            if(res["status"] == 200){
              console.log('Successed!');
              this.age = res["age"];
              if(res["gender"] == 0){
                this.gender = "その他";
              }
              else if(res["gender"] == 1){
                this.gender = "男";
              }
              else if(res["gender"] == 2){
                this.gender = "女";
              }
              this.school = res["school"];
              this.profile = res["profile"];
              this.image_1 = res["image_1"];
              this.image_2 = res["image_2"];
              this.image_3 = res["image_3"];
              this.open = res["open"];
            }
          },
          error => {
            console.log("error: " + error);
          }
        );
      },
      error => console.error(error)
    );
  }

  getSNS = () => {
    this.postObj["id"] = localStorage.id;
    this.postObj["matched_id"] = this.matched_id;
    this.postObj["open"] = this.open;
    this.postObj["hash"] = localStorage.hash;
    const body = this.postObj;

    this.gs.http('https://kn46itblog.com/biz/oncon10/php_apis/matched/show/sns', body).subscribe(
      res => {
        console.log(res);
        // console.log(this.returnObj["status"]);
        if(res["status"] == 200){
          console.log('Successed!');
          this.image_sns = res["image_sns"];
          console.log(res["image_sns"]);
          this.presentModal();
        }
      },
      error => {
        console.log("error: " + error);
      }
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        'image_sns': this.image_sns
      }
    });
    return await modal.present();
  }
}
