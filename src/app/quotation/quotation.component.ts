import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {


   mail : string = 'sales@stcoverseas.co.in';
   quotationForm : boolean = true;
    sameAsBilled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
quotationDetails = {
   billedTo: {
      name: '',
      address: '',
      phone: ''
    },
    shipTo: {
      name: '',
      address: '',
      phone: ''
    },
  clientName: '',
  clientAddress: '',
  clientPhone: '',
  contactPerson: '',
  validityDate: '',
  referenceFile: null,
  items: [
    { description: '', qty: null, unitPrice: null }
  ],
  additionalCharges: 0,
  terms: ''
};


 copyBilledToShip() {
    if (this.sameAsBilled) {
      this.quotationDetails.shipTo = { ...this.quotationDetails.billedTo };
    } else {
      this.quotationDetails.shipTo = { name: '', address: '', phone: '' };
    }
  }


addItem() {
  this.quotationDetails.items.push({ description: '', qty: null, unitPrice: null });
}

removeItem(index: number) {
  if (this.quotationDetails.items.length > 1) {
    this.quotationDetails.items.splice(index, 1);
  }
}


submitForm(){

}

  


   items = [
    { description: 'Item 1', hsn: '4564', qty: 3, rate: 50, amount: 150 },
    { description: 'Item 2', hsn: '4154', qty: 2, rate: 100, amount: 200 },
    { description: 'Item 3', hsn: '7878', qty: 3, rate: 200, amount: 600 }
  ];

}
