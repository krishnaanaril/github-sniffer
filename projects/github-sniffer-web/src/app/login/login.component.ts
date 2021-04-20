import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { GithubDataService } from '../github-data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'gsw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    ) { } 

  login(): void{
    const authUrl = `${environment.github_api.authorize_url}?client_id=${environment.credentials.client_id}`;
    this.document.location.href = authUrl;
  }

}
