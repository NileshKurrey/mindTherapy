import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import {  useForm } from 'react-hook-form'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import logo from '@/logo.png'
import { AvatarImage } from '@radix-ui/react-avatar'
export const Route = createFileRoute('/sign-up/')({
  component: RouteComponent,
})

function RouteComponent() {
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),

  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
  }})
function onSubmit(values: z.infer<typeof formSchema>) {
   
    console.log(values)
  }
return <>
        <div className="flex justify-center items-center h-screen">
          <Card className='flex flex-col w-96'>
            <CardHeader className='flex flex-col items-center space-y-2'>
              <Avatar className="rounded-lg w-20 h-20">
              <AvatarImage src={logo} alt="Logo"  />
              <AvatarFallback className='w-16 h-16'>Logo</AvatarFallback>
              </Avatar>
              <CardTitle className='text-2xl'>Welcome to NeuroAI</CardTitle>
              <CardDescription>
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your name' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your email' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your password' {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" variant={"default"} className='w-full cursor-pointer bg-red-500 hover:bg-red-600'>Sign Up</Button>
               </form>
              </Form>
            </CardContent>
            <CardFooter>
              <p className='text-sm text-gray-500'>Already have an account? <Link to="/sign-in" className='text-blue-500 hover:underline'>Sign In</Link></p>
            </CardFooter>
          </Card>
        </div>
        </>
}
