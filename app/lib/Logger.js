
export default class Logger {

  static log(text) {
    console.log(text);
  }

  static logError(error, text) {
    console.log("Error!" + error + text);
  }

}
