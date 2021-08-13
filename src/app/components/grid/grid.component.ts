import { Component, Input, OnInit } from '@angular/core';
import { Shape, Color, Grid, BoolGrid, Row, Field } from '../../models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  //enums
  shapes = Shape;
  colors = Color;

  @Input() grid: Grid = [];
  @Input() highlight: BoolGrid = [];

  constructor() {}

  ngOnInit(): void {}

  getColor(field: Field) {
    const c = field === null ? null : Color[field[0]];
    return c === 'Yellow' ? '#d0a300' : c;
  }

  isHighlighted(i: number, j: number): boolean {
    return this.highlight[i]?.[j];
  }
}
