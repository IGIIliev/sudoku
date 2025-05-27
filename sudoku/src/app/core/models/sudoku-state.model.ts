import { SudokuGridModel } from "./sudoku-grid-model";
import * as complexityEnum from '../models/enums/complexityLevel.enum';

export interface SudokuStateModel extends SudokuGridModel {
    userName: string
    difficulty: complexityEnum.ComplexityEnum | null
}