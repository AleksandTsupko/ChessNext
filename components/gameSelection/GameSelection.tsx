import { FC, useState } from 'react'
import styles from "./GameSelection.module.css"

interface IGameSelectionProps {
    type: string
}

const GameSelection: FC<IGameSelectionProps> = ({ type }) => {
    const [addButtons, setAddButtons] = useState(false)

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Opening_chess_position_from_black_side.jpg/274px-Opening_chess_position_from_black_side.jpg)` }}
            onMouseEnter={() => setAddButtons(true)}
            onMouseLeave={() => setAddButtons(false)}
        >
            <span>Chess</span>
            {addButtons ? (
                <>
                    <button
                        className={styles.button}
                        onClick={() => setAddButtons(false)}
                    >
                        New room
                    </button>
                    <button
                        className={styles.button}
                        onClick={() => setAddButtons(false)}
                    >
                        Join room
                    </button>
                </>
            ) : (
                null
            )}
        </div>
    )
}

export default GameSelection