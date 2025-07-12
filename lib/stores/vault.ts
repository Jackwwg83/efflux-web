'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APIKeys } from '@/types/ai'

interface VaultStore {
  isUnlocked: boolean
  password: string | null
  apiKeys: APIKeys | null
  
  unlock: (password: string, apiKeys: APIKeys) => void
  lock: () => void
  updateApiKeys: (apiKeys: APIKeys) => void
}

export const useVaultStore = create<VaultStore>()(
  persist(
    (set) => ({
      isUnlocked: false,
      password: null,
      apiKeys: null,
      
      unlock: (password: string, apiKeys: APIKeys) => {
        set({ isUnlocked: true, password, apiKeys })
      },
      
      lock: () => {
        set({ isUnlocked: false, password: null, apiKeys: null })
      },
      
      updateApiKeys: (apiKeys: APIKeys) => {
        set({ apiKeys })
      },
    }),
    {
      name: 'vault-store',
      partialize: (state) => ({ 
        // Don't persist password for security - user needs to re-enter
        isUnlocked: false,
        password: null,
        apiKeys: null,
      }),
    }
  )
)