import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Shape, Color, Grid, BoolGrid, Row, Field } from './models';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });
  
  
  describe('AppComponent', () => {
    let component: AppComponent;
  
      beforeEach(() => {
      component = new AppComponent();
    });

    it('empty grid is valid', () => {  
      const grid: Grid = [
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
      ];
      expect(component.isValid(grid)).toBeTrue();
    });

    it('horizontal grid is valid', () => {  
      const grid: Grid = [
        [null,null,null,null,null,null,null,null,],
        [[1,1,1],[1,2,1],[1,3,1],[1,4,1],null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,[2,1,2],[2,1,4],[2,1,3],[2,1,1],null,],
      ];
      expect(component.isValid(grid)).toBeTrue();
    });

    it('horizontal grid invalid', () => {  
      const grid: Grid = [
        [null,null,null,null,null,null,null,null,],
        [[1,1,1],[1,2,1],[1,3,1],[1,4,1],null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,[2,2,2],[2,1,4],[2,1,3],[2,1,1],null,],
      ];
      expect(component.isValid(grid)).toBeFalse();
    });

    it('vertical grid is valid', () => {  
      const grid: Grid = [
        [null,null,null,null,null,null,null,null,],
        [[1,1,2],null,null,null,null,null,null,null,],
        [[1,1,4],null,null,null,null,null,null,null,],
        [[1,1,1],null,null,null,null,null,null,null,],
        [[1,1,3],null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
      ];
      expect(component.isValid(grid)).toBeTrue();
    });

    it('vertical grid invalid', () => {  
      const grid: Grid = [
        [null,null,null,null,null,null,null,null,],
        [[1,1,4],null,null,null,null,null,null,null,],
        [[1,1,4],null,null,null,null,null,null,null,],
        [[1,1,1],null,null,null,null,null,null,null,],
        [[1,1,3],null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
      ];
      expect(component.isValid(grid)).toBeFalse();
    });

    it('should be valid grid', () => {  
      const grid: Grid = [
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,[1,1,1],[2,2,2],[3,3,3],[4,4,4],null,],
        [null,null,null,null,[3,2,1],[3,1,2],null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
      ];
      expect(component.isValid(grid)).toBeTrue();
    });

    it('all same should be invalid grid', () => {  
      const grid: Grid = [
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,[1,1,1],[1,1,1],[1,1,1],[1,1,1],null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
        [null,null,null,null,null,null,null,null,],
      ];
      expect(component.isValid(grid)).toBeFalse();
    });
  });

  
});
