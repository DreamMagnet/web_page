export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user: User;
  session_token: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  full_name?: string;
  phone?: string;
  new_password?: string;
}
