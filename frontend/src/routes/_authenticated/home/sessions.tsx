import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/home/sessions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/home/sessions"!</div>
}
