// Supabase에서 자동 생성한 DB 타입입니다.
// 테이블을 바꾸면 다시 생성하세요:
//   npx supabase gen types typescript --project-id jkxgmdcxippogqrprwnv > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          created_at: string
          id: number
          parent_id: number | null
          post_id: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: never
          parent_id?: number | null
          post_id: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: never
          parent_id?: number | null
          post_id?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: number
          mime_type: string | null
          original_name: string | null
          post_id: number | null
          size: number | null
          storage_key: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: never
          mime_type?: string | null
          original_name?: string | null
          post_id?: number | null
          size?: number | null
          storage_key: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: never
          mime_type?: string | null
          original_name?: string | null
          post_id?: number | null
          size?: number | null
          storage_key?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_roles: {
        Row: {
          can_admin: boolean
          can_read: boolean
          can_write: boolean
          created_at: string
          created_by: string | null
          menu_id: number
          role_id: number
          updated_at: string
        }
        Insert: {
          can_admin?: boolean
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          created_by?: string | null
          menu_id: number
          role_id: number
          updated_at?: string
        }
        Update: {
          can_admin?: boolean
          can_read?: boolean
          can_write?: boolean
          created_at?: string
          created_by?: string | null
          menu_id?: number
          role_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_roles_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          is_visible: boolean
          menu_type: string | null
          name: string
          parent_id: number | null
          slug: string | null
          sort_order: number
          updated_at: string
          url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: never
          is_visible?: boolean
          menu_type?: string | null
          name: string
          parent_id?: number | null
          slug?: string | null
          sort_order?: number
          updated_at?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: never
          is_visible?: boolean
          menu_type?: string | null
          name?: string
          parent_id?: number | null
          slug?: string | null
          sort_order?: number
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menus_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      post_meta: {
        Row: {
          id: number
          meta_key: string
          meta_value: string | null
          post_id: number
        }
        Insert: {
          id?: never
          meta_key: string
          meta_value?: string | null
          post_id: number
        }
        Update: {
          id?: never
          meta_key?: string
          meta_value?: string | null
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_meta_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string
          id: number
          is_notice: boolean
          like_count: number
          menu_id: number
          post_type: string | null
          title: string
          updated_at: string
          user_id: string | null
          view_count: number
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: never
          is_notice?: boolean
          like_count?: number
          menu_id: number
          post_type?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: never
          is_notice?: boolean
          like_count?: number
          menu_id?: number
          post_type?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          name: string | null
          role_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
          role_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          role_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          id: number
          is_editable: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: never
          is_editable?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: never
          is_editable?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: number
          setting_key: string
          setting_type: string | null
          setting_value: string | null
        }
        Insert: {
          id?: never
          setting_key: string
          setting_type?: string | null
          setting_value?: string | null
        }
        Update: {
          id?: never
          setting_key?: string
          setting_type?: string | null
          setting_value?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_post_view: { Args: { p_post_id: number }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database["public"]

/** 테이블 Row 타입 꺼내기: Tables<"posts"> */
export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"]

/** Insert 타입: TablesInsert<"posts"> */
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"]

/** Update 타입: TablesUpdate<"posts"> */
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"]
