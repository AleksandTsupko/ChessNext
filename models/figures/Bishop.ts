import React from "react";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure"
import blackLogo from "../../public/black-bishop.png"
import whiteLogo from "../../public/white-bishop.png"

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true
        }
        return false
    }
}