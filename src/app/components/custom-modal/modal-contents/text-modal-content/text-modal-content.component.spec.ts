import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextModalContentComponent } from './text-modal-content.component';

describe(TextModalContentComponent.name, () => {
  let component: TextModalContentComponent;
  let fixture: ComponentFixture<TextModalContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextModalContentComponent],
    });
    fixture = TestBed.createComponent(TextModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
