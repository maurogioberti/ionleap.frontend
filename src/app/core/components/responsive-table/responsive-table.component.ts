import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ResponsiveTable } from '../../models/component/responsive.table';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})

export class ResponsiveTableComponent implements OnInit {
  @Input() item: ResponsiveTable<any>;
  @ViewChild('table', {static: true}) table: any;
  expanded: any = {};
  preventActivate: boolean = false;
  ColumnMode = ColumnMode;

  constructor(public modalCtrl: ModalController, public toastCtrl: ToastController) {
  }
  
  ngOnInit() {
    console.log(this.item.columns);
  }

  async modifyInit(item : any) {
    if(item != null) {
      const modal = await this.modalCtrl.create({
        component: this.item.component,
        componentProps: {item: item }
      });
  
      modal.onDidDismiss().then(async () => {
          await this.item.rows;
      });
  
      return await modal.present();
    }
  }

  onActivate(event) {
    if(event.type == "click") {
      if(this.preventActivate) {
        this.preventActivate = false;
        return;
      }
    
      this.modifyInit(event.row);
    }
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    if(event.type == "row") {
      this.preventActivate = true;
    }
  }
}