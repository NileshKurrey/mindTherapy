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
import { useNavigate } from '@tanstack/react-router'
import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
export const Route = createFileRoute('/sign-up/')({
<<<<<<< HEAD
  beforeLoad: async () => {
    const ishover = true
    await useUserStore.getState().getUser(ishover)
  },
  loader: async () => {
    const { isAuthenticated, clearState } = useUserStore.getState()
    if (isAuthenticated) {
      clearState()
      
      throw redirect({
        to: '/home'
      })
    }
  },
  preload:false,
=======
>>>>>>> parent of 81da066 (fixed bugs and almost completed authentication)
  component: RouteComponent,
})

function RouteComponent() {
const {isAuthenticated, getUser,registerUser,message,success,error} = useUserStore()
  useEffect(() => {
    const fetchUser = async () => {
      if(!isAuthenticated) {
        try {
          await getUser()
          const { isAuthenticated: newAuthState } = useUserStore.getState()
          if (newAuthState) {
           navigate({ to: '/home' })
          }

        } catch (error) {
          // Handle error if getUser fails
          console.error(error)
        }
      }
    }
    fetchUser()
  }, [])
  const navigate = useNavigate()  
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
  try {
    const register = async()=>{ 
   await registerUser({ id: null, ...values })
 if(success){
         toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          }) 
      navigate({ to: '/home' })
    }else{
       toast.error(error,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
    })
    }      
   }
   register()
  console.log(error) 
  } catch (error) {
    console.log(error)
  toast.error(message,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
    })
    console.error(error)
  }
  
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

                <Button type="submit" variant={"default"} className={`w-full cursor-pointer bg-red-500 hover:bg-red-600:t`}>Sign Up</Button>
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
