export type ContactsTable = {
  Row: {
    id: number
    user_id: string | null
    name: string
    email: string
    subject: string
    message: string
    created_at: string
    updated_at: string | null
  }
  Insert: {
    id?: number
    user_id?: string | null
    name: string
    email: string
    subject: string
    message: string
    created_at?: string
    updated_at?: string | null
  }
  Update: {
    id?: number
    user_id?: string | null
    name?: string
    email?: string
    subject?: string
    message?: string
    created_at?: string
    updated_at?: string | null
  }
  Relationships: []
}