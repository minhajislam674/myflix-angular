import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorPageComponent } from './director-page.component';

describe('DirectorPageComponent', () => {
  let component: DirectorPageComponent;
  let fixture: ComponentFixture<DirectorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
