import { useUserStore } from '@/store/userStore'
import { createFileRoute, redirect } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const {getUser} = useUserStore.getState()
    try {
        await getUser()
        throw redirect({
        to: '/home'
    })
    } catch (error) {
      console.error('Error fetching user:', error)
      throw redirect({
        to: '/home'
      })
    }
  
  },
})


