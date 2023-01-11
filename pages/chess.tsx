import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/account/Account'
import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react'
import Home from '../components/home/Home'


const Chess = () => {

    const testhandler = () => {
        
    }

  return (
    <Layout>
      <h2 onClick={testhandler}>Chess page</h2>
    </Layout>
  )
}

export default Chess