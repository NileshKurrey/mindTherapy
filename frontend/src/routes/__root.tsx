import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {ToastContainer} from "react-toastify"
export const Route = createRootRoute({
  component: () => (
    <>
  
      <Outlet />
      <ToastContainer position='top-right' autoClose={5000}  />
      <TanStackRouterDevtools />
    </>
  ),
})
