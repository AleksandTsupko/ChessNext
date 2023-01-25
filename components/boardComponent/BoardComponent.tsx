import { useSession } from "@supabase/auth-helpers-react";
import React, { FC, MutableRefObject, useRef, useEffect, useState } from "react"
import { Board } from "../../models/Board"
import { Cell } from "../../models/Cell";
import { Player } from "../../models/Player";
import CellComponent from "../cellComponent/CellComponent";
import styles from "./Board.module.css"
import socketIOClient from "socket.io-client";
import { useRouter } from 'next/router'


interface BoardProps {
    board: Board;
    myColor: String;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer, myColor }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const socketRef: MutableRefObject<any> = useRef()
    const router = useRouter()

    useEffect(() => {
        socketRef.current = socketIOClient("http://localhost:3010", {
            query: { roomId: router.query.userId },
        });

        socketRef.current.on("newBoardEvent", (message: any) => {
            console.log('newBoardEventT', message);
            const cell: Cell = board.cells[message.y][message.x];
            console.log(cell);
            click(cell, message.clicker)
        });
    }, [router.query.userId])



    useEffect(() => {
        hightlightCells()
    }, [selectedCell])


    function testClick(cell: Cell) {
        socketRef.current.emit("newBoardEvent", {
            x: cell.x,
            y: cell.y,
            clicker: myColor
        });
    }

    function click(cell: Cell, myColor: string) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color && cell.figure?.color == myColor) {
                setSelectedCell(cell)
            }
        }
    }

    function hightlightCells() {
        board.hightlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3>Текущий игрок {currentPlayer?.color}, мой цвет {myColor}</h3>
            <div className={styles.board} >
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent click={testClick} cell={cell} key={cell.id} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default BoardComponent