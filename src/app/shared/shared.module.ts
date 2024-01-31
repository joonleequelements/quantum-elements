import { QuditComponent } from './qudit/qudit.component';
import { CanvasViewComponent } from './canvas-view/canvas-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    CanvasViewComponent,
    QuditComponent
  ],
  exports: [CanvasViewComponent, QuditComponent]
})
export class SharedModule { }
