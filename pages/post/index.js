import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
function Creatre() {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [desc, setDesc] = useState("");
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

 
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      console.log("formData", selectedFile);
      const { data } = await axios.post("/api/uploadphoto", formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  function handleLike() {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-20 space-y-6">
      <form onSubmit={handleUpload} >
        <label>
          <div className="img_input">
            <input
              type="file"
              hidden
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
          </div>
          <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
            {selectedImage ? (
              <Image src={selectedImage} alt="" height={300} width={300} />
            ) : (
              <span>Select Image</span>
            )}
          </div>
        </label>
        <button
          // onClick={handleUpload}
          type="submit"
          disabled={uploading}
          style={{ opacity: uploading ? ".5" : "1" }}
          className="bg-red-600 p-3 w-32 text-center rounded text-white"
        >
          {uploading ? "Uploading.." : "Upload"}
        </button>
        {/* likes */}
        
      </form>

    </div>
  );
}

export default Creatre;

// import React from 'react'
// import { useState } from "react";
// import axios from 'axios'
// import style from '../styles/CreatePosts.module.scss'

// function Creatre() {
//   const [image, setImage] = useState(null);
//   const [imageInput, setImageInput] = useState(null);
//   const [title, setTitle] = useState('');
//   const [desc, setDesc] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   // const handleImage = (e) => {

//   //   const file = e.target.files[0];
//   //   setImageInput(file);
//   //   const fileReader = new FileReader();
//   //   fileReader.onload = function (e) {
//   //     console.log(e.target.result);
//   //     setImage(e.target.result);
//   //   };
//   //   fileReader.readAsDataURL(file);
//   // };

//   const handleFormData = async (e) => {
//     e.preventDefault();

//     let formData = new FormData();
//     formData.append("Image", setImage);
//     formData.append("title", title);
//     formData.append("desc", desc);
// console.log("formData",formData)

//     try {
//       const res = await axios.post('http://localhost:3000/api/auth/createp', {formData});
//       console.log("bcvbcv", res)
//       return res.data;

//     } catch (error) {
//       console.log("error", error)

//     }

//   }

// return (
//   <div className={`container ${style["post-create"]}`}>
//     <div className="row">
//       <div className="col">
//         <h2>Create Post</h2>
//       </div>
//     </div>

//     <div className="row">
//       <div className="col">
//         {
//           errorMessage && (
//             <p style={{ textTransform: 'capitalize', color: 'red' }}>{errorMessage}</p>
//           )
//         }
//       </div>
//     </div>

//     <form onSubmit={handleFormData}>
//       <div className="row">
//         <div className="col">
//           <input
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             placeholder="Enter Title"
//           />
//         </div>
//       </div>

//       <div className="row">
//         <div className="col">
//           <textarea
//             type="text"
//             className="form-control"
//             value={desc}
//             onChange={e => setDesc(e.target.value)}
//             placeholder="Enter Description"
//           />
//         </div>
//       </div>

//       <div className="row">
//         <div className="col">
//           <input
//             type="file"
//             className="form-control"
//             onChange={e=>  setImage(e.target.files[0])}
//           />
//         </div>
//         <div className="col">
//           {image && <img src={image} style={{ width: "100px" }} />}
//         </div>
//       </div>

//       <div className="row">
//         <div className="col">
//           <button>Submit</button>
//         </div>
//       </div>
//     </form>
//   </div>
// );
//     // <div>
//     //   <form onSubmit={handleFormData}>

//     //     <input type="file" id="myFile" name="filename"
//     //         onChange={handleImage}
//     //     />
//     //     <input type="text" value={desc}
//     //           onChange={e => setDesc(e.target.value)}/>
//     //       <div className="col">
//     //         <button>Submit</button>
//     //       </div>

//     //   </form>
//     // </div>
// //   )
// }

// export default Creatre
