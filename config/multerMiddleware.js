import { userName } from "../utils/common";
import multer from 'multer';
import path from 'path'
import fs from 'fs-extra';
import { getSession } from "next-auth/react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';




const s3 = new S3Client({
	region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credential:{
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    

  }
});
console.log('in the mukter');

export const upload =(context)=> multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      acl: 'public-read', // Set ACL for uploaded files
      key: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, '/upload/post/' + file.fieldname + '-' + uniqueSuffix + extension);
    }
  }),
 
});



