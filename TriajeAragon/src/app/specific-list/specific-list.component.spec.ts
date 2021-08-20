import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificListComponent } from './specific-list.component';

describe('SpecificListComponent', () => {
  let component: SpecificListComponent;
  let fixture: ComponentFixture<SpecificListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
