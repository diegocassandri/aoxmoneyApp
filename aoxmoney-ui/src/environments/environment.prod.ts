export const environment = {
  production: true,
  apiUrl: 'https://aoxmoney-api.herokuapp.com',
  tokenWhitelistedDomains: [ new RegExp('https://aoxmoney-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
