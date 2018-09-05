import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { I18nModule } from './modules/i18n/i18n.module';

@NgModule({
    imports: [RouterModule, CoreModule, SharedModule, I18nModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
