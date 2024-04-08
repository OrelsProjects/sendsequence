export type UserRole = "user" | "admin";

export interface AppUser {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export default AppUser;
