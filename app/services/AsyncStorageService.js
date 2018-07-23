
import { AsyncStorage } from 'react-native';

export default class AsyncStorageService {

  static setItem(key, value) {
    let promise = new Promise((resolve, reject) => {
      AsyncStorage.setItem(key, value)
        .then((item) => {
          resolve(item);
        })
        .catch((error) => {
          reject(error);
        });

    });

    return promise;
  }

  static getItem(key) {
    let promise = new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((item) => {
          resolve(item);
        })
        .catch((error) => {
          reject(error);
        });

    });

    return promise;
  }


}
