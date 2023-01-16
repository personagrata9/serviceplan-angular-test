import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadImpossibleDialogComponent } from './download-impossible-dialog.component';

describe('DownloadImpossibleDialogComponent', () => {
  let component: DownloadImpossibleDialogComponent;
  let fixture: ComponentFixture<DownloadImpossibleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadImpossibleDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadImpossibleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
