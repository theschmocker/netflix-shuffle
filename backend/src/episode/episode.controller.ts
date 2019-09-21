import { Controller, Get } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { Episode } from '../../../shared/episode';

@Controller('episode')
export class EpisodeController {
    constructor(private episodes: EpisodeService) {}

    @Get('/')
    getAll(): Episode[] {
        return this.episodes.getAll();
    }
}
