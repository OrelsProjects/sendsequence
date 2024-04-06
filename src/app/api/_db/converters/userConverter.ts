import { FirestoreDataConverter } from "firebase/firestore";
import User, { UserRole } from "@/models/user";

/**
 * Firestore data converter for User
 */
export const userConvereter: FirestoreDataConverter<User> = {
  toFirestore(chessEvent: User): any {
    return chessEvent;
  },
  fromFirestore(snapshot, options): User {
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
