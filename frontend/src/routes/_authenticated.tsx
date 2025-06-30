import { createFileRoute, redirect } from '@tanstack/react-router'
import { useUserStore} from '@/store/userStore'
export const Route = createFileRoute('/_authenticated')({
    
  beforeLoad: async () => {
    const {isAuthenticated}= useUserStore.getState()

    if (!isAuthenticated) {
      throw redirect({
        to: '/sign-in'
      })
    }
  },
  
})


