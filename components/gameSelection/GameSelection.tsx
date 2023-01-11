import { useSession } from '@supabase/auth-helpers-react'
import { FC, useRef, useState } from 'react'
import styles from "./GameSelection.module.css"
import socketIOClient from "socket.io-client";
import { useRouter } from 'next/router';

interface IGameSelectionProps {
    type: string
}

const GameSelection: FC<IGameSelectionProps> = ({ type }) => {
    const [addButtons, setAddButtons] = useState(false)
    const session = useSession()
    let backgroundUrl = ""
    let io: any
    const router = useRouter()

    switch (type) {
        case "chess":
            backgroundUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Opening_chess_position_from_black_side.jpg/274px-Opening_chess_position_from_black_side.jpg`
            break;

        case "checkers":
            backgroundUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/International_draughts.jpg/274px-International_draughts.jpg`
            break;

        case "bughouse chess":
            backgroundUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bughouse_game.jpg/220px-Bughouse_game.jpg`
            break;

        default:
            break;
    }

    const newGamingRoom = (type: string, id: string | undefined) => {
        if (id === undefined) {
            return console.log("SIGNIN");
        } else {
            io = socketIOClient("http://localhost:3010", {
                query: { roomId: id },
            });            
            router.push(type.split(' ').join(''))
        }

    }

    const joinGamingRoom = (type: string, id: string | undefined) => {
        if (id === undefined) {
            return console.log("SIGNIN");
        }
    }

    return (
        <div
            className={styles.container}
            onMouseEnter={() => setAddButtons(true)}
            onMouseLeave={() => setAddButtons(false)}
        >
            <img
                className={styles.image}
                src={backgroundUrl}
                alt=""
            />
            <div className={styles.content}>
                <span>{type.toUpperCase()}</span>
                {addButtons ? (
                    <>
                        <button
                            className={styles.button}
                            onClick={() => newGamingRoom(type, session?.user.id)}
                        >
                            New room
                        </button>
                        <button
                            className={styles.button}
                            onClick={() => joinGamingRoom(type, session?.user.id)}
                        >
                            Join room
                        </button>
                    </>
                ) : (
                    null
                )}
            </div>

        </div>
    )
}

export default GameSelection