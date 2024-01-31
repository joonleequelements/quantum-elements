import { SimulateModelComponent } from './features/simulate-model/simulate-model.component';
import { DesignModelComponent } from './features/design-model/design-model.component';
import { DevicePrescriptionComponent } from './features/device-prescription/device-prescription.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'device-prescription',
        pathMatch: 'full'
    },
    {
        path: 'device-prescription',
        component: DevicePrescriptionComponent
    },
    {
        path: 'design-model',
        component: DesignModelComponent
    },
    {
        path: 'simulate-model',
        component: SimulateModelComponent
    }
];
