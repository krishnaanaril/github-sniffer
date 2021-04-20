// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  credentials: {
    client_id: 'b8afef5f955ae3488bf3',
    client_secret: '1e694388cf6769bdeb49c88c13b184d769a940bb'
  },
  github_api: {
    base_url: 'https://api.github.com',
    authorize_url: 'https://github.com/login/oauth/authorize',
    search_issues_url: 'https://api.github.com/search/issues'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
