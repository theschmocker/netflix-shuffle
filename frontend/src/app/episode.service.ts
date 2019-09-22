import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Episode } from '../../../shared/episode';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private baseUrl = environment.production 
    ? 'https://netflix-shuffle.jacobschmocker.com/episode'
    : 'http://localhost:3000/episode'
  private episodes$ = this.http.get<Episode[]>(this.baseUrl)
  
  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<Episode[]> {
    return this.episodes$;
  }
}
