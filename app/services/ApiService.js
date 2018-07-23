
import AsyncStorageService from './AsyncStorageService';

import Logger from '../lib/Logger';
import queryString from 'query-string';

const BaseUrl = 'http://api.ollyollyapp.com/';

export default class ApiService {


  static loginRequest(email, password) {
    url = `${BaseUrl}/authenticate`;
    Logger.log(`Requesting ${url}`);

    fetch(url,
      { method: 'POST',
        body: JSON.stringify({email: email, password: password}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        Logger.log(responseJson);
      })
      .catch((error) => {
        Logger.logError(error);
      });
  }

  static postRequest(path, data = {}) {
    url = ApiService.url(path, data)
    Logger.log(`POST ${url}`);

    let promise = new Promise((resolve, reject) => {
      ApiService.authenticationHeaders()
        .then((headers) => {
          headers.set('Content-Type': 'application/json');
          let requestObj = { method: 'POST',
                             headers: headers,
                           };
          fetch(url, requestObj)
            .then((response) => {
              if(response.ok) {

                AsyncStorageService.setItem('access-token', response.headers.get('access-token'))
                AsyncStorageService.setItem('client', response.headers.get('client'))
                AsyncStorageService.setItem('expiry', response.headers.get('expiry'))
                AsyncStorageService.setItem('uid', response.headers.get('uid'))

                return response.json();
              } else {
                reject(response);
              }
            })
            .then((responseData) => {
              resolve(responseData);
            })
            .catch((error) => {
              Logger.logError(error);
              reject(error);
            });

        });
    });

    return promise;

  }

  static getRequest(path, data = {}) {
    url = ApiService.url(path, data)
    Logger.log(`GET ${url}`);

    let promise = new Promise((resolve, reject) => {
      ApiService.authenticationHeaders()
        .then((headers) => {
          headers.set('Content-Type': 'application/json');
          let requestObj = { method: 'GET',
                             headers: headers,
                           };
          fetch(url, requestObj)
            .then((response) => {
              if(response.ok) {

                AsyncStorageService.setItem('access-token', response.headers.get('access-token'))
                AsyncStorageService.setItem('client', response.headers.get('client'))
                AsyncStorageService.setItem('expiry', response.headers.get('expiry'))
                AsyncStorageService.setItem('uid', response.headers.get('uid'))

                return response.json();
              } else {
                reject(response);
              }
            })
            .then((responseData) => {
              resolve(responseData);
            })
            .catch((error) => {
              Logger.logError(error);
              reject(error);
            });

        });
    });

    return promise;

  }


  static url(path, params) {
    encodedParams = queryString.stringify(params);

    return `${BaseUrl}/${path}.json?${encodedParams}`;
  }

  static authenticationHeaders() {

    let promise = new Promise((resolve, reject) => {
      let headers = new Headers();

      AsyncStorageService.getItem('access-token')
        .then((item) => {
          headers.set('access-token', item);
          AsyncStorageService.getItem('client')
            .then((item) => {
              headers.set('client', item);
              AsyncStorageService.getItem('expiry')
                .then((item) => {
                  headers.set('expiry', item);
                  AsyncStorageService.getItem('uid')
                    .then((item) => {
                      headers.set('uid', item);
                      resolve(headers);
                    });
                });
            });
        })
        .catch((error) => {
          Logger.logError(error);
          reject(error);
        });
    });

    return promise;
  }

}
