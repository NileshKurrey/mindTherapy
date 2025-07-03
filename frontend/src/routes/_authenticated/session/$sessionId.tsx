import { createFileRoute } from '@tanstack/react-router'
import voiceImg from '@/voiceAvatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Mic, X } from 'lucide-react'
export const Route = createFileRoute('/_authenticated/session/$sessionId')({
  component: RouteComponent,
})

function RouteComponent() {
  //   const {sessionId} = Route.useParams();
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="min-h-50 min-w-50 flex items-center justify-center">
            <Avatar className="w-38 h-38">
              <AvatarImage src={voiceImg} />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center justify-center mt-10 gap-4">
            <Button variant={'outline'}  className="rounded-full cursor-pointer [&]:p-6 [&]:text-4xl">
            <Mic className="!w-8 !h-8" />
          </Button>
            <Button variant={'destructive'}  className="rounded-full cursor-pointer [&]:p-6 [&]:text-4xl">
            <X className="!w-8 !h-8" />
          </Button>
          </div>
        </div>
      </div>
    </>
  )
}
