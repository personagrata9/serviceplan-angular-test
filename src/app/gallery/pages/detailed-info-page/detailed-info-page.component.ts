import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { IItem } from '../../components/item/item.model';
import { selectItemById } from 'src/app/store/selectors/picsum.selectors';
import { mergeMap, Observable, Subscription } from 'rxjs';
import { PicsumService } from '../../services/picsum.service';
import { fetchItems } from 'src/app/store/actions/picsum.actions';

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

  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private picsumServise: PicsumService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    console.log(this.id);

    this.item$ = this.store.select(selectItemById(this.id));
    const subscription = this.item$.subscribe(item => {
      this.item = item;
    });
    this.subscriptions.push(subscription);

    this.title = this.item?.author || '';
    this.imageSrc = this.item?.download_url || '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  back(): void {
    this.router.navigate(['..']);
  }
}
