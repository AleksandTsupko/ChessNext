import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../../components/account/Account'
import Layout from '../../components/layout/Layout'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import Home from '../../components/home/Home'
import { useRouter } from 'next/router'
import socketIOClient from "socket.io-client";
import styles from "./chess.module.css"
import BoardComponent from '../../components/boardComponent/BoardComponent';
import { Board } from '../../models/Board';
import { Player } from '../../models/Player';
import { Colors } from "../../models/Colors";
import LostFigures from '../../components/lostFigures/LostFigures';
import Timer from '../../components/timer/Timer';
import { Session } from 'inspector'



const Chess: FC = () => {
  const router = useRouter()
  const socketRef: MutableRefObject<any> = useRef()
  const session = useSession()

  useEffect(() => {
    socketRef.current = socketIOClient("http://localhost:3010", {
      query: { roomId: router.query.userId },
    });

  }, [router.query.userId])

  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [myColor, setMyColor] = useState<String>("")

  useEffect(() => {
    restart()
    console.log("ID",session?.user.id);
    console.log("ROUTER",router.query.userId);
    
    if (router.query.userId === session?.user.id ) {
      setMyColor("white")
    } else {
      setMyColor("black")
    }
  }, [router.query.userId])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <Layout>
      <h2 >Chess page </h2>
      <div className="chess">
        < Timer currentPlayer={currentPlayer} restart={restart} />
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          myColor={myColor}
          swapPlayer={swapPlayer}
        />
        <div>
          <LostFigures
            title={"Черные фигуры"}
            figures={board.lostBlackFigures}
          />
          <LostFigures
            title={"Белые фигуры"}
            figures={board.lostWhiteFigures}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Chess