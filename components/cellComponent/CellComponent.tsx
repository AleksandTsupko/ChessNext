import React, { FC } from "react"
import { Cell } from "../../models/Cell"
import styles from "./Cell.module.css"

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
    return (
        <div
            className={[styles.cell, cell.color === "white" ? styles.white : styles.black, selected ? styles.selected : ""].join(" ")}
            onClick={() => click(cell)}
            style={{ background: cell.available && cell.figure ? "green" : "" }}
        >
            {cell.available && !cell.figure && <div className={styles.available}></div>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure?.name} />}
        </div>
    )
}

export default CellComponent