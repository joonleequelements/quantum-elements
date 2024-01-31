import { BathDialogComponent } from './../../shared/bath-dialog/bath-dialog.component';
import { CommonModule } from '@angular/common';
import { Qudit, Coupling, CouplingClass, QuditClass } from './../../core/interface';
import { CoreService } from './../../core/core.service';
import { SharedModule } from './../../shared/shared.module';
import { CanvasViewComponent } from './../../shared/canvas-view/canvas-view.component';
import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'design-model',
  standalone: true,
  imports: [CdkDrag, SharedModule, FormsModule, CommonModule, MatCheckboxModule],
  templateUrl: './design-model.component.html',
  styleUrl: './design-model.component.scss'
})
export class DesignModelComponent {
  public selectedQudit: QuditClass;
  public selectedCoupling: CouplingClass
  couplingMode: boolean = false;
  selectedQuditToCouple: QuditClass[] = [];

  constructor(public coreService: CoreService, public dialog: MatDialog) { }
  quditSelected(q: QuditClass) {
    if (!q) {
      this.selectedQudit = null;
      return
    }
    if (this.couplingMode) {
      this.selectedQuditToCouple.push(q)
      if (this.selectedQuditToCouple.length == 2) {
        this.coreService.addCoupling(this.selectedQuditToCouple[0], this.selectedQuditToCouple[1])
        this.selectedQuditToCouple = []
        this.toggleCouplingMode()
      }
    } else {
      this.selectedQudit = q
      this.selectedCoupling = null
    }
  }
  couplingSelected(coupling: CouplingClass) {
    this.selectedCoupling = coupling
    console.log(this.selectedCoupling)
    this.selectedQudit = null
  }
  deleteQudit() {
    this.coreService.removeQudit(this.selectedQudit)
    this.selectedQudit = null;
  }
  deleteCoupling() {
    this.coreService.removeCoupling(this.selectedCoupling)
    this.selectedCoupling = null;
  }
  toggleCouplingMode() {
    this.selectedQudit = null;
    this.couplingMode = !this.couplingMode;
  }
  openBathDialog() {
    const dialogRef = this.dialog.open(BathDialogComponent, { width: '500px' })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedQudit.bath.push(result)
      }
    })
  }
}
