import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'column'
    }],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      }
    }
  };

  constructor() { }

  printHTML2(printArea: string, printBtns?: string[]) {
    
    const printContent = document.getElementById(printArea)!;
    // if (printBtns) {
    //   printBtns.forEach(btn => document.getElementById(btn)!.style.display = 'none');
    // }
    const printWindow = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    printWindow!.document.write(printContent.innerHTML);
    printWindow!.document.close();
    printWindow!.focus();
    printWindow!.print();
    printWindow!.close();
    printBtns!.forEach(btn => {
      document.getElementById(btn)!.style.display = 'inline-block';
    });
  }

}
