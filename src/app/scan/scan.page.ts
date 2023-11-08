import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss'],
})
export class ScanPage implements OnDestroy {

  qrCodeString = 'This is a secret qr code message';
  scannedResult: any;
  scannedResults: any =[];
  subscription;
  scanning: boolean= false 
  constructor(
    public router: Router,
    private platform: Platform,

    ) {}


  ionViewWillEnter() {
    this.subscription = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        if (this.router.url == "/scan") {
          this.router.navigate(["/home"]);
        }
      }
    );

    this.scannedResults = JSON.parse(localStorage.getItem("scannedResults"));

  }
  
  back(){
    this.router.navigate(["/home"]);
  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
      return false;
    }
  }


  async startScan() {
    try {
      const permission = await this.checkPermission();
      if(!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.scanning = true
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.scanning = false
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
        let Result = {
          link : this.scannedResult
        } 
        this.scannedResults.push(Result)
        localStorage.setItem('scannedResults', JSON.stringify(this.scannedResults))
      }
    } catch(e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.scanning = false
  }

  ngOnDestroy(): void {
      this.stopScan();
  }

}
