import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { GithubDataService } from '../../github-data.service';
import { StorageService } from '../../storage.service';
import { Issue, Label, Repository } from '../../models/repository';

@Component({
  selector: 'gsw-add-repository',
  templateUrl: './add-repository.component.html',
  styleUrls: ['./add-repository.component.scss']
})
export class AddRepositoryComponent {

  repository: FormControl = new FormControl('', Validators.required);
  labelPrefix: FormControl = new FormControl('');
  matchingLabels: Observable<Label[]>;
  selectedLabels: Label[] = [];
  repositoryId: string;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('labelInput') labelInput: ElementRef<HTMLInputElement>;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AddRepositoryComponent>,
    private dataService: GithubDataService,
    private storageService: StorageService
  ) {
    this.matchingLabels = this.labelPrefix.valueChanges.pipe(
      debounceTime(500),
      switchMap((query: string| null) => query ? this.dataService.searchLabelsInRepository(this.repositoryId, query) : [])
    );
  }

  add(event: MatChipInputEvent): void {
  }

  remove(labelId: string): void {
    const index = this.selectedLabels.findIndex(item => item.id === labelId);
    if (index >= 0) {
      this.selectedLabels.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedLabels.push(event.option.value);
    this.labelInput.nativeElement.value = '';
    this.labelPrefix.setValue(null);
  }

  verifyRepository(): void{
    this.dataService.getRepositoryId(this.repository.value).subscribe((repositoryId) => {
      this.repositoryId = repositoryId;
    });
  }

  onAdd(): void {
    const currentRepository: Repository = {
      repository_id: this.repositoryId,
      full_name: this.repository.value,
      active_labels: this.selectedLabels,
      issues: []
    };
    this.storageService.setItem(currentRepository.repository_id, currentRepository);
    this.bottomSheetRef.dismiss();
  }

  cancelAddRepository(): void {
    this.bottomSheetRef.dismiss();
  }

}
