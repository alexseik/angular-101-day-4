import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CandidateCardComponent } from './candidate-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Experience } from 'src/app/models/experience';
import { AppMaterialModule } from 'src/app/app-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let loader: HarnessLoader;

describe('CandidateCardComponent', () => {
  let component: CandidateCardComponent;
  let fixture: ComponentFixture<CandidateCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateCardComponent],
      imports: [
        AppMaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CandidateCardComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.candidate = {
      id: 0,
      email: 'candidate@email.com',
      phone: '+34634434312',
      experience: Experience.Junior,
      name: 'Carlos',
      skills: [],
      previousProjects: [
        {
          name: 'BBVA',
          technology: ['ReactJS'],
          description: 'A description',
          experience: 1,
        },
      ],
      surname: 'Ruiz Marco',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
