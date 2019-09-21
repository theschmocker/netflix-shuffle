import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Episode } from '../../../shared/episode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private baseUrl = 'http://localhost:3000/episode'
  private episodes$ = this.http.get<Episode[]>(this.baseUrl)
  
  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<Episode[]> {
    return this.episodes$;
  }
}
