import React from "react";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure"
import blackLogo from "../../public/black-king.png"
import whiteLogo from "../../public/white-king.png"

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        if ((target.y === this.cell.y + 1 || target.y === this.cell.y - 1)
            && target.x === this.cell.x && (this.cell.board.getCell(target.x, target.y).isEmpty() || this.cell.isEnemy(target))) {
            return true
        }

        if ((target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && (target.y === this.cell.y || target.y === this.cell.y + 1 || target.y === this.cell.y - 1)
            && (this.cell.board.getCell(target.x, target.y).isEmpty() || this.cell.isEnemy(target))) {
            return true
        }

        return false
    }
}