import connectDb from "../../../../database/conn"
import User from "../../../../model/userModel"
import {hash} from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, fullname, password } = req.body.values;
    const username = req.body.username1

    if (!email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) && !/^\d{10}$/i.test(email)) {
      return res.status(402).json({ error: 'Please enter your a valid phone or email' });
    }

    else if (!password.trim() || password.length < 6) {
      return res.status(402).json({ error: 'Password must be 6 characters or more' });
    }
    else if (!fullname.trim() || !/^[a-zA-Z'-]+\s[a-zA-Z'-]+$/i.test(fullname)) {
      return res.status(402).json({ error: 'Please enter your a valid first and last name' });
      
    }
    
    else if (!username.trim() || !/^[a-zA-Z0-9_]{3,30}$/i.test(username)) {
      return res.status(402).json({ error: 'Please enter a valid username.' });
      
    }
    try {
      await connectDb()
      const user = await User.findOne().or([{ email }, { username }]);

      if (user) {
        return res.status(400).json({ error: 'This email or phone is already registered.' });
      }
      const newUser = new User({ email, name:fullname, username, password: await hash(password,12) , role:'User'});
      await newUser.save();

      return res.status(200).json({  success: 'success'}); 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(400).json({ error: 'This method is not allowed' });
  }
}