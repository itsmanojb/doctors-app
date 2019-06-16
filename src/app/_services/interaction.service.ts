import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {

  private allowedToProceed = new BehaviorSubject(false);
  private ui = new Subject();

  changeAllowance(option: boolean) {
    this.allowedToProceed.next(option);
  }

  canProceed() {
    return this.allowedToProceed.asObservable();
  }

  isDarkMode() {
    return this.ui.asObservable();
  }

  setDarkMode(mode: boolean) {
    this.ui.next(mode);
  }
}
