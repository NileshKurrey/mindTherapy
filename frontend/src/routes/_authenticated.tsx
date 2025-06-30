// src/routes/_authenticated.jsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useUserStore } from '@/store/userStore'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
      if (!useUserStore.getState().isAuthenticated) {
          throw redirect({
              to: '/sign-in'
          })
      }
  },
})