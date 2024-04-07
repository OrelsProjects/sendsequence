import { FirestoreDataConverter } from "firebase/firestore";
import AppUser, { UserRole } from "@/models/user";

/**
 * Firestore data converter for User
 */
export const userConvereter: FirestoreDataConverter<AppUser> = {
  toFirestore(chessEvent: AppUser): any {
    return chessEvent;
  },
  fromFirestore(snapshot, options): AppUser {
    const data = snapshot.data(options);
    return {
      userId: snapshot.id as string,
      displayName: data.displayName as string,
      email: data.email as string,
      photoURL: data.photoURL as string,
      birthDate: data.birthDate as string,
      role: data.role as UserRole,
      token: data.token as string,
    };
  },
};
