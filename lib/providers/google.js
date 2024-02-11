import { findIsNewUserByEmail } from "../db";
import OAuth2Provider from "next-auth/providers/google";

const GoogleProvider = new OAuth2Provider({
  id: "google",
  name: "Google",
  scope: "email profile",
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  authorization: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://oauth2.googleapis.com/token",
  userinfo: "https://www.googleapis.com/oauth2/v3/userinfo",

  profile: async (profile) => {
    try {
      const { given_name, family_name, email_verified, picture  } = profile;
      const email = profile.email?.toLowerCase();
      const name = `${given_name} ${family_name}`.trim();
      const username = email?.split("@")[0];
      const image = picture;
      const emailVerified = email_verified;
      const role = profile.role ?? "User";
      
      // const currentStatus = "mhsscoe";
      // const skills = ['javaScript', 'Python', 'Java', 'C', 'C++', 'BhaiLang'];
      // const badges = "badges";
      // const college = "College";
      // const location = ''
      // const statusIcons = [];
      // const praise = 920;
      // const rank = 102;
      // const level = 5;
      // const points = 210;
      // const achievements = 15;
      // const userExists = await findIsNewUserByEmail(email);
      // let isNewUser = userExists;
     
      
      return {
        id: profile.sub,
        email,
        name,
        username,
        image,
        emailVerified,
        role,
        // currentStatus,
        // badges,
        // college,
        // location,
        // skill: skills,
        // statusIcons,
        // praise,
        // level,
        // rank,
        // points,
        // achievements,
        // isNewUser,
      };
      
    } catch (error) {
    throw error; // Rethrow the error
    }

  },
});

export default GoogleProvider;
