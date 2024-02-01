import { CouplingComponent } from './../coupling/coupling.component';
import { QuditClass, CouplingClass } from './../../core/interface';
import { CommonModule } from '@angular/common';
import { QuditComponent } from './../qudit/qudit.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
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

  @ViewChildren(QuditComponent) qudits: QueryList<QuditComponent>;

  constructor(public coreService: CoreService, private renderer: Renderer2) { }

  updateQuditPosition(qudit: QuditClass, event: any): void {
    // Update the qudit position based on drag end event
    console.log(event.source)
    qudit.position = { x: event.source.getFreeDragPosition().x + 38, y: event.source.getFreeDragPosition().y + 38 };
  }
  ngAfterViewInit() {
    this.qudits.forEach(qudit => {
      let position = qudit.qudit.position;
      if (position.x > 38 || position.y > 38) {
        this.renderer.setStyle(qudit.elementRef.nativeElement, 'transform', `translate3d(${position.x - 38}px, ${position.y - 38}px, 0px)`)
      }
    });
  }
}
