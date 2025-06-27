import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/home/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/home/users"!</div>
}
