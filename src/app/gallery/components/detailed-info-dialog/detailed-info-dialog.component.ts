import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FileSaverService } from 'src/app/core/services/file-saver.service';
import { StateService } from 'src/app/core/services/state.service';
import { IItem } from '../item/item.model';
import { saveAs } from 'file-saver';
import { DownloadImpossibleDialogComponent } from '../download-impossible-dialog/download-impossible-dialog.component';
import { IDialogData } from './dialog-data.model';

@Component({
  selector: 'app-detailed-info-dialog',
  templateUrl: './detailed-info-dialog.component.html',
  styleUrls: ['./detailed-info-dialog.component.scss'],
})
export class DetailedInfoDialogComponent implements OnInit, OnDestroy {
  private id!: string;
  private item!: IItem | undefined;
  public title!: string;
  public imageSrc!: string;
  public filename!: string;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<DetailedInfoDialogComponent>,
    private stateService: StateService,
    private fileSaverService: FileSaverService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: IDialogData
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.item = this.stateService.getItemById(this.id);
    this.title = this.item?.author || '';
    this.imageSrc = this.item?.download_url || '';
    this.filename = this.title + this.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onBackClick(): void {
    this.dialogRef.close();
  }

  public onDownloadClick = (filename: string): void => {
    if (this.item && this.fileSaverService.checkIsDownloadPossible(this.item)) {
      const subscription = this.fileSaverService
        .downloadImage(this.item)
        .subscribe(blob => saveAs(blob, filename));

      this.subscriptions.push(subscription);
    } else {
      this.dialog.open(DownloadImpossibleDialogComponent);
    }
  };
}
