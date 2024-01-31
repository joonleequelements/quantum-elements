import { CouplingComponent } from './../coupling/coupling.component';
import { QuditClass, CouplingClass } from './../../core/interface';
import { CommonModule } from '@angular/common';
import { QuditComponent } from './../qudit/qudit.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'canvas-view',
  standalone: true,
  imports: [CdkDrag, QuditComponent, CouplingComponent, CommonModule],
  templateUrl: './canvas-view.component.html',
  styleUrl: './canvas-view.component.scss'
})
export class CanvasViewComponent {
  @Input() selectedQudit;
  @Input() couplingMode;
  @Input() selectedQuditToCouple;
  @Output() quditSelected = new EventEmitter<QuditClass>();
  @Output() couplingSelected = new EventEmitter<CouplingClass>();
  constructor(public coreService: CoreService) { }

  updateQuditPosition(qudit: QuditClass, event: any): void {
    // Update the qudit position based on drag end event
    qudit.position = { x: event.source.getFreeDragPosition().x + 38, y: event.source.getFreeDragPosition().y + 38 };
  }
}
