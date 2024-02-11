import connectDb from "../../database/conn";
import { createRouter, expressWrapper } from "next-connect";
import { getSession } from "next-auth/react";
import { upload } from "../../config/multerMiddleware";
import Upload from "../../model/uploads";

import fs from 'fs-extra';

export const config = {
    api: {
        bodyParser: false,
    },
}

const router = createRouter();

export default router.handler({
    onError: (err, req, res, next) => {
        console.error(err.stack);

        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found"); 
    },
})

router.use(upload("Post").single("myImage"))
    .post(async (req, res) => {

        try {
            const session = await getSession({ req });                       
                await connectDb();
                const currentUser = session?.user?.id;
                const UserName = session?.user?.username;
                if (!req.file) {
                    return res.status(400).json({ error: "No file uploaded" });
                }
                console.log('filedff4', req.file)
                const url = req.file;
                
                console.log('Fileurl', url)
               
                const post = new Upload({
                    
                    image: url,
                   
                });

                await post.save();


                res.status(200).json({ success: true, data: post });
            
        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    });