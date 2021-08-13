import { isNull } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { GridComponent } from './components/grid/grid.component';
import { Shape, Color, Grid, BoolGrid, Row, Field } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //enums
  shapes = Shape;
  colors = Color;
  // prettier-ignore
  grid: Grid = [
    [null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,],
    [null,null,null,[1,1,1],[2,2,2],[3,3,3],[4,4,4],null,],
    [null,null,null,null,[3,2,1],[3,1,2],null,null,],
    [null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,],
    [null,null,null,null,null,null,null,null,],
  ];
  bestGrid: Grid = []
  bestScore: number = 0;
  bestFields: BoolGrid = [];

  hand: Row = [
    [1, 2, 4],
    [4, 2, 3],
    [this.colors.Yellow, this.shapes.Triangle, 4],
    [this.colors.Yellow, this.shapes.Cross, 1],
  ];

  color = 'green';

  ngOnInit() {
    console.log(this.isValid(this.grid));
    this.grid = this.addPaddingToGrid(this.grid, 4);
    [this.bestGrid, this.bestFields, this.bestScore] = this.getBestGrid(this.grid, this.hand)
    console.log(this.bestGrid);
    console.log(this.bestFields);
    const score = this.getScore(this.bestGrid, this.bestFields);
    console.log(score)
  }

  isEmpty(field: Field) {
    return field === null;
  }

  transpose(a: any) {
    // Calculate the width and height of the Array
    var w = a.length;
    var h = a[0].length;
    // In case it is a zero matrix, no transpose routine needed.
    if (h === 0 || w === 0) {
      return [];
    }
    let t: Array<any> = [];
    // Loop through every item in the outer array (height)
    for (let i = 0; i < h; i++) {
      // Insert a new row (array)
      t[i] = [];
      // Loop through every item per item in outer array (width)
      for (let j = 0; j < w; j++) {
        // Save transposed data.
        t[i][j] = a[j][i];
      }
    }
    return t;
  }

  rotate(matrix: Array<Array<any>>) {
    return matrix[0].map((val, index) =>
      matrix.map((row) => row[index]).reverse()
    );
  }

  isValidRow(row: Row) {
    let currentBatch: Array<any> = [[], [], []];
    for (let i = 0; i < row.length; i++) {
      if (row[i] === null) {
        currentBatch = [[], [], []];
        continue;
      }
      currentBatch[0].push(row[i]![0]);
      currentBatch[1].push(row[i]![1]);
      currentBatch[2].push(row[i]![2]);
      if (currentBatch.length > 4) return false;
      if (currentBatch.length === 1) continue;
      for (let j = 0; j < 3; j++) {
        const allEqual = currentBatch[j].every(
          (val: number, i: number, arr: number[]) => val === arr[0]
        );
        if (allEqual) continue;
        const allUnique =
          new Set(currentBatch[j]).size === currentBatch[j].length;
        if (allUnique) continue;
        return false;
      }
    }
    return true;
  }

  isNullRow(row: Row) {
    return row[0] === null && !row.some((v) => v !== row[0]);
  }

  addPaddingToGrid(grid: Grid, paddingSize: number) {
    for (let i = 0; i < 4; i++) {
      let nullRowCount = 0;
      const rowLength = grid[0].length;
      for (const row of grid) {
        if (this.isNullRow(row)) {
          nullRowCount++;
        } else {
          const paddingRowsToAdd = Math.max(0, paddingSize - nullRowCount);
          grid = new Array(paddingRowsToAdd)
            .fill(null)
            .map(() => new Array(rowLength).fill(null))
            .concat(grid);
          break;
        }
      }
      grid = this.rotate(grid);
    }
    return grid;
  }

  getFreeAdjacentFields(grid: Array<Array<any>>) {
    let freeMatrix = new Array(grid.length)
      .fill(null)
      .map(() => new Array(grid[0].length).fill(false));
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        freeMatrix[i][j] =
          grid[i][j] == null &&
          (grid[i - 1]?.[j] != null ||
            grid[i + 1]?.[j] != null ||
            grid[i]?.[j - 1] != null ||
            grid[i]?.[j + 1] != null);
      }
    }
    return freeMatrix;
  }

  getRowScoreAndFactor(
    row: Row,
    rowChangeArray: Array<boolean>,
    rowLength:number,
    score: number,
    factor: number
  ) {
    let currentNumberBatch = [];
    let isChangedBatch = false;
    for (let j = 0; j <= rowLength; j++) {
      if (row[j] == null) {
        if (isChangedBatch && currentNumberBatch.length > 1) {
          //get score of batch
          var count = 0;
          for (let i = currentNumberBatch.length; i--; ) {
            count += currentNumberBatch[i];
          }
          score += count;
          // get factor
          if (currentNumberBatch.length === 4) {
            factor *= 2;
          }
        }
        currentNumberBatch = [];
        isChangedBatch = false;
      } else {
        currentNumberBatch.push(row[j]![2]);
        if (rowChangeArray[j]) isChangedBatch = true;
      }
    }
    return [score, factor]
  }

  getScore(
    grid: Grid,
    filledFields: BoolGrid,
    gridHeight = grid.length,
    gridLength = grid[0].length
  ) {
    let score = 0;
    let factor = 1;
    for (let i = 0; i < gridHeight; i++) {
      [score, factor] = this.getRowScoreAndFactor(grid[i], filledFields[i], gridLength, score, factor);
    }
    grid = this.rotate(grid);
    filledFields = this.rotate (filledFields)
    for (let i = 0; i < gridHeight; i++) {
      [score, factor] = this.getRowScoreAndFactor(grid[i], filledFields[i], gridLength, score, factor);
    }
    if (this.countFilledFields(filledFields) === 4) {
      factor *= 2;
    }

    return score * factor;
  }

  countFilledFields(fields: BoolGrid): number {
    let count = 0
    for(var i=0;i < fields.length;i++){
      for(var j=0;j<fields[i].length;j++){
        if (fields[i][j] === true) {
          count++;
        }
      }
    }
    return count;
  }

  getBestGrid(
    grid: Grid,
    hand: Row,
    gridHeight: number = grid.length,
    gridLength: number = grid[0].length,
    freeAdjacentFields = this.getFreeAdjacentFields(grid),
    filledFields = new Array(gridHeight)
      .fill(null)
      .map(() => new Array(gridLength).fill(false))
  ): [Grid, BoolGrid, number] {
    let highestScore = -1;
    let bestGrid = grid;
    let bestFields: BoolGrid = [];
    //grid = this.addPaddingToGrid(grid, hand.length);
    for (let c = 0; c < hand.length; c++) {
      for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridLength; j++) {
          if (freeAdjacentFields[i][j]) {
            let tempGrid = grid.map((inner) => inner.slice());
            tempGrid[i][j] = hand[c];
            //TODO: only check changed row and column
            let optimalGrid: Grid;
            let score: number;
            if (this.isValid(tempGrid)) {
              let newFilledFields = filledFields.map((inner) =>
                inner.slice()
              );
              newFilledFields[i][j] = true;

              if (hand.length === 1) {
                //count points
                score = this.getScore(
                  tempGrid,
                  newFilledFields,
                  gridHeight,
                  gridLength
                );
                optimalGrid = tempGrid;
              } else {
                let newHand = [...hand];
                newHand.splice(c, 1);
                const newFreeAdjacentFields = freeAdjacentFields.map((inner) =>
                  inner.slice()
                );

                newFreeAdjacentFields[i][j] = false;
                if (i >= 1 && tempGrid[i - 1][j] === null)
                  newFreeAdjacentFields[i - 1][j] = true;
                if (i < gridHeight - 1 && tempGrid[i + 1][j] === null)
                  newFreeAdjacentFields[i + 1][j] = true;
                if (j >= 1 && tempGrid[i][j - 1] === null)
                  newFreeAdjacentFields[i][j - 1] = true;
                if (j < gridLength - 1 && tempGrid[i][j + 1] === null)
                  newFreeAdjacentFields[i][j + 1] = true;
                [optimalGrid, newFilledFields, score] = this.getBestGrid(
                  tempGrid,
                  newHand,
                  gridHeight,
                  gridLength,
                  newFreeAdjacentFields,
                  newFilledFields
                );
              }
              if (score > highestScore) {
                highestScore = score;
                bestGrid = optimalGrid;
                bestFields = newFilledFields
              }
            }
          }
        }
      }
    }
    return [bestGrid, bestFields, highestScore];
  }

  isValid(grid: Grid) {
    //check horizontal
    for (const row of grid) {
      if (!this.isValidRow(row)) {
        return false;
      }
    }
    const transposedGrid = this.transpose(grid);
    for (const row of transposedGrid) {
      if (!this.isValidRow(row)) {
        return false;
      }
    }
    return true;
  }
}
