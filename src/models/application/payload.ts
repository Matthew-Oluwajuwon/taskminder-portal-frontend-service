/* eslint-disable prettier/prettier */
import { State } from "./state"

export namespace Payload {
  export class Auth {
    key: keyof State.Auth
    value: any
    constructor(key: keyof State.Auth, value: any) {
      this.key = key
      this.value = value
    }
  }
  export class Global {
    key: keyof State.AppState
    value: any
    constructor(key: keyof State.AppState, value: any) {
      this.key = key
      this.value = value
    }
  }
}
