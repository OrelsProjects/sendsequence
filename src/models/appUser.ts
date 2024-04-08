export type UserRole = "user" | "admin";

export interface AppUser {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  birthDate?: string;
}

export default AppUser;
