import { QuditClass, CouplingClass } from './../../core/interface';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Coupling, Qudit } from '../../core/interface';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'simulate-model',
  standalone: true,
  imports: [CdkDrag, SharedModule, CommonModule, FormsModule],
  templateUrl: './simulate-model.component.html',
  styleUrl: './simulate-model.component.scss'
})
export class SimulateModelComponent {
  public selectedQudit: QuditClass;
  public selectedCoupling: CouplingClass
  public nav = 'gate-type'
  couplingMode: boolean = false;
  selectedQuditToCouple: QuditClass[] = [];
  numberArray: any[];

  constructor(public coreService: CoreService) { }
  ngOnInit() {
    this.numberArray = new Array(this.coreService.energyLevels)
  }
  setNav(nav) {
    this.nav = nav
  }
  test(q, i) {
    console.log(q, i, q.initialization_parameter[i])
  }
}
