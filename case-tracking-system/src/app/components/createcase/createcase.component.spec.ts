import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecaseComponent } from './createcase.component';

describe('CreatecaseComponent', () => {
  let component: CreatecaseComponent;
  let fixture: ComponentFixture<CreatecaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
