import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItem } from './item.model';
import { saveAs } from 'file-saver';
import { FileSaverService } from 'src/app/core/services/file-saver.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DownloadImpossibleDialogComponent } from '../download-impossible-dialog/download-impossible-dialog.component';
import { DetailedInfoDialogComponent } from '../detailed-info-dialog/detailed-info-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
  public title!: string;
  public imageSrc!: string;
  public filename!: string;

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private fileSaverService: FileSaverService,
    private dialog: MatDialog
  ) {}

  @Input()
  public item!: IItem;

  ngOnInit(): void {
    this.title = this.item.author;
    this.imageSrc = this.item.download_url;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onClick = () => {
    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      position: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
      height: '100%',
      width: '100vw',
      autoFocus: false,
      disableClose: true,
      panelClass: 'full-screen-modal',
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      data: {
        id: this.item.id,
      },
    };

    this.dialog.open(DetailedInfoDialogComponent, dialogConfig);
  };

  public onDownloadClick = ($event: Event, filename: string): void => {
    $event.stopPropagation();

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
