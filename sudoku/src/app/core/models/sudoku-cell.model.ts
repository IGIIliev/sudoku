export interface SudokuCellModel {
    value: number;
    oldCoordinates: Coordinates;
    newCoordinates: Coordinates;
    enabled: boolean;
}

interface Coordinates {
    x: number;
    y: number;
}