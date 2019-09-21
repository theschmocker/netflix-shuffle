import { Component, OnInit, Input } from '@angular/core';
import { Episode } from '../../../../shared/episode';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss']
})
export class EpisodeCardComponent implements OnInit {

  @Input('episode') episode: Episode;

  constructor() { }

  ngOnInit() {
  }

}
