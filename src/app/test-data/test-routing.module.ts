import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestDataComponent } from './test-data.component';


const routes: Routes = [
    {
        path: '', component: TestDataComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule {
}
