import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scannedResults: any = [];

  constructor(
    public router: Router,
    ) {}


  ionViewWillEnter() {

   let scannedResults = JSON.parse(localStorage.getItem("scannedResults"));
   if(!scannedResults){
    localStorage.setItem('scannedResults', JSON.stringify([]))
    this.scannedResults = []
    // this.scannedResults =  [{ link: '123emple/kjgfkjfsdjkjkdj' },{ link: '234example/kjgfkjfsdjkjkdj' },{ link: '345example/kjgfkjfsdjkjkdj' },{ link: '456example/kjgfkjfsdjkjkdj' }]
   }else{
    this.scannedResults = scannedResults;
   }

  }

  startScan() {
    setTimeout(() => {
      this.router.navigate(["/scan"]);
    }, 300);
  }


  removeLink(LinkIndex){
    // this.scannedResults = this.scannedResults.filter(obj =>  obj.link != Link);
    this.scannedResults.splice(LinkIndex, 1);
    localStorage.setItem('scannedResults', JSON.stringify(this.scannedResults))
  }
  

}
