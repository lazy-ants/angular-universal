import { NgModule } from '@angular/core';
import { LocalizationModule } from 'angular-l10n';

@NgModule({
    imports: [LocalizationModule],
    exports: [LocalizationModule],
})
export class SharedModule {}
