import {
  trigger, animate, style, group, state, query, stagger, transition,
} from '@angular/animations';

/* tslint:disable: align */
export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    query('.anim', style({ opacity: 0 }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(120%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })),
      ], { optional: true }),
      query(':leave', [style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-120%)' })),
      ], { optional: true }),
    ]),
    query(':enter .anim', stagger(400, [style({ transform: 'translateY(30px)' }),
      animate('0.8s ease-in-out', style({ transform: 'translateY(0px)', opacity: 1 })),
    ]), { optional: true }),
  ]),
]);

export const scrollAnimation = trigger('scrollAnimation', [
  state('show', style({
    opacity: 1,
    transform: 'translateX(0)',
  })),
  state('hide', style({
    opacity: 0,
    transform: 'translateX(-100%)',
  })),
  transition('show => hide', animate('.7s ease-out')),
  transition('hide => show', animate('.7s ease-in')),
]);
