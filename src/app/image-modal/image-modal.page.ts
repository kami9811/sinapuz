import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  // Data passed in by componentProps
  @Input() image_sns: any;

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  dismiss = () => {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
