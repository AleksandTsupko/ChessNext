import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../../components/account/Account'
import Layout from '../../components/layout/Layout'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import Home from '../../components/home/Home'
import { useRouter } from 'next/router'
import socketIOClient from "socket.io-client";



const Chess: FC = () => {
  const router = useRouter()
  const session = useSession()
  const socketRef:  MutableRefObject<any> = useRef()
 
  console.log(router.query.userId);
  console.log(session?.user.id);

  

  useEffect(() => {
    socketRef.current = socketIOClient("http://localhost:3010", {
      query: { roomId: router.query.userId },
    });

    socketRef.current.on("newGameEvent", (message: any) => {
      console.log('newGameEvent', message);
    });
  }, [router.query.userId])

  const testhandler = () => {
    socketRef.current.emit("newGameEvent", {
      test: "testtt",
    });
  }


  return (
    <Layout>
      <h2 onClick={testhandler}>Chess page </h2>
    </Layout>
  )
}

export default Chess