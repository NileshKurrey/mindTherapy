import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, redirect } from '@tanstack/react-router'
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
import { useRouter } from '@tanstack/react-router'
import { useUserStore } from '@/store/userStore'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LoaderCircle } from 'lucide-react'
import { useLoadingBar } from 'react-top-loading-bar'
export const Route = createFileRoute('/sign-up/')({
  beforeLoad: async () => {
    const ishover = true
    if(!useUserStore.getState().isAuthenticated) {
    await useUserStore.getState().getUser(ishover)
    }
  },
  loader: async () => {
    const { isAuthenticated, clearState } = useUserStore.getState()
    if (isAuthenticated) {
      clearState()
      throw redirect({
        to: '/home'
      })
    }else{
      clearState()
    }
  },
  preload:false,
  component: RouteComponent,
})

function RouteComponent() {
  const { registerUser, message, success, error, loader } = useUserStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { start, complete } = useLoadingBar({
    color: '#f87171', //bg-red-300 to bg-red-500
  })
  useEffect(() => {
    if (isSubmitting) {
      if (success && message) {
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        })
        useUserStore.getState().clearState()
        setIsSubmitting(false)
        router.invalidate()
        router.navigate({ to: '/sign-in', replace: true })
        complete()
      }
      if (error && !success) {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        })
        useUserStore.getState().clearState()
        setIsSubmitting(false)
      }
    }
  }, [success, message, error, router, isSubmitting])
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
async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    setIsSubmitting(true)
    await registerUser({ id: null, ...values })
    start()
  } catch (error) {
    setIsSubmitting(false)
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
    })
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

                <Button
                 type="submit" 
                 variant={"default"} 
                 className={`w-full cursor-pointer bg-red-500 hover:bg-red-600`}>
                 {loader ? <span>
                   <span className='sr-only'>Loading...</span>
                   <LoaderCircle className='animate-spin' />
                 </span> : 'Sign Up'}
                </Button>
               </form>
              </Form>
            </CardContent>
            <CardFooter>
              <p className='text-sm text-gray-500'>Already have an account?
                 <Link preloadDelay={5000} from='/sign-up' to="/sign-in" className='text-blue-500 hover:underline'>Sign In</Link></p>
            </CardFooter>
          </Card>
        </div>
        </>
}
