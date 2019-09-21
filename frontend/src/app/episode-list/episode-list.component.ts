import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject, of, Subscription } from 'rxjs';
import { switchMap, map, startWith, publishLast, refCount, tap, publish, share } from 'rxjs/operators'
import { Episode } from '../../../../shared/episode';
import { EpisodeService } from '../episode.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit, OnDestroy {

  loading = true;

  episodes$: Observable<Episode[]> = this.episodes.getEpisodes().pipe(
    publishLast(),
    refCount(),
    tap(() => this.loading = false),
  )

  filterControls = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  seasons$: Observable<number[]> = this.episodes$.pipe(
    map(
      episodes => [...new Set(
        episodes
          .map(ep => ep.seasnum)
      )].sort()
    ),
    tap(seasons => {
      this.filterControls.patchValue({
        start: 1,
        end: seasons.length
      })
    }),
  )

  filteredEpisodes$ = this.seasons$.pipe(
    switchMap(seasons => {
      return this.filterControls.valueChanges
        .pipe(
          map(({ start, end }) => [start, end]),
          startWith([1, seasons.length]),
          map(([start, end]) => {
            if (start >= end) {
              end = start + 1;
              this.filterControls.patchValue({
                end,
              })
            }
            return [start, end];
          }),
          switchMap(([start, end]) => {
            return this.episodes$.pipe(
              map(episodes => episodes
                .filter(
                  episode => episode.seasnum >= start && episode.seasnum <= end
                )
              )
            )
          }),
        )
    }),

    // side effect to show random episode modal
    switchMap(episodes => {
      return this.showRandom$
        .pipe(
          tap((show) => {
            if (!show) return;
            const random = episodes[Math.floor(Math.random() * episodes.length)]
            this.dialog.open(RandomEpisodeDialog, {
              data: random,
            })
          })
        )
    }, episodes => episodes)
  )

  showRandom$ = new BehaviorSubject<boolean>(false);

  constructor(
    private episodes: EpisodeService,
    public dialog: MatDialog,
  ) { }

  modalCloseSubscription: Subscription;

  ngOnInit() {
    this.modalCloseSubscription = this.dialog.afterAllClosed.subscribe(
      () => this.showRandom$.next(false)
    );
  }

  ngOnDestroy() {
    this.modalCloseSubscription.unsubscribe();
  }
}

@Component({
  selector: 'app-random-episode-dialog',
  templateUrl: 'random-episode-dialog.html',
  styleUrls: ['./random-episode-dialog.scss'],
})
export class RandomEpisodeDialog {
  constructor(
    public dialogRef: MatDialogRef<RandomEpisodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Episode,
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }
}