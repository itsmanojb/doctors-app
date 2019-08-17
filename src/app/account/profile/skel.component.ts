import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-skeleton',
  template: `
    <div class="profile-loading">
        <div class="profile-loading-header">
            <span></span>
        </div>
        <div class="profile-loading-content">
            <span></span><span></span><span></span><span></span>
        </div>
    </div>
    `,
  styleUrls: ['./profile.component.scss'],
})
export class ProfileSkeletonComponent { }
