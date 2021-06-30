import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { MatSliderModule } from '@angular/material/slider';
import { MenuComponent } from './component/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { PlaceService } from './services/place.service';
import { ChartsModule } from 'ng2-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { ModalComponent } from './component/modal/modal.component';
import { MatDialogModule } from '@angular/material';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MapComponent } from './component/map/map.component';
import { MapService } from './services/map.service';
import { ListService } from './services/list.service';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { PlaceShowComponent } from './component/place-show/place-show.component';
import { SlideComponent } from './component/slide/slide.component';
import { MatDividerModule } from '@angular/material/divider';
import { HomeCardComponent } from './component/home-card/home-card.component';
import { FooterComponent } from './component/footer/footer.component';
import { PlacesComponent } from './component/places/places.component';
import { HighlightDirective } from './highlight.directive';
import { PlaceCardComponent } from './component/place-card/place-card.component';
import { AboutComponent } from './pages/about/about.component';
import { OpenDataComponent } from './pages/open-data/open-data.component';
import { ItemAccordionComponent } from './component/item-accordion/item-accordion.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { UsageTermsComponent } from './pages/usage-terms/usage-terms.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryCounterComponent } from './component/category-counter/category-counter.component';
import { CounterAnimationComponent } from './component/counter-animation/counter-animation.component';
import { CategoryAgricultureComponent } from './component/category-agriculture/category-agriculture.component';
import { ChartPieComponent } from './component/chart-pie/chart-pie.component';
import { FiltersComponent } from './component/filters/filters.component';
import { AllFiltersComponent } from './component/all-filters/all-filters.component';
import { FormAddPlaceComponent } from './pages/form-add-place/form-add-place.component';
import { CheckboxInputComponent } from './component/forms/checkbox-input/checkbox-input.component';
import { RadioInputComponent } from './component/forms/radio-input/radio-input.component';
import { InputFormComponent } from './component/forms/input-form/input-form.component';
import { SelectInputComponent } from './component/forms/select-input/select-input.component';
import { PhonesRepeaterComponent } from './component/forms/phones-repeater/phones-repeater.component';
import { LibraryComponent } from './pages/library/library.component';
import { LibraryItemComponent } from './component/library-item/library-item.component';
import { LibraryThemeComponent } from './pages/library-theme/library-theme.component';
import { ProfilePictureComponent } from './component/forms/profile-picture/profile-picture.component';
import { ImageRepeaterComponent } from './component/forms/image-repeater/image-repeater.component';
import { CommentsComponent } from './component/comments/comments.component';
import { SuggestEditComponent } from './component/suggest-edit/suggest-edit.component';
import { SearchComponent } from './component/search/search.component';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { keyRecaptcha } from './utils/constants';
import { ConnectionsComponent } from './component/connections/connections.component';
import { MapInputComponent } from './component/forms/map-input/map-input.component';
import { CategoryFiltersComponent } from './component/category-filters/category-filters.component';
import { ConnectionCardsComponent } from './component/connection-card/connection-card.component';
import { ConnectionListComponent } from './component/connection-list/connection-list.component';
import { TotalResultsComponent } from './component/total-results/total-results.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PreloadImgComponent } from './component/preload-img/preload-img.component';
import { SeloComponent } from './pages/selo/selo.component';
import { BottomLinksComponent } from './component/bottom-links/bottom-links.component';
import { TermsPopupComponent } from './component/terms-popup/terms-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    HeaderComponent,
    ExploreComponent,
    ModalComponent,
    MapComponent,
    SidebarComponent,
    PlaceShowComponent,
    SlideComponent,
    HomeCardComponent,
    FooterComponent,
    PlacesComponent,
    HighlightDirective,
    PlaceCardComponent,
    AboutComponent,
    OpenDataComponent,
    ItemAccordionComponent,
    ContactComponent,
    UsageTermsComponent,
    CategoriesComponent,
    CategoryCounterComponent,
    CounterAnimationComponent,
    CategoryAgricultureComponent,
    ChartPieComponent,
    FiltersComponent,
    AllFiltersComponent,
    FormAddPlaceComponent,
    CheckboxInputComponent,
    RadioInputComponent,
    InputFormComponent,
    SelectInputComponent,
    PhonesRepeaterComponent,
    LibraryComponent,
    LibraryItemComponent,
    LibraryThemeComponent,
    ProfilePictureComponent,
    ImageRepeaterComponent,
    CommentsComponent,
    SuggestEditComponent,
    SearchComponent,
    ConnectionsComponent,
    MapInputComponent,
    CategoryFiltersComponent,
    ConnectionCardsComponent,
    ConnectionListComponent,
    TotalResultsComponent,
    NotFoundComponent,
    PreloadImgComponent,
    SeloComponent,
    BottomLinksComponent,
    TermsPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatSliderModule,
    MatGridListModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatDialogModule,
    MatCarouselModule.forRoot(),
    FlexLayoutModule,
    MatDividerModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [PlaceService, MapService, ListService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: keyRecaptcha } as RecaptchaSettings
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'pt-BR'
    },],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
