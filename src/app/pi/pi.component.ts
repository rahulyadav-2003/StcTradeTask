import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.css']
})
export class PiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      const savedPiNumber = localStorage.getItem('lastPiNumber');
  this.piBaseNumber = savedPiNumber ? +savedPiNumber + 1 : 26525;
  }


  mail : string = 'sales@stcoverseas.co.in';
  piBaseNumber = 26525;

   invoiceDetails = {
    to: '',
    address: '',
    tel: '',
    attn: '',
    shippingCharges: 0, 
    items: [
      { description: '', qty: 1, unitPrice: 0 }
    ]
  };

  addItem() {
    this.invoiceDetails.items.push({ description: '', qty: 1, unitPrice: 0 });
  }

  removeItem(index: number) {
    if (this.invoiceDetails.items.length > 1) {
      this.invoiceDetails.items.splice(index, 1);
    }
  }

getTotal(): number {
  return this.invoiceDetails.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}

getGST(): number {
  return this.getTotal() * 0.18;
}

getGrandTotal(): number {
  return this.getTotal() + this.getGST() + (this.invoiceDetails.shippingCharges || 0);
}




  toWords(amount: number): string {
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const getWords = (num: number): string => {
    if (num < 20) return ones[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + getWords(num % 100) : '');
    if (num < 100000) return getWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + getWords(num % 1000) : '');
    if (num < 10000000) return getWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + getWords(num % 100000) : '');
    return getWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + getWords(num % 10000000) : '');
  };

  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  let words = '';
  if (rupees > 0) {
    words += getWords(rupees) + ' Rupees';
  }
  if (paise > 0) {
    words += (words ? ' and ' : '') + getWords(paise) + ' Paise';
  }

  return words ? words + ' Only' : 'Zero Rupees Only';
}


getPiNumber(): string {
  return `STC${this.piBaseNumber}`;
}




  submitForm(form: NgForm) {
    this.showInvoice = true;
    this.invoiceForm = false;
    if (form.valid) {
    // Proceed with invoice generation
    localStorage.setItem('lastPiNumber', this.piBaseNumber.toString());
    this.piBaseNumber++; // increment for next invoice
  }
  }



  downloadPDF(): void {
   const element = document.getElementById('invoice-pdf');
  if (!element) return;

  html2canvas(element, {
    scale: 5, // Lower scale for lower resolution (1 is minimal readable)
    useCORS: true // If your images (like logo) are hosted externally
  }).then(canvas => {
    // Convert canvas to JPEG with compression (0.6 = 60% quality)
    const imgData = canvas.toDataURL('image/jpeg', 0.6); // Smaller than PNG or full-quality JPG

    // Initialize jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add compressed image to PDF
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Save PDF file
    pdf.save('invoice.pdf');
  });
  this.showInvoice = false;

}



  //  logic to view the invoice 

  showInvoice = false;
  invoiceForm = true;

  viewInvoice() {
    this.showInvoice = true;
    this.invoiceForm = false;
  }


}
