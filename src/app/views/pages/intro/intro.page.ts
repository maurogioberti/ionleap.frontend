import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOpts={
    autoplay:true,
    loop:true
  }

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goLogin() {
    this.navCtrl.navigateRoot('login');
  }
}
