import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/entry/server')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/entry-server"!</div>
}
