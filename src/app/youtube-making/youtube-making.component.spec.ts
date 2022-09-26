import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeMakingComponent } from './youtube-making.component';

describe('YoutubeMakingComponent', () => {
  let component: YoutubeMakingComponent;
  let fixture: ComponentFixture<YoutubeMakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeMakingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeMakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
