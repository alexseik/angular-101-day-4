import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CandidatesService } from './candidates.service';
import { Candidate } from '../models/candidate';
import { Experience } from '../models/experience';
import { APP_CONFIG } from '../config/app.config';

describe('CandidatesService', () => {
  let service: CandidatesService;
  let httpMock: HttpTestingController;
  let testBed: TestBed;

  const candidates: Candidate[] = [
    {
      id: 1,
      name: 'Nombre 1',
      surname: 'Apellido 1',
      email: 'email@email.com',
      experience: Experience.Junior,
      skills: [],
      previousProjects: [],
      age: 25,
    },
  ];

  const appConfig = { candidates };

  beforeEach(() => {
    testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: APP_CONFIG,
          useValue: appConfig,
        },
      ],
    });
    service = TestBed.inject(CandidatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('allows retrieve the candidates', () => {
    service.getCandidates().subscribe((retrieved) => {
      expect(retrieved).toEqual(candidates);
    });
    const req = httpMock.expectOne('http://localhost:3000/api/candidates');
    req.flush(candidates);
  });

  it('create should call post', () => {
    const newCandidate = {
      name: 'Nombre 1',
      surname: 'Apellido 1',
      email: 'email@email.com',
      experience: Experience.Junior,
      skills: [],
      previousProjects: [],
      age: 25,
    };

    service.save(newCandidate).subscribe();
    const req = httpMock.expectOne('http://localhost:3000/api/candidates');
    expect(req.request.method).toEqual('POST');
    req.flush(candidates[0]);
  });

  it('update should call put', () => {
    const newCandidate = {
      id: '1',
      name: 'Nombre 1',
      surname: 'Apellido 1',
      email: 'email@email.com',
      experience: Experience.Junior,
      skills: [],
      previousProjects: [],
      age: 25,
    };

    service.update(newCandidate).subscribe();
    const req = httpMock.expectOne('http://localhost:3000/api/candidates/1');
    expect(req.request.method).toEqual('PUT');
    req.flush(candidates[0]);
  });
});
