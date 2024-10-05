//TO BE DELETED

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { db } from "@/db/drizzle";
// import { users } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { verifyPassword } from "@/lib/auth/utils";

// const pages = {
//   signIn: "/auth/signin",
//   signOut: "/auth/signout",
//   error: "/auth/error", // Error code passed in query string as ?error=
//   verifyRequest: "/auth/verify-request", // (used for check email message)
//   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
// };

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       authorization: {
//         url: "https://accounts.google.com/o/oauth2/v2/auth",
//         params: {
//           scope: "openid email profile",
//           access_type: "offline", // Required to get refresh tokens
//           prompt: "consent", // Forces the user to consent to providing refresh tokens
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "email@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           throw new Error("Email and password are required");
//         }

//         const userArr = await db
//           .select()
//           .from(users)
//           .where(eq(users.email, credentials?.email))
//           .limit(1);

//         if (!userArr.length || !userArr[0].password) {
//           throw new Error("No user found or no password set");
//         }

//         const user = userArr[0];

//         if (!user.password) {
//           throw new Error("No user password found");
//         }

//         const isValid = await verifyPassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           throw new Error("Invalid password");
//         }

//         return { ...user, id: user.id.toString() };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: <SessionStrategy>"jwt",
//     maxAge: 2 * 24 * 60 * 60, // 2 days
//   },
//   callbacks: {
//     async jwt({ token, account, user }: any) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.email = user?.email;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       // Attach the accessToken from the token to the session object
//       session.accessToken = token.accessToken as string;

//       // Optionally, pass other data like email if it's stored in the JWT token
//       session.user.email = token.email as string;

//       return session;
//     },
//     async redirect({ url, baseUrl }: any) {
//       console.log(
//         "redirected",
//         url.startsWith(baseUrl) ? url : baseUrl + "/dashboard"
//       );
//       // Default redirect to the dashboard after login
//       return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
//     },
//   },
//   pages,
// };
