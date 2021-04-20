import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GithubDataService } from '../../github-data.service';
import { Issue, Label, Repository } from '../../models/repository';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'gsw-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent implements OnInit, OnDestroy {

  issues$: BehaviorSubject<Issue[]>;
  componentDestroyed$: Subject<boolean>;
  activeRepositoryId: string;
  activeRepository: Repository;

  constructor(
    private route: ActivatedRoute,
    private dataService: GithubDataService,
    private storageService: StorageService
  ) {
    this.issues$ = new BehaviorSubject<Issue[]>([]);
    this.componentDestroyed$ = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((params) => {
      this.activeRepositoryId = params.get('id');
      this.fetchUpdatedDataFromStorage()
    });
  }

  trackByFunction(index, item: Issue) {
    return item.id;
  }

  /**
   * 
   */
  fetchUpdatedDataFromStorage(): void {
    this.activeRepository = this.storageService.getRepository(this.activeRepositoryId);
    this.issues$.next(this.activeRepository.issues);
  }

  /**
   * 
   */
  refreshIssues(): void {
    this.fetchUpdatedData().then(() => {
      this.fetchUpdatedDataFromStorage();
    });
  }

  /**
   * 
   */
  async fetchUpdatedData(): Promise<void> {
    this.fetchIssuesForEachLabel()
      .pipe(
        tap((res: Array<Issue[]>) => {
          res.forEach((item, index) => {
            if(item.length > 0) {
              this.activeRepository.active_labels[index].checked_at = item[0].created_at;
            }
          });
        })
      )
      .subscribe((res: Array<Issue[]>) => {
        const newIssues = res.reduce((acc, val) => acc.concat(val), []);
        const newUniqueIssues = this.getUniqueIssues(newIssues.concat(this.activeRepository.issues));
        this.activeRepository.issues = newUniqueIssues;
        this.activeRepository.issues.sort((a: Issue, b: Issue) => {
          if (a.created_at < b.created_at) {
            return 1;
          } else if (a.created_at > b.created_at) {
            return -1;
          }
          return 0;
        });
        this.storageService.setItem(this.activeRepositoryId, this.activeRepository);
      });
  }

  /**
   * 
   * @returns 
   */
  fetchIssuesForEachLabel() {
    const labels = this.activeRepository.active_labels.map(label =>
      this.dataService.getIssues(this.activeRepository.full_name, label.name, 1, label.checked_at ?? this.getOneWeekAgo())
        .pipe(
          map(searchResults => searchResults.items)
        )
    );
    return forkJoin(
      labels
    );
  }

  /**
   * 
   * @param issues 
   * @returns 
   */
  getUniqueIssues(issues: Issue[]): Issue[] {
    const uniqueIssues = [...new Map(issues.map(item => [item.id, item])).values()];
    return uniqueIssues;
  }

  /**
   * 
   * @returns 
   */
  getOneWeekAgo(): string {
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return oneWeekAgo.toISOString();
  }

  timeSince(dateString: string) {
    const date = (new Date(dateString)).getTime();
    const thisMoment = new Date().getTime();
    const seconds = Math.floor((thisMoment - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 0) {
      return interval + (interval === 1 ? ' year' : ' years');
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
      return interval + (interval === 1 ? ' month' : ' months');
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
      return interval + (interval === 1 ? ' day' : ' days');
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
      return interval + (interval === 1 ? ' hour' : 'hours');
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
      return interval + (interval === 1 ? ' minute' : ' minutes');
    }
    return Math.floor(seconds) + (interval === 1 ? ' second' : ' seconds');
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }
}
