import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('buttonClasses', () => {
    it('should return default classes', () => {
      expect(component.buttonClasses).toEqual(['button', 'primary']);
    });

    it('should return correct variant class', () => {
      component.variant = 'secondary';
      expect(component.buttonClasses).toContain('secondary');
      expect(component.buttonClasses).not.toContain('primary');

      component.variant = 'danger';
      expect(component.buttonClasses).toContain('danger');
    });

    it('should include custom className', () => {
      component.className = 'custom-class';
      expect(component.buttonClasses).toContain('custom-class');
      expect(component.buttonClasses).toContain('button');
      expect(component.buttonClasses).toContain('primary');
    });
  });
});
