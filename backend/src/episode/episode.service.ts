import { Injectable } from '@nestjs/common';
import { Episode } from '../../../shared/episode';
import { readFileSync, readdirSync } from 'fs';

@Injectable()
export class EpisodeService {
    private episodes: Episode[];
    private readEpisodes(): Episode[] {
        if (this.episodes) return this.episodes;
        this.episodes = JSON.parse(readFileSync('./episodes.json').toString())
        return this.episodes;
    }

    getAll(): Episode[] {
        return this.readEpisodes();
    }
}
