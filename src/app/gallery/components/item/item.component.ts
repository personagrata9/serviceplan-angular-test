import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IItem } from './item.model';
import { saveAs } from 'file-saver';
import { FileSaverService } from 'src/app/core/services/file-saver.service';
import { MatDialog } from '@angular/material/dialog';
import { DownloadImpossibleDialogComponent } from '../download-impossible-dialog/download-impossible-dialog.component';

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
    this.redirectToDetailedInfoPage();
  };

  private redirectToDetailedInfoPage = (): void => {
    const { id } = this.item;
    this.router.navigate(['gallery', id]);
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
