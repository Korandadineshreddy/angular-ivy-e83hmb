import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { FileComponent } from './file/file.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import{HttpClient, HttpClientModule} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FileComponent,
    HelpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,Ng2SearchPipeModule,HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
