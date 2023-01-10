import { useState, useEffect } from "react";
import { useUser, useSupabaseClient, useSession, Session } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { FC } from 'react'
import { Database } from '../utils/database.types'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import styles from "./Layout.module.css"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    const session = useSession()
    const supabase = useSupabaseClient<Database>()

    return (
        <>
            {!session ? (
                <div className={styles.header}>
                    <div className={styles.header__title}>
                        <Link href={"/"}>
                            <span className={styles.span_white}>BOARD</span>
                            <span className={styles.span_blue}>GAMES</span>
                        </Link>
                    </div>
                    <div className={styles.header__nav}>
                        <div className={styles.nav__item}><Link href={"/rules"}>Rules</Link></div>
                        <div className={styles.nav__item}><Link href={"/about"}>About</Link></div>
                        <div className={styles.nav__item}><Link href={"/signin"}>Sign in</Link></div>
                    </div>
                </div>
            ) : (
                <div className={styles.header}>
                    <div className={styles.header__title}>
                        <Link href={"/"}>
                            <span className={styles.span_white}>BOARD</span>
                            <span className={styles.span_blue}>GAMES</span>
                        </Link>
                    </div>
                    <div className={styles.header__nav}>
                        <div className={styles.nav__item}><Link href={"/rules"}>Rules</Link></div>
                        <div className={styles.nav__item}><Link href={"/about"}>About</Link></div>
                        <div className={styles.nav__item} onClick={() => supabase.auth.signOut()}><span>Sign out</span></div>
                    </div>
                </div>
            )}
            <div className={styles.body}>
                {children}
            </div>

        </>
    )
}

export default Layout