import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppSharedModule } from './app-shared/app-shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

 import {SeptfifteenComponent} from './youtube/Sep2022/septfifteen/septfifteen.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { YoutubeMakingComponent } from './youtube-making/youtube-making.component';
import { SepttwensevenComponent } from './youtube/Sep2022/septtwenseven/septtwenseven.component';
import { OctfifthComponent } from './youtube/Oct2022/octfifth/octfifth.component';


@NgModule({
  declarations: [
    AppComponent,
    SeptfifteenComponent,
    AboutMeComponent,
    YoutubeMakingComponent,
    SepttwensevenComponent,
    OctfifthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppSharedModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [MarkdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
