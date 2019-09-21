import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule, MatDialogModule, MatToolbarModule } from '@angular/material'
import { MatButtonModule } from '@angular/material/button'
import { MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from '@angular/material/chips'
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EpisodeListComponent, RandomEpisodeDialog } from './episode-list/episode-list.component';
import { FullScreenLoaderComponent } from './full-screen-loader/full-screen-loader.component';
import { EpisodeCardComponent } from './episode-card/episode-card.component';

@NgModule({
  declarations: [
    AppComponent,
    EpisodeListComponent,
    RandomEpisodeDialog,
    FullScreenLoaderComponent,
    EpisodeCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
    MatToolbarModule,
  ],
  entryComponents: [
    RandomEpisodeDialog,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
