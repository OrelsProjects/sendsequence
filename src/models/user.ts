export type UserRole = "user" | "admin";

export interface AppUser {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  birthDate?: string;
  gender?: string;
  token: string;
  role: UserRole;
}

export default AppUser;
