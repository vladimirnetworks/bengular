import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainOverviewComponent } from './domain-overview.component';

describe('DomainOverviewComponent', () => {
  let component: DomainOverviewComponent;
  let fixture: ComponentFixture<DomainOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
