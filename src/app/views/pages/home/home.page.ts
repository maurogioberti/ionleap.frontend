import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productsSubmenu: boolean = true;
  customersSubmenu: boolean = true;
  brandsSubmenu: boolean = true;
  categoriesSubmenu: boolean = true;

  constructor(private menu: MenuController, private navCtrl: NavController) {
    this.menu.enable(true, 'main-menu');
  }

  ngOnInit() {
  }

  viewLogin() {
    this.navCtrl.navigateForward('login');
  }

  viewMenu() {
    this.menu.toggle('main-menu');
  }

  menuItemHandler(name: string): void {
    this[name] = !this[name];
  }

  viewMenuManage(menu: string){
    this.navCtrl.navigateForward(`${menu}-manage`);
  }

}
