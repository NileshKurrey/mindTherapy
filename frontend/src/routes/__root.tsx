import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {ToastContainer} from "react-toastify"
import {LoadingBarContainer} from "react-top-loading-bar"
export const Route = createRootRoute({
  component: () => (
    <>
      <LoadingBarContainer>
      {/* The Outlet component renders the child routes */}
      <Outlet />
      <ToastContainer position='top-right' autoClose={5000}  />
      <TanStackRouterDevtools />
      </LoadingBarContainer>
    </>
  ),
})
