import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component } from '@angular/core';
import { routes } from './app.routes';
import { NotFoundComponent } from './pages/not-found/not-found.component';

jest.mock('@angular-architects/native-federation', () => ({
  loadRemoteModule: jest.fn(),
}));

@Component({ standalone: true, template: '<p>Home MFE</p>' })
class FakeHomeComponent {}

@Component({ standalone: true, template: '<p>Dashboard MFE</p>' })
class FakeDashboardComponent {}

describe('App Routes', () => {
  let harness: RouterTestingHarness;
  let loadRemoteModuleMock: jest.Mock;

  beforeEach(async () => {
    loadRemoteModuleMock = loadRemoteModule as jest.Mock;
    loadRemoteModuleMock.mockClear();

    loadRemoteModuleMock.mockImplementation((remoteName: string) => {
      if (remoteName === 'bytebank-home-angular') {
        return Promise.resolve({ AppComponent: FakeHomeComponent });
      }
      if (remoteName === 'bytebank-dashboard-angular') {
        return Promise.resolve({
          routes: [{ path: '', component: FakeDashboardComponent }]
        });
      }
      return Promise.reject('Remote not found');
    });

    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  it('should redirect empty path to /home', async () => {
    await harness.navigateByUrl('/');
    const router = TestBed.inject(Router);
    
    expect(router.url).toBe('/home');
    expect(harness.routeNativeElement?.innerHTML).toContain('Home MFE');
  });

  it('should load "home" MFE on /home route', async () => {
    await harness.navigateByUrl('/home');
    
    expect(loadRemoteModule).toHaveBeenCalledWith('bytebank-home-angular', './Component');
    expect(harness.routeNativeElement?.innerHTML).toContain('Home MFE');
  });

  it('should load "dashboard" MFE on /dashboard route', async () => {
    await harness.navigateByUrl('/dashboard');

    expect(loadRemoteModule).toHaveBeenCalledWith('bytebank-dashboard-angular', './routes');
    expect(harness.routeNativeElement?.innerHTML).toContain('Dashboard MFE');
  });

  it('should load NotFoundComponent for unknown routes', async () => {
    await harness.navigateByUrl('/unknown-route-123');
    
    const instance = harness.routeDebugElement?.componentInstance;
    
    expect(instance).toBeInstanceOf(NotFoundComponent);
  });
});