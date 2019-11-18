import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from '@app/app.component';
import { CoreModule } from '@core/core.module';
import { I18nModule } from '@modules/i18n/i18n.module';
import { RoutingModule } from '@modules/routing/routing.module';

@NgModule({
    imports: [CommonModule, CoreModule, I18nModule, RoutingModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
