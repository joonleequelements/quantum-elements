import { CoreService } from './../../core/core.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'device-prescription',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './device-prescription.component.html',
  styleUrl: './device-prescription.component.scss'
})
export class DevicePrescriptionComponent {
  constructor(private router: Router, public coreService: CoreService) {

  }
  continue() {
    console.log("HI")
    this.router.navigateByUrl('design-model')
  }
}
