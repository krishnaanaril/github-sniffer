import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GithubDataService } from '../../github-data.service';
import { Repository } from '../../models/repository';
import { StorageService } from '../../storage.service';
import { AddRepositoryComponent } from '../add-repository/add-repository.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'gsw-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storageService: StorageService
  ) { }

  activeRepos: Repository[] = [];

  ngOnInit(): void {
    this.getCurrentRepositories();
  }

  getCurrentRepositories(): void {
    this.activeRepos = [];
    const totalRepos = localStorage.length;
    for (let index = 0; index < totalRepos; index++) {
      const element =  this.storageService.getRepository(localStorage.key(index));
      this.activeRepos.push(element);
    }
  }

  addRepository(): void {
    this.bottomSheet.open(AddRepositoryComponent).afterDismissed().subscribe(() => {
      console.log(localStorage.length);
    });
  }

  deleteRepository(repositoryIndex: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: this.activeRepos[repositoryIndex]
    });
    dialogRef.afterClosed().subscribe((isDeleted: boolean)=>{
      if(isDeleted) {
        this.snackBar.open(`${this.activeRepos[repositoryIndex].full_name} deleted`, 'Okay', {
          duration: 3000
        });
        this.getCurrentRepositories();
      }
    })
  }

}
