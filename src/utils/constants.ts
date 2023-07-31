/* eslint-disable prettier/prettier */
export const AuthPageSideText = {
  Signin: "Welcome Back 👋🏽",
  Signup: "Get Started",
  ChangePassword: "Change Password"
}

export const FORM_INPUT_TYPE = {
  INPUT: "input",
  PASSWORD: "password",
}

export const INITIALIZER_TYPE = {
  SIGNUP: "signup",
  SIGNIN: "signin"
}

export const FORM_METHODS = {
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  GET: "GET",
}

export const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
}

export const ROUTE_NAMES = {
  AUTHENTICATION: {
    SIGN_UP: "/signup",
    SIGN_IN: "/",
    OTP_VERIFICATION: "/otp-verification",
  },
  PROTECTED_ROUTES: {
    DASHBOARD: "/dashboard",
    ONGOING_TASK: "ongoing-task",
    COMPLETED_TASK: "completed-task",
    UPCOMING_TASK: "upcoming-task",
    CREATE_NEW_TASK: "create-new-task",
  },
}
