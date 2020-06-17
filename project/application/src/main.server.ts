import { enableProdMode } from '@angular/core';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
export { ngExpressEngine } from '@nguniversal/express-engine';

export { AppServerModule } from './app/app.server.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}
