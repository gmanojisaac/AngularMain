import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeptfifteenComponent } from './septfifteen.component';

describe('SeptfifteenComponent', () => {
  let component: SeptfifteenComponent;
  let fixture: ComponentFixture<SeptfifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeptfifteenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeptfifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
