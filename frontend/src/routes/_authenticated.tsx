// src/routes/_authenticated.jsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useUserStore } from '@/store/userStore'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    await useUserStore.getState().getUser()
  },
  loader: async () => {
    const { isAuthenticated } = useUserStore.getState()
    if (!isAuthenticated) {
      throw redirect({
        to: '/sign-in'
      })
    }
  },
  errorComponent: () => { 
    return <div className='flex items-center justify-center h-screen text-2xl font-bold text-red-500'>Error: You are not authenticated</div>
  }
})