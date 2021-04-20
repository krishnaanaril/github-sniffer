import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material.module';
import { AddRepositoryComponent } from './add-repository/add-repository.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    MainComponent,
    AddRepositoryComponent,
    RepositoryDetailsComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
