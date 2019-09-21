import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodeService } from './episode/episode.service';
import { EpisodeController } from './episode/episode.controller';

@Module({
  imports: [],
  controllers: [AppController, EpisodeController],
  providers: [AppService, EpisodeService],
})
export class AppModule {}
