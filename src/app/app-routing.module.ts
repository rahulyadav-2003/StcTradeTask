import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PiComponent } from './pi/pi.component';
import { PoComponent } from './po/po.component';
import { QuotationComponent } from './quotation/quotation.component';

const routes: Routes = [
   { path: '', component: DashboardComponent,
     children: [
      { path: 'pi', component: PiComponent },
      { path: 'po', component: PoComponent },
      { path: 'quotation', component: QuotationComponent }
    ]
    },
     { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
