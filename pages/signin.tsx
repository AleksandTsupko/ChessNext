import Layout from '../components/layout/Layout'
import { useUser, useSupabaseClient, useSession, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'



export default function Signin() {
    const supabase = useSupabaseClient<Database>()

    return (
        <Layout>
            <Auth
                // providers={["github"]}
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark" />
        </Layout>
    )
}