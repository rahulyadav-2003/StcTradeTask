import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



   showInvoice = false;
  today: Date = new Date();

  poDetails = {
    poNumber: '123456',
    supplierName: 'ABC Supplier Pvt. Ltd.',
    contactPerson: 'Mr. Umesh Verma',
    supplierAddress: 'B-110, Sector 64, Noida',
    supplierPhone: '000-000-0000',
    supplierFax: '000-000-0000',
    email: 'infostcoverseas.co.in',
    shipTo: {
      name: 'Mr. X',
      company: 'XYZ Pvt Ltd',
      address: 'Street 123, Industrial Area',
      cityZip: 'Noida, 201301',
      phone: '1234567890'
    },
    items: [
      { itemNumber: '23423423', description: 'Product XYZ', qty: 15, unitPrice: 150 },
      { itemNumber: '45645645', description: 'Product ABC', qty: 1, unitPrice: 75 }
    ],
    tax: 0,
    shipping: 0,
    other: 0,
    comments: ''
  };

  addItem() {
    this.poDetails.items.push();
  }

  removeItem(index: number) {
    if (this.poDetails.items.length > 1) {
      this.poDetails.items.splice(index, 1);
    }
  }
  getSubTotal(): number {
    return this.poDetails.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  }

  getGrandTotal(): number {
    return this.getSubTotal() + this.poDetails.tax + this.poDetails.shipping + this.poDetails.other;
  }

  getTotalAmount(): number {
    return this.poDetails.items.reduce((total, item) => total + (item.qty * item.unitPrice), 0);
  }

  getGST(): number {
    // GST 18%
    return this.getTotalAmount() * 0.18;
  }


  submitForm() {
    // Optionally add form validation here before showing PO
    if (this.poDetails.supplierName && this.poDetails.items.every(item => item.description && item.qty > 0 && item.unitPrice > 0)) {
      this.showInvoice = true;
    } else {
      alert('Please fill all required fields and valid item details.');
    }
  }

  // Convert number to words (Indian numbering system)
  numberToWords(amount: number): string {
    const words = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
      'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Thirty', 'Forty', 'Fifty',
      'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    if (amount === 0) return 'Zero Rupees Only';

    function inWords(num: number): string {
      if (num < 21) return words[num];
      if (num < 100) return words[20 + Math.floor(num / 10) - 2] + (num % 10 !== 0 ? ' ' + words[num % 10] : '');
      if (num < 1000) return words[Math.floor(num / 100)] + ' Hundred ' + (num % 100 !== 0 ? 'and ' + inWords(num % 100) : '');
      if (num < 100000) return inWords(Math.floor(num / 1000)) + ' Thousand ' + (num % 1000 !== 0 ? inWords(num % 1000) : '');
      if (num < 10000000) return inWords(Math.floor(num / 100000)) + ' Lakh ' + (num % 100000 !== 0 ? inWords(num % 100000) : '');
      return inWords(Math.floor(num / 10000000)) + ' Crore ' + (num % 10000000 !== 0 ? inWords(num % 10000000) : '');
    }

    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);

    let result = '';
    if (rupees > 0) {
      result += inWords(rupees) + ' Rupees';
    }
    if (paise > 0) {
      result += (result ? ' and ' : '') + inWords(paise) + ' Paise';
    }

    return result + ' Only';
  }








  // logic to view the po 
  viewPO(){
    this.showInvoice = true
  }

}
