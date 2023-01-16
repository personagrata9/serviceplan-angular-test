import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../../components/item/item.model';
import { selectItemById } from 'src/app/store/selectors/picsum.selectors';
import { Observable, Subscription } from 'rxjs';
import { saveAs } from 'file-saver';
import { FileSaverService } from 'src/app/core/services/file-saver.service';
import { MatDialog } from '@angular/material/dialog';
import { DownloadImpossibleDialogComponent } from '../../dialogs/download-impossible-dialog/download-impossible-modal/download-impossible-dialog.component';

@Component({
  selector: 'app-detailed-info-page',
  templateUrl: './detailed-info-page.component.html',
  styleUrls: ['./detailed-info-page.component.scss'],
})
export class DetailedInfoPageComponent implements OnInit, OnDestroy {
  public id!: string;

  public item$!: Observable<IItem | undefined>;
  public item!: IItem | undefined;

  public title!: string;
  public imageSrc!: string;
  public filename!: string;

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private fileSaverService: FileSaverService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.item$ = this.store.select(selectItemById(this.id));
    const subscription = this.item$.subscribe(item => {
      this.item = item;
    });
    this.subscriptions.push(subscription);

    this.title = this.item?.author || '';
    this.imageSrc = this.item?.download_url || '';
    this.filename = this.title + this.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onBackClick(): void {
    this.router.navigate(['..']);
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
