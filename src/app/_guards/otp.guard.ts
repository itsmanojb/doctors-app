import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InteractionService } from '../_services/interaction.service';

@Injectable({
  providedIn: 'root',
})
export class OtpGuard implements CanActivate {

  constructor(private iAction: InteractionService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    let proceed;
    this.iAction.canProceed().subscribe(yes => proceed = yes);
    if (!proceed) {
      this.router.navigateByUrl(next.data['prev']);
      return false;
    }
    return true;
  }
}
