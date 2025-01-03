import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// The RouterModule should be included in the config, if you're using standalone components.
appConfig.providers = [
  {
    provide: 'ROUTES',
    useValue: routes, // Import the routes here
  },
];

