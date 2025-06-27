import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/session/$sessionId')({
  component: RouteComponent,
})

function RouteComponent() {
//   const {sessionId} = Route.useParams();
  return <>
  <div className='flex  justify-center items-center h-screen'>
    <div>

    <div className='bg-red-500'>speaker</div>
    <div>mic & exit</div>
    </div>
  </div>
  </>
}
