import { createFileRoute } from '@tanstack/react-router'
import voiceImg from '@/voiceAvatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Mic } from 'lucide-react'
export const Route = createFileRoute('/_authenticated/session/$sessionId')({
  component: RouteComponent,
})

function RouteComponent() {
  
//   const {sessionId} = Route.useParams();
  return <>
  <div className='flex  justify-center items-center h-screen'>
    <div>
    <div className='min-h-50 min-w-50 flex items-center justify-center'>
      <Avatar className='w-38 h-38'>
        <AvatarImage src={voiceImg} />
        <AvatarFallback >Avatar</AvatarFallback>
      </Avatar>
    </div>
    <div className='flex items-center justify-center mt-10'>
    <Button className='rounded-full p-8 bg-gray-200 text-black hover:bg-gray-400 cursor-pointer flex items-center justify-center'>
  <Mic size={48} /> {/* Use the size prop to control icon size */}
</Button>
    </div>
    </div>
  </div>
  </>
}
