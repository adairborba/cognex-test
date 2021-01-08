import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare let scanner: any;

const Usernames = {
  android: 'BRB.Android.C25.UDL',
  ios: 'BRB.iOS.C25.UDL'
};

const Keys = {
  android: '5F9AA9624F8877A64C4FCC4C0A9BB9025D3C99D6F346EF40497FE6708AF213C9',
  ios: 'FCD7C302B5E2B565EE6F90263E35065D57C37AC468C1816E49F4DC81C9B1DE3C'
};

@Injectable()
export class ManateeScanner {

  public scanner: any;

  constructor(
    private platform: Platform,
  ) {
  }

  init() {
    debugger;
    if (!this.platform.is('capacitor')) return;

    this.config().then(() => {
      console.warn('barcode-scanner initialized');
    }).catch(() => console.warn('barcode-scanner not found'));
  }

  scan(): Promise<any> {
    if (!this.platform.is('capacitor')) return Promise.reject(null);

    return new Promise((resolve, reject) => {
      debugger;
      this.scanner.startScanning((mwbs, constants, dvc) => this.initFunc(mwbs, constants, dvc), (barcodeData: any) => {
        // this.app._appRoot.getNativeElement().classList.remove('disable-scroll');

        resolve(barcodeData);
      });
    });
  }

  private initFunc(mwbs, constants, dvc) {
    debugger;
    mwbs['MWBregisterCode'](constants.MWB_CODE_MASK_25, Usernames.android, Keys.android);
    mwbs['MWBsetMinLength'](constants.MWB_CODE_MASK_25, 44);

    mwbs['MWBsetInterfaceOrientation'](constants.OrientationPortrait);
    mwbs['MWBsetDirection'](constants.MWB_SCANDIRECTION_VERTICAL | constants.MWB_SCANDIRECTION_HORIZONTAL);
    mwbs['MWBenableHiRes'](true);
    mwbs['MWBenableZoom'](true);
    mwbs['MWBsetLevel'](1);

  }

  private config() {
    debugger;
    if (typeof scanner !== 'undefined' && typeof scanner.startScanning !== 'undefined') {
      this.scanner = scanner;
      return Promise.resolve();
    } else return Promise.reject(null);
  }

  private get platformKey(): string {
    if( this.platform.is('android') ) {
      return Keys.android;
    } else {
      if( this.platform.is('ios') ) {
        return Keys.ios;
      } else {
        return '';
      }
    }
  }

  private get platformUsername(): string {
    if( this.platform.is('android') ) {
      return Usernames.android;
    } else {
      if( this.platform.is('ios') ) {
        return Usernames.ios;
      } else {
        return '';
      }
    }
  }

}
