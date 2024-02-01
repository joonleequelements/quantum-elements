import { QuditClass } from './../../core/interface';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'qudit',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './qudit.component.html',
  styleUrl: './qudit.component.scss'
})
export class QuditComponent {
  @Input() qudit: QuditClass
  constructor(public elementRef: ElementRef) { }
}
