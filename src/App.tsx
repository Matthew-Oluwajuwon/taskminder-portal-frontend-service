/* eslint-disable prettier/prettier */
import { Route, Routes } from "react-router-dom"
import AuthLayout from "./common/layout/auth"
import { OTPVerification, SignIn, SignUp } from "./views/authentication"
import { ConfigProvider } from "antd"
import { getThemeConfig } from "./theme.config"
import { PageLayout } from "./common/layout/page"
import {
  CompletedTaskExpanded,
  CreateNewTask,
  Dashboard,
  OngoingTaskExpanded,
  UpcomingTaskExpanded,
} from "./views/dashboard"
import { ROUTE_NAMES } from "./utils/constants"
import { useAppSelector } from "./store/hooks"
import ProtectedRoute from "./ProtectedRoute"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const { theme, global } = useAppSelector((state) => {
    return state
  })

  return (
    <ConfigProvider theme={getThemeConfig(theme)}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route
            path={ROUTE_NAMES.AUTHENTICATION.SIGN_UP}
            element={<SignUp />}
          />
          <Route
            path={ROUTE_NAMES.AUTHENTICATION.OTP_VERIFICATION}
            element={
              <ProtectedRoute
                isLoggedIn={
                  (!global.userInfo?.isVerified as boolean) &&
                  !sessionStorage.getItem("***")
                    ? true
                    : false
                }
              >
                <OTPVerification />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path={ROUTE_NAMES.PROTECTED_ROUTES.DASHBOARD}
          element={
            <ProtectedRoute isLoggedIn={sessionStorage.getItem("***") ? true : false}>
              <PageLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path={ROUTE_NAMES.PROTECTED_ROUTES.ONGOING_TASK}
            element={<OngoingTaskExpanded />}
          />
          <Route
            path={ROUTE_NAMES.PROTECTED_ROUTES.COMPLETED_TASK}
            element={<CompletedTaskExpanded />}
          />
          <Route
            path={ROUTE_NAMES.PROTECTED_ROUTES.UPCOMING_TASK}
            element={<UpcomingTaskExpanded />}
          />
          <Route
            path={ROUTE_NAMES.PROTECTED_ROUTES.CREATE_NEW_TASK}
            element={<CreateNewTask />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </ConfigProvider>
  )
}

export default App
