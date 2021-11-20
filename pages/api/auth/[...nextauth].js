// pages / api / auth / [...nextauth].js;
import NextAuth from "next-auth";
//import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { db } from "../../../firebase";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  //anytime user log in in the app it will store user details inside firestore db
  adapter: FirebaseAdapter(db),
});
