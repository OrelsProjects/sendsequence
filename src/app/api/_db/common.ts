import { collection, doc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { userConvereter } from "./converters/userConverter";

export const collections = {
  users: "users",
};

export const usersCol = collection(db, collections.users);
export const getUserDoc = (userId: string) =>
  doc(usersCol, userId).withConverter(userConvereter);
