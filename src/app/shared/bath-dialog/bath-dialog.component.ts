import { LindbladBathClass, OhmicBathClass, SpinFluctuatorBathClass } from './../../core/interface';
import { CommonModule } from '@angular/common';
import { CoreService } from './../../core/core.service';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { OhmicBath } from '../../core/interface';
import { BathType } from '../../core/enum';

@Component({
  selector: 'app-bath-dialog',
  standalone: true,
  imports: [MatCheckboxModule, CommonModule, FormsModule],
  templateUrl: './bath-dialog.component.html',
  styleUrl: './bath-dialog.component.scss'
})
export class BathDialogComponent {
  public bath: any = new OhmicBathClass()
  constructor(public CoreService: CoreService, public dialogRef: MatDialogRef<BathDialogComponent>) { }

  setBathType(event) {
    let type = event.target.value
    console.log(type)
    if (type == BathType.Ohmic) {
      this.bath = new OhmicBathClass()
    } else if (type == BathType.Fluctuator) {
      this.bath = new SpinFluctuatorBathClass()
    } else if (type == BathType.Lindblad) {
      this.bath = new LindbladBathClass()
    }
  }
  addBath() {
    console.log(this.bath)
    this.dialogRef.close(this.bath);
  }
}
