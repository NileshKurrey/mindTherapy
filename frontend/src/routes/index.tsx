import { useUserStore } from '@/store/userStore'
import { createFileRoute, redirect } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  beforeLoad: async ()=>{
    await useUserStore.getState().getUser()
  },
  loader: async () => {
    const { isAuthenticated, clearState } = useUserStore.getState()
    if (isAuthenticated) {
      clearState()
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
  errorComponent: () => { 
    return <div className='flex items-center justify-center h-screen text-2xl font-bold text-red-500'>Error: You are not authenticated</div>
  }
})


