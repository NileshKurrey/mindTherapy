import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
    
  beforeLoad: async () => {
    const isAuthenticated = true; // Replace with actual authentication check logic
    if (!isAuthenticated) {
      throw redirect({
        to: '/sign-in'
      })
    }
  },
  
})


