import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionModalFooterComponent } from './action-modal-footer.component';

describe(ActionModalFooterComponent.name, () => {
  let component: ActionModalFooterComponent;
  let fixture: ComponentFixture<ActionModalFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActionModalFooterComponent],
    });
    fixture = TestBed.createComponent(ActionModalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
