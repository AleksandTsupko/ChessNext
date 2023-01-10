import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/account/Account'
import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react'
import Home from '../components/home/Home'


const Index = () => {

  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default Index