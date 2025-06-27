import { Card, CardContent, CardDescription, CardHeader } from "./ui/card"

function Widget({ title, stat, Icon }: { title: string; stat: string; Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>> }) {
  return (
    <>
    <Card className="w-92 h-40 bg-white shadow-lg rounded-2xl ">
        <CardHeader className="text-lg font-semibold">{title}</CardHeader>
    <CardContent className="flex  items-center justify-between">
        <CardDescription>
        <h2 className="text-2xl font-bold">{stat}</h2>
        </CardDescription>
        <div className="flex items-center bg-red-100 rounded-full p-2">
        <Icon className="text-2xl text-red-400" />
        </div>
    </CardContent>
    </Card>
    </>
  )
}

export default Widget