import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Angular 19.2.16+ requires the server to pass its BootstrapContext through
// (the fix for CVE-2026-27739); without it, route extraction fails with NG0401.
const bootstrap = (context: BootstrapContext) => bootstrapApplication(AppComponent, config, context);

export default bootstrap;
