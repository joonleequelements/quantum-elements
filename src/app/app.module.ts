import { SharedModule } from './shared/shared.module';
import { SimulateModelComponent } from './features/simulate-model/simulate-model.component';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { DevicePrescriptionModule } from './features/device-prescription/device-prescription.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DesignModelComponent } from './features/design-model/design-model.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        CommonModule,
        DevicePrescriptionModule,
        SimulateModelComponent,
        DesignModelComponent,
        RouterOutlet,
        SharedModule
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
