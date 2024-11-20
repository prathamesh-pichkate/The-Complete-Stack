import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

/**************************/
/**
 * A PrivateRoute that only allows admin users to access it.
 * If the user is not an admin, they are redirected to /sign-in.
 */
/*************/

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
