import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Repository } from '../../models/repository';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'gsw-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Repository,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  deleteRepository() {
    this.storageService.removeItem(this.data.repository_id);
    this.dialogRef.close(true);
  }

  cancelDelete() {
    this.dialogRef.close(false);
  }

}
