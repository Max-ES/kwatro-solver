import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Shape, Color, Grid, BoolGrid, Row, Field } from '../../models';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  //enums
  shapes = Shape;
  colors = Color;
  colorValues = Object.keys(this.colors).filter(
    (k) => typeof this.colors[k as any] === 'number'
  ); // ["A", "B"]
  shapeValues = Object.keys(this.shapes).filter(
    (k) => typeof this.shapes[k as any] === 'number'
  ); // ["A", "B"]

  @Input() grid: Grid = [];
  @Input() invalid: boolean = false;
  @Input() highlight: BoolGrid = [];
  @Output() newField = new EventEmitter();


  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  getColor(field: Field) {
    const c = field === null ? null : Color[field[0]];
    return c === 'Yellow' ? '#d0a300' : c;
  }

  isHighlighted(i: number, j: number): boolean {
    return this.highlight[i]?.[j];
  }

  delete(i: number, j: number) {
    this.grid[i][j] = null;
    this.newField.emit()
  }

  

  menuOpened(i: number, j: number, menuTrigger: MatMenuTrigger) {
    if (this.grid[i][j] === null) {
      this.grid[i][j] = [1, 1, 1];
      this.newField.emit()
      menuTrigger.closeMenu();
    }
  }
}
