import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';

const routes: Routes = [
  { path: 'details/:id', component: RepositoryDetailsComponent },
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
