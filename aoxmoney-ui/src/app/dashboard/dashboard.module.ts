import { NgModule } from '@angular/core';
import { CommonModule,DecimalPipe } from '@angular/common';

import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    ChartModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardComponent],
  providers : [DecimalPipe]
})
export class DashboardModule { }
