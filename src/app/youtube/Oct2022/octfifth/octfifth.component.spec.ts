import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OctfifthComponent } from './octfifth.component';

describe('OctfifthComponent', () => {
  let component: OctfifthComponent;
  let fixture: ComponentFixture<OctfifthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OctfifthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OctfifthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
