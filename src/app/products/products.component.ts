import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: '[products]',
  templateUrl: './products.template.html',
  styleUrls: ['./products.style.scss'],
  encapsulation: ViewEncapsulation.None


})
export class Products {

  products:any;
  constructor(){

  }

  ngOnInit(){

    this.products = JSON.parse(localStorage.getItem('product'));
    //this.item = this.products[0];

    //this.role = JSON.parse(localStorage.getItem('profile')).role.id;

    //this.loadRequest();
  /*  setTimeout(()=>{
      this.id = JSON.parse(localStorage.getItem('profile')).organization.id;

      if(localStorage.getItem('product')){
        this.products = JSON.parse(localStorage.getItem('product'));
        console.log(this.products);
      } else {
        this.getWines(this.id);
      }
    },1000);*/


    //this.getProfile();
    //this.products = JSON.parse(localStorage.getItem('product'));
    /*  this._loginService.getWines('http://api.wineta.com/v1/admin/organization?id=',1).subscribe(
        // the first argument is a function which runs on success
        data => { this.products = data},
        // the second argument is a function which runs on error
        err => console.error('There was an error: ' + err),
        // the third argument is a function which runs on completion
        () => console.log(this.products)
      );*/


  }
}
