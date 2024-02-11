import Head from 'next/head'
import Image from 'next/image'
import SignUp from '../layouts/SignUp'
import { getSession,useSession} from "next-auth/react"

export default function Signup() {
  return (
    < >
      <Head>
        <title>Sign Up | Famstep</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>

      </Head>
      
      <SignUp/>
      
    </>
  )


}

export async function getServerSideProps({req}){
  const secret =process.env.JWT_SECRET
  // const session = await getToken({
  //   req,
  //   secret,
  
  // })
    const session = await getSession({req})
  console.log('session', session)
  if (session) {
    return{
      redirect: {
        destination: '/home',
        permanent:false,

      },
    }
  }
  
  return {
    props: {session}
}

}