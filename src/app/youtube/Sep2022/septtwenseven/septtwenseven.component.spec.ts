import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepttwensevenComponent } from './septtwenseven.component';

describe('SepttwensevenComponent', () => {
  let component: SepttwensevenComponent;
  let fixture: ComponentFixture<SepttwensevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepttwensevenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SepttwensevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
