import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()), 
        
        provideHttpClientTesting(), 
        
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('should add the Authorization header when the token exists in localStorage.', () => {
    const fakeToken = 'meu-token-secreto-123';
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(fakeToken);

    client.get('/api/dados').subscribe();

    const httpRequest = httpMock.expectOne('/api/dados');

    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${fakeToken}`);
  });

  it('should NOT add the Authorization header if there is no token in localStorage.', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    client.get('/api/dados').subscribe();

    const httpRequest = httpMock.expectOne('/api/dados');

    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
  });
});