import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute, redirect} from '@tanstack/react-router'
import {  useForm } from 'react-hook-form'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
<<<<<<< HEAD

import {LoaderCircle } from 'lucide-react'
import { Link,useRouter } from '@tanstack/react-router'
=======
import { Link } from '@tanstack/react-router'
>>>>>>> parent of 81da066 (fixed bugs and almost completed authentication)
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import logo from '@/logo.png'
import { AvatarImage } from '@radix-ui/react-avatar'
import {useUserStore} from '@/store/userStore'
<<<<<<< HEAD
import {useLoadingBar} from 'react-top-loading-bar'
=======
import { useNavigate } from '@tanstack/react-router'
// import { useEffect } from 'react'
>>>>>>> parent of 81da066 (fixed bugs and almost completed authentication)
import { toast } from 'react-toastify'

export const Route = createFileRoute('/sign-in/')({
  beforeLoad: async () => {
    const {isAuthenticated}= useUserStore.getState()
    // Redirect to home if already authenticated
    if (isAuthenticated) {
      throw redirect({
        to: '/home'
      })
    }
  },
  
  component: RouteComponent,
})

function RouteComponent() {
<<<<<<< HEAD
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {start,complete} = useLoadingBar({
    color: '#f87171', //bg-red-300 to bg-red-500
  })
  const {message, success, error,loader, clearState } = useUserStore()
=======
  const {message, success, error, loading, clearState } = useUserStore()
>>>>>>> parent of 81da066 (fixed bugs and almost completed authentication)
  const { loginUser } = useUserStore()
  const navigate = useNavigate()

<<<<<<< HEAD
useEffect(() => {
    const handleEffect = async () => {
      if (isSubmitting) {
        if (success && message) {
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          })
          clearState()
          setIsSubmitting(false)
          await router.invalidate()
          router.navigate({ to: '/home', replace: true })
          complete()
        }

        if (error && !success) {
          toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          })
          clearState()
          setIsSubmitting(false)
        }
      }
    }
    handleEffect()
  }, [success, error, message, isSubmitting])
=======
//  useEffect(() => { 
//     // Redirect to home if already authenticated
//     console.log('isAuthenticated:', isAuthenticated)
//     if (isAuthenticated) {
//       navigate({ to: '/home' })
//     }
//   }, [])
//  useEffect(() => { 
//     // Redirect to home if already authenticated
//     console.log('isAuthenticated:', isAuthenticated)
//     if (isAuthenticated) {
//       navigate({ to: '/home' })
//     }
//   }, [])
  // Show success/error messages
>>>>>>> parent of 81da066 (fixed bugs and almost completed authentication)


  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
<<<<<<< HEAD
      start()
      setIsSubmitting(true)
=======
>>>>>>> parent of 81da066 (fixed bugs and almost completed authentication)
      await loginUser(values.email, values.password)
      // The useEffect will handle success/error messages and navigation
       if (success && message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    }
    
    if (error && !success) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    }
    clearState()
    navigate({ to: '/home' })
  } catch (error) {
    console.error('Login submission error:', error)
  }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className='flex flex-col w-96'>
        <CardHeader className='flex flex-col items-center space-y-2'>
          <Avatar className="rounded-lg w-20 h-20">
            <AvatarImage src={logo} alt="Logo" />
            <AvatarFallback className='w-16 h-16'>Logo</AvatarFallback>
          </Avatar>
          <CardTitle className='text-2xl'>Welcome Back</CardTitle>
          <CardDescription>
            Please enter your credentials to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                variant={"default"} 
                className='w-full cursor-pointer bg-red-500 hover:bg-red-600'
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-gray-500'>
            Don't have an account? 
            <Link to="/sign-up" className="text-blue-500 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}