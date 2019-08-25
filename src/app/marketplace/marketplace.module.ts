import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
// import { AgmDirectionModule } from 'agm-direction';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../_components/components.module';

import { MarketplacePage } from './marketplace.page';
import { DealDetailsComponent } from './deal-details/deal-details.component';
import { DealItemComponent } from './deal-item/deal-item.component';
import { DealsSkeletonComponent } from './deals-skeleton/deals-skeleton.component';
import { ExploreDealsComponent } from './explore-deals/explore-deals.component';
import { DealMapComponent } from './deal-map/deal-map.component';
import { environment } from 'src/environments/environment';
import { PipesModule } from '../_pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: MarketplacePage
  },
  {
    path: 'deal',
    component: DealDetailsComponent
  },
  {
    path: 'explore-deals',
    component: ExploreDealsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.AGM_KEY
    }),
    // AgmDirectionModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [
    MarketplacePage,
    DealDetailsComponent,
    DealItemComponent,
    DealsSkeletonComponent,
    ExploreDealsComponent,
    DealMapComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [DealMapComponent]
})
export class MarketplacePageModule { }
