
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

  static postRequest(path, data) {
    url = ApiService.url(path, data)
    Logger.log(`POST ${url}`);

    let promise = new Promise((resolve, reject) => {
      let requestObj = { method: 'POST',
                         headers: new Headers({
                          'Content-Type': 'application/json'
                         })
                       };
      fetch(url, requestObj)
        .then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            throw({name: "ApiServiceError", message: `Request failed with status ${response.status}`});
          }
        })
        .then((responseData) => {
          resolve(responseData);
        })
        .catch((error) => {
          reject(error);
        });

    });

    return promise;

  }


  static url(path, params) {
    encodedParams = queryString.stringify(params);

    return `${BaseUrl}/${path}?${encodedParams}`;
  }

}
