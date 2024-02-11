import connectDb from "../../../../database/conn"
import User from "../../../../model/userModel"


export default async function handler(req, res) {

    connectDb().catch(error => res.json({ error: 'connection failed...!' }))

    if (req.method === 'POST') {
        const  username  = req.body.username1;

        if (!username.trim() || !/^[a-zA-Z0-9_]{3,30}$/i.test(username)) {
            return res.status(402).json({ error: 'Please enter a valid username.' });
        }
        try {
            const user = await User.findOne({ username });

            if (user) {
                return res.status(400).json({ error: 'Already existed' });
            }

            return res.status(200).json({ success: 'success' });
        } catch (error) {
            console.error(error);
            return res.status(505).json({ error: 'Server error' });
        }
    } else {
        return res.status(400).json({ error: 'This method is not allowed' });
    }
}