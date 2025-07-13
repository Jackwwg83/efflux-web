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
        // 会话级解锁：保持解锁状态和API密钥，但不保存密码
        isUnlocked: state.isUnlocked,
        password: null, // 密码永不持久化
        apiKeys: state.apiKeys, // 保存已解密的API密钥
      }),
    }
  )
)