import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CampagneRoutingModule } from './campagne-routing.module';
import { CampagneComponent } from './campagne.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, Ng2Charts, CampagneRoutingModule, PageHeaderModule, FormsModule, ReactiveFormsModule],
    declarations: [CampagneComponent]
})
export class CampagneModule {}
