/* eslint-disable prettier/prettier */
export namespace ApiRequest {
  export class Auth {
    email?: string
    password?: string
    username?: string
    otp?: number
    profileImage?: string
  }

  export class CreateNewTask {
    taskName?: string
    subTasks?: string[]
    startDate?: string
    endDate?: string
    taskTheme?: string
  }
}
