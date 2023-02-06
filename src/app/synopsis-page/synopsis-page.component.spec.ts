import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisPageComponent } from './synopsis-page.component';

describe('SynopsisPageComponent', () => {
  let component: SynopsisPageComponent;
  let fixture: ComponentFixture<SynopsisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynopsisPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SynopsisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
