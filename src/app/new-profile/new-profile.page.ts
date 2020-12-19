import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.page.html',
  styleUrls: ['./new-profile.page.scss'],
})
export class NewProfilePage implements OnInit {
  age: number;
  gender: number;
  school: string = '';
  profile: string = '';

  imgHeight: number = 600;

  image_1: string = '';
  image_1_button: string = '登録する';
  image_1_flag: boolean = false;
  image_2: string = '';
  image_2_button: string = '登録する';
  image_2_flag: boolean = false;
  image_3: string = '';
  image_3_button: string = '登録する';
  image_3_flag: boolean = false;
  image_sns: string = '';
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
  ) { }

  ngOnInit() {
  }

  postProfile = () => {
    this.postObj["id"] = localStorage.id;
    this.postObj["age"] = this.age;
    this.postObj["gender"] = this.gender;
    this.postObj["school"] = this.school;
    this.postObj["profile"] = this.profile;
    this.postObj["image_1"] = this.image_1;
    this.postObj["image_2"] = this.image_2;
    this.postObj["image_3"] = this.image_3;
    this.postObj["image_sns"] = this.image_sns;
    this.postObj["hash"] = localStorage.hash;
    const body = this.postObj;

    this.gs.http('https://kn46itblog.com/biz/oncon10/php_apis/user/edit/profile', body).subscribe(
      res => {
        console.log(res);
        // console.log(this.returnObj["status"]);
        if(res["status"] == 200){
          console.log('Successed!');
          this.router.navigate(['/tabs', 'tab1', 'login']);
        }
      },
      error => {
        console.log("error: " + error);
      }
    );
  }

  loadPicture = (e: any) => {
    console.log(e);
    var file: any = e.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        if(e.target.id == 'image_1'){
          this.image_1 = canvas.toDataURL(imgType);
          console.log(this.image_1);
        }
        else if(e.target.id == 'image_2'){
          this.image_2 = canvas.toDataURL(imgType);
          console.log(this.image_2);
        }
        else if(e.target.id == 'image_3'){
          this.image_3 = canvas.toDataURL(imgType);
          console.log(this.image_3);
        }
        else if(e.target.id == 'image_sns'){
          this.image_sns = canvas.toDataURL(imgType);
          console.log(this.image_sns);
        }
      }
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
      if(e.target.id == 'image_1'){
        this.image_1_flag = true;
      }
      else if(e.target.id == 'image_2'){
        this.image_2_flag = true;
      }
      else if(e.target.id == 'image_3'){
        this.image_3_flag = true;
      }
      else if(e.target.id == 'image_sns'){
        this.image_sns_flag = true;
      }
      // flag全部trueで登録有効
      if(this.image_1_flag && this.image_2_flag && this.image_3_flag && this.image_sns_flag){
        this.register_disabled = false;
        this.register_button = '登録';
        this.register_outline = 'solid';
      }
    };
    if (file) {
      console.log(fileReader.readAsDataURL(file));
    }
  }

}
