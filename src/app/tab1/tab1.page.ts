import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ManateeScanner } from '../providers/manatee-scanner.provider';
declare var cmbScanner:any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	scannerActive:string ="barcode";

  constructor(
    private platform: Platform,
    private zone: NgZone,
    private manateeScanner: ManateeScanner,
    ) {
    }
  
  click() {
    debugger;
    this.manateeScanner.scan().then((barcodeData: any) => {
      debugger;
      console.log(barcodeData);
    });
  }
  
  init() {
    debugger;
    this.manateeScanner.init();
  }
}
