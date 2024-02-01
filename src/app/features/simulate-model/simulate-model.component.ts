import { QuditClass, CouplingClass } from './../../core/interface';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Coupling, Qudit } from '../../core/interface';
import { CoreService } from '../../core/core.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'simulate-model',
  standalone: true,
  imports: [CdkDrag, SharedModule, CommonModule, FormsModule, FontAwesomeModule],
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
  faSpinner = faSpinner;
  simulationInProgress = false;
  simulationComplete = false;
  private jobStatusSubscription: Subscription;
  constructor(public coreService: CoreService) {
    this.jobStatusSubscription = this.coreService.getJobStatusSubject().subscribe((status) => {
      if (status.done) {
        this.simulationInProgress = false;
        this.simulationComplete = true;
        console.log('Job is done. Result:', status.result);
        // Do something with the result, update UI, etc.
      } else {
        console.error('Job failed with error:', status.error);
        // Handle error, update UI, etc.
      }
    });
  }
  ngOnInit() {
    this.numberArray = new Array(this.coreService.energyLevels)
  }
  setNav(nav) {
    this.nav = nav
  }
  test(q, i) {
    console.log(q, i, q.initialization_parameter[i])
  }
  simulate() {
    this.simulationInProgress = true;
    this.coreService.simulate()
  }
  cancel() {
    this.simulationInProgress = false;
    this.simulationComplete = false;
  }
  getFidelity() {
    return Math.round(this.coreService.gate_fidelity * 10000) / 100
  }
}
