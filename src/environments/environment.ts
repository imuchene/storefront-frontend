// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/',
  returnUrl: 'https://localhost:4200/payment',
  stripePublicKey:
    'pk_test_51JNFj6GIyORaO7x3u4vzlVQJh4VdrlQa45nQVdVV8GCftT6TWYyuUG8xhD72TN6zdnwTpnJq3FZwz3FN41436Wlp009CDJriWG',
  stripeApiVersion: '2022-11-15',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
