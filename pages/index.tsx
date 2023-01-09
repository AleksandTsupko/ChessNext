import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/account/Account'
import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react'


const Home = () => { 

  return (
      <Layout> 
        <h2>Home page</h2>
      </Layout>
  )
}

export default Home