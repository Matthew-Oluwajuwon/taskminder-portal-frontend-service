/* eslint-disable prettier/prettier */
import CryptoJS from "crypto-js"

export class Encryption {
  static encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      "Burftagagt1577481",
    ).toString()
  }

  static decrypt(value: any): string {
    return CryptoJS.AES.decrypt(value, "Burftagagt1577481").toString(
      CryptoJS.enc.Utf8,
    )
  }
}
