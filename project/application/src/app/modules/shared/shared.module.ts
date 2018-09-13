import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationModule } from 'angular-l10n';

@NgModule({
    imports: [LocalizationModule, CommonModule],
    exports: [LocalizationModule, CommonModule],
})
export class SharedModule {}
