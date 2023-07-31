/* eslint-disable prettier/prettier */
export namespace Apiresponse {
  export class API {
    responseCode?: string
    responseMessage?: string
    data?: any
  }

  export class AuthInfo {
    _id?: string
    email?: string
    username?: string
    isVerified?: boolean
    dateCreated?: string
    profileImage?: string
    token?: string
  }
}
