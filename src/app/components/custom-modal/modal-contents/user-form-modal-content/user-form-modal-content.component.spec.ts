import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormModalContentComponent } from './user-form-modal-content.component';

describe(UserFormModalContentComponent.name, () => {
  let component: UserFormModalContentComponent;
  let fixture: ComponentFixture<UserFormModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserFormModalContentComponent],
    });
    fixture = TestBed.createComponent(UserFormModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
