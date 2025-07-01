import { useUserStore } from '@/store/userStore'
import { createFileRoute, redirect } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  beforeLoad: async () => {
       const {getUser} = useUserStore.getState()
        await getUser()
        console.log('Root route beforeLoad executed')
  },
  loader: async () => {
    const { isAuthenticated } = useUserStore.getState()
    console.log('Root route loader executed, isAuthenticated:', isAuthenticated)
    if (isAuthenticated) {
      throw redirect({
        to: '/home'
      })
    }
    else{
      throw redirect({
        to: '/sign-in'
      })
    }
  },
  onError: async () => {
    const {error} = useUserStore.getState()
    console.error('Error in root route:', error)
    throw redirect({
      to: '/sign-in'
    })
  },
  component: () => null // This route doesn't render anything directly
})


