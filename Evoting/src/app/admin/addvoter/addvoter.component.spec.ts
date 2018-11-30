import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvoterComponent } from './addvoter.component';

describe('AddvoterComponent', () => {
  let component: AddvoterComponent;
  let fixture: ComponentFixture<AddvoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
