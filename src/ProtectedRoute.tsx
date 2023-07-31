/* eslint-disable prettier/prettier */
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean
  children: any
}) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  } else {
    return children
  }
}

export default ProtectedRoute
