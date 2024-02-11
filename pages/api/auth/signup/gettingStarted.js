import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // const session = await getSession({ req });
  // const userId = session.user.id;
  const token = await getSession({req})
  console.log('getSession', token)
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
 
}
