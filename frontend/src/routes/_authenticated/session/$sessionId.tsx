import { createFileRoute } from '@tanstack/react-router'
import voiceImg from '@/voiceAvatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
export const Route = createFileRoute('/_authenticated/session/$sessionId')({
  component: RouteComponent,
})

function RouteComponent() {
//   const {sessionId} = Route.useParams();
  return <>
  <div className='flex  justify-center items-center h-screen'>
    <div>
    <div className='min-height'>
      <Avatar>
        <AvatarImage src={voiceImg} />
        <AvatarFallback >Avatar</AvatarFallback>
      </Avatar>
    </div>
    <div>mic & exit</div>
    </div>
  </div>
  </>
}
