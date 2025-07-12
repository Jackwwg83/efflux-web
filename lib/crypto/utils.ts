// Crypto utilities for client-side encryption
// Uses Web Crypto API for secure encryption

export class CryptoUtils {
  // Derive a key from password
  static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder()
    const passwordKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    )

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
  }

  // Encrypt data
  static async encrypt(data: string, password: string): Promise<{
    encrypted: string
    salt: string
    iv: string
  }> {
    const encoder = new TextEncoder()
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const iv = crypto.getRandomValues(new Uint8Array(12))
    
    const key = await this.deriveKey(password, salt)
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encoder.encode(data)
    )

    return {
      encrypted: this.arrayBufferToBase64(encrypted),
      salt: this.arrayBufferToBase64(salt.buffer),
      iv: this.arrayBufferToBase64(iv.buffer),
    }
  }

  // Decrypt data
  static async decrypt(
    encryptedData: string,
    password: string,
    salt: string,
    iv: string
  ): Promise<string> {
    const key = await this.deriveKey(
      password,
      this.base64ToArrayBuffer(salt)
    )

    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: this.base64ToArrayBuffer(iv),
      },
      key,
      this.base64ToArrayBuffer(encryptedData)
    )

    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  }

  // Helper: ArrayBuffer to Base64
  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
  }

  // Helper: Base64 to ArrayBuffer
  static base64ToArrayBuffer(base64: string): Uint8Array {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes
  }

  // Generate a secure random password
  static generatePassword(length: number = 32): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-='
    const values = crypto.getRandomValues(new Uint8Array(length))
    let password = ''
    
    for (let i = 0; i < length; i++) {
      password += charset[values[i] % charset.length]
    }
    
    return password
  }

  // Hash a password (for verification, not storage)
  static async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return this.arrayBufferToBase64(hash)
  }
}