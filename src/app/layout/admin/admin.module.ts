import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, AdminRoutingModule, PageHeaderModule],
    declarations: [AdminComponent]
})
export class AdminModule {}
