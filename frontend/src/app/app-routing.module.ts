import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { PlaceShowComponent } from './component/place-show/place-show.component';
import { AboutComponent } from './pages/about/about.component';
import { OpenDataComponent } from './pages/open-data/open-data.component';
import { Categories } from './utils/tools';
import { ContactComponent } from './pages/contact/contact.component';
import { UsageTermsComponent } from './pages/usage-terms/usage-terms.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FormAddPlaceComponent } from './pages/form-add-place/form-add-place.component';
import { LibraryComponent } from './pages/library/library.component';
import { LibraryThemeComponent } from './pages/library-theme/library-theme.component';
import { t } from './utils/translate';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SeloComponent } from './pages/selo/selo.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    data: { name: 'Home',
      label: 'Página Inicial',
      category: Categories.All,
      footer: true,
      map: true }
  },
  { path: t.url.explore,
    component: ExploreComponent,
    data: {
      name: 'Explore',
      label: 'Mapa',
      sidenavTitle: 'Todos',
      icon: 'all-white',
      activeIcon: 'all-gray',
      category: Categories.All,
      map: true,
      isGray: true  }
  },
  { path: t.place + '/:slug',
    component: PlaceShowComponent,
    data: { name:  'Place', map: true, isGray: true }
  },
  { path: t.url.farmers,
    component: ExploreComponent,
    data: {
      label: t.farmers,
      sidenav: true,
      icon: 'upas',
      activeIcon: 'upa-green',
      sidenavTitle: 'Agricultura',
      category: Categories.Farmers,
      homeIcon: 'upa-home',
      name: 'Explore',
      map: true,
      isGray: true
    }
  },
  { path: t.url.markets,
    component: ExploreComponent,
    data: {
      label: t.markets,
      sidenav: true,
      icon: 'markets',
      activeIcon: 'market-pink',
      homeIcon: 'market-home',
      category: Categories.Markets,
      name: 'Explore',
      map: true,
      isGray: true
    }
  },
  { path: t.url.touristic_point,
    component: ExploreComponent,
    data: {
      label: t.tourism,
      sidenav: true,
      icon: 'tourism',
      activeIcon: 'tourism-orange',
      homeIcon: 'tourism-home',
      category: Categories.Tourism,
      name: 'Explore',
      map: true,
      isGray: true
    }
  },
  { path: t.url.initiatives,
    component: ExploreComponent,
    data: {
      label: t.initiatives,
      sidenav: true,
      icon: 'initiatives',
      activeIcon: 'initiatives-blue',
      homeIcon: 'initiatives-home',
      category: Categories.Initiatives,
      name: 'Explore',
      map: true,
      isGray: true
    }
  },
  { path: 'seloSampa',
    component: SeloComponent,
    data: { footer: true, name: 'SeloSampa', label: 'Selo'}
  },
  { path: t.url.library,
    component: LibraryComponent,
    data: { footer: true, name: 'Biblioteca', label: 'Biblioteca'}
  },
  {
    path: t.url.library + '/' + t.url.theme + '/:theme',
    component: LibraryThemeComponent,
    data: { footer: true, name: 'Biblioteca'}
  },
  { path: 'sobre',
    component: AboutComponent,
    data: { label: 'Sobre', footer: true,  name: 'sobre' }
  },
  { path: 'dados',
    component: OpenDataComponent,
    data: { label: 'Dados abertos', footer: true, name: 'dados'}
  },
  { path: 'contato',
    component: ContactComponent,
    data: { footer: true, name: 'fale-conosco'}
  },
  { path: 'termos',
    component: UsageTermsComponent,
    data: { footer: true, name: 'termos-uso'}
  },
  { path: 'categoria/' + t.url.touristic_point,
    component: CategoriesComponent,
    data: { footer: true, name: 'categoria'}
  },
  { path: 'categoria/' + t.url.markets,
    component: CategoriesComponent,
    data: { footer: true, name: 'categoria'}
  },
  { path: 'categoria/' + t.url.farmers,
    component: CategoriesComponent,
    data: { footer: true, name: 'categoria'}
  },
  { path: 'categoria/' + t.url.initiatives,
    component: CategoriesComponent,
    data: { footer: true, name: 'categoria'}
  },
  { path: 'categoria/' + t.url.corona,
    component: CategoriesComponent,
    data: { footer: true, name: 'categoria'}
  },
  { path: 'incluir-local',
    component: FormAddPlaceComponent,
    data: { footer: true, name: 'incluir-local'}
  },
  { path: '**',
    component: NotFoundComponent,
    data: { footer: true, name: 'not-found'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
