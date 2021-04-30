import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Issue, Label } from './models/repository';

@Injectable({
  providedIn: 'root'
})
export class GithubDataService {

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    const requestUrl = environment.github_api.authorize_url;
    return this.http.get(requestUrl);
  }

  getRepositoryId(repositoryName: string): Observable<any> {
    const requestUrl = `${environment.github_api.base_url}/repos/${repositoryName}`;
    return this.http.get(requestUrl).pipe(map((res: any) => res.id));
  }

  searchLabelsInRepository(repositoryId: string, query: string): Observable<Label[]> {
    const requestUrl = `${environment.github_api.base_url}/search/labels?repository_id=${repositoryId}&q=${query}`;
    return this.http.get<Label[]>(requestUrl).pipe(map((res: any) => {
      return res.items.map(item => {
        const label: Label = {
          id: item.id,
          name: item.name
        };
        return label;
       });
    }));
  }

  getIssues(repo: string, label: string, page: number, lastCheckDate: string): Observable<any> {   
    console.info(`Searching for label:${label} in repo:${repo} created after: ${lastCheckDate}.`); 
    const encodedRepo = encodeURIComponent(this.encloseInQuotes(repo));
    const encodedLabel = encodeURIComponent(this.encloseInQuotes(label));
    const queryString = `q=repo:${encodedRepo}+label:${encodedLabel}+is:open+created:>${lastCheckDate}&sort=created&per_page=30&page=${page}`;
    const requestUrl = environment.github_api.search_issues_url + `?${queryString}`;
    return this.http.get(requestUrl);
  }

  encloseInQuotes(text: string): string {
    return `\"${text}\"`;
  }
}
