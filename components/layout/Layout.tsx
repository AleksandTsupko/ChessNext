import { useState, useEffect } from "react";
import { useUser, useSupabaseClient, useSession, Session } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { Children, FC } from 'react'
import { Database } from '../utils/database.types'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const session = useSession()
    const supabase = useSupabaseClient<Database>()

    return (
        <>
            {!session ? (
                <div className="header">
                    <div className="header__title">
                        <Link href={"/"}>
                            <span className="header__title-span_white">BOARD</span>
                            <span className="header__title-span_blue">GAMES</span>
                        </Link>
                    </div>
                    <div className="header__nav">
                        <div className="nav__item"><Link href={"/rules"}>Rules</Link></div>
                        <div className="nav__item"><Link href={"/about"}>About</Link></div>
                        <div className="nav__item"><Link href={"/signin"}>Sign in</Link></div>
                    </div>
                </div>
            ) : (
                <div className="header">
                    <div className="header__title">
                        <Link href={"/"}>
                            <span className="header__title-span_white">BOARD</span>
                            <span className="header__title-span_blue">GAMES</span>
                        </Link>
                    </div>
                    <div className="header__nav">
                        <div className="nav__item"><Link href={"/rules"}>Rules</Link></div>
                        <div className="nav__item"><Link href={"/about"}>About</Link></div>
                        <div className="nav__item" onClick={() => supabase.auth.signOut()}>Sign out</div>
                    </div>
                </div>
            )}
            {children}
        </>
    )
}

export default Layout