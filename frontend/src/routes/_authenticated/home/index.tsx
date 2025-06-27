import SessionCard from '@/components/session-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Widget from '@/components/widget'
import { createFileRoute } from '@tanstack/react-router'
import { Mic,Nfc,Smile ,Timer} from "lucide-react"
import { useNavigate } from '@tanstack/react-router'


export const Route = createFileRoute('/_authenticated/home/')({
  component: RouteComponent,
})

const widgets = [
  {
    title:"Total Sessions",
    stat:"10",
    icon:Nfc
  },
  {
    title:"Average Mood",
    stat:"7/10",
    icon:Smile
  },
  {
    title:"Average Session Duration",
    stat:"10 mins",
    icon:Timer
  }
]
// Define the badge type and use its valid values
type BadgeType = "positive" | "negative" | "neutral";

const reportCard =[
  {
    name:"Session 1",
    date:"2023-10-01",
    mood:"Happy",
    description:"This is a description of session 1. in this session we discussed about the mental health and how to improve it. we also discussed about the various techniques to improve the mental health.",
    time:"10:00 AM",
    badge: "positive" as BadgeType,
    onSeeReport:()=>{}
  },
  {
    name:"Session 2",
    date:"2023-10-02",
    mood:"Sad",
     description:"This is a description of session 1. in this session we discussed about the mental health and how to improve it. we also discussed about the various techniques to improve the mental health.",
    time:"10:00 AM",
    badge: "negative" as BadgeType,
    onSeeReport:()=>{}
  },
  {
    name:"Session 3",
    date:"2023-10-03",
    mood:"Neutral",
    description:"This is a description of session 1. in this session we discussed about the mental health and how to improve it. we also discussed about the various techniques to improve the mental health.",
    time:"10:00 AM",
    badge: "neutral" as BadgeType,
    onSeeReport:()=>{}
  }
]
function RouteComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    const sessionId = Math.random().toString(36).substring(2, 15); // Generate a random session ID
    // Navigate to the new session route  
    navigate({to:`/session/${sessionId}`})
  }
  return <div className='ml-4 w-[95%]'>
    <div className='w-full p-2'>
      <Card className='w-full  bg-gradient-to-r from-red-300 to-red-500 text-white rounded-lg p-4'>
      <CardContent>
        <h1 className='text-2xl font-extrabold'>Welcome Back, Nilesh!</h1>
        <p className='text-slate-50'>Ready for another meaningful conversation? Your mental journey continues here.</p>
      </CardContent>
        <CardFooter>
          <Button onClick={handleClick} className='bg-white text-red-500 tarnsition delay-100 duration-150 hover:bg-gray-50 cursor-pointer font-bold inset-shadow-red-100 shadow-lg' size='lg'>
            <Mic className='mr-1' />
            Start New Session
          </Button>
        </CardFooter>
      </Card>

    <div className='flex gap-10 mt-5 sm:justify-center flex-wrap lg:flex-nowrap'>
      {widgets.map((item)=>(
        <Widget key={item.title} title={item.title} stat={item.stat}  Icon={item.icon} />
      ))}
    </div>
    <div className='flex flex-col mt-10'>
      <h1 className='text-3xl font-bold'>Past Sessions</h1>
      <div className='flex flex-col gap-4 mt-4'>
        {reportCard.map((item)=>(
         <SessionCard key={item.name}
          name={item.name}
          date={item.date}
          time={item.time}
          description={item.description}
          mood={item.mood}
          badge={item.badge}
        />

        ))}
    </div>
    </div>
  </div>
  </div>
}
