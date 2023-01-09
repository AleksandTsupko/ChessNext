import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'


const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  console.log(session?.user.id);
  

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth 
        providers={["github"]}
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }} 
        theme="dark" />
      ) : (
        <Account session={session}/>
      )}
    </div>
  )
}

export default Home