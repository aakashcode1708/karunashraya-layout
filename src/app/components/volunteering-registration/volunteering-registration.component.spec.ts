import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteeringRegistrationComponent } from './volunteering-registration.component';

describe('VolunteeringRegistrationComponent', () => {
  let component: VolunteeringRegistrationComponent;
  let fixture: ComponentFixture<VolunteeringRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunteeringRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteeringRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
