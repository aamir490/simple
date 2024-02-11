import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import connectDb from "../../database/conn";
import Upload from "../../model/uploads";
function index({imageUrl}) {
// const callMe = async () => {
//     const response = await axios.get('/api/home')
//     setData(response)
    
     


  return (
    <div>
      Welcome home

      {/* <button onClick={callMe}> click me </button> */}


     
        
{  imageUrl && imageUrl.map(val =>{
console.log('val', val)
  return(

  <Image unoptimized src={`/uploads/post/${val.image}`} height={300} width={300}/>
  )
})   
}      

       

       

    </div>
  )
}
export async function getServerSideProps() {
  // Fetch image URL from your database
  await connectDb()
  const imageUrl = await Upload.find({})

  return {
    props: {
     
      imageUrl: JSON.parse(JSON.stringify(imageUrl)),
    },
  };
}
export default index
