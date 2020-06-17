import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@modules/core/core.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [CommonModule, CoreModule, AppRoutingModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
