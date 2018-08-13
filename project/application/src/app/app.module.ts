import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
    imports: [RouterModule, CoreModule, SharedModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
