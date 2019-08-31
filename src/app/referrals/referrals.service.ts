import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ReferralsService {

  arraySort(arr, desc = true) {
    arr.sort((a, b) => {

      const a_date = a['dtCreate'];
      const b_date = b['dtCreate'];

      if (a_date === b_date) {
        return 0;
      } else {
        if (desc) {
          return (a_date < b_date) ? 1 : -1;
        } else {
          return (a_date < b_date) ? -1 : 1;
        }
      }
    });
  }

  doDatewiseGroup(dataArr: any[]) {
    const dates = [];
    dataArr.forEach((el: any) => {
      const longDate = new Date(el.created);
      const completeDate = `${longDate.getMonth() + 1}/${longDate.getDate()}/${longDate.getFullYear()}`;
      dates.push(completeDate);
    });
    const groupedDates = _.uniq(dates);
    const referralArr = [];
    groupedDates.forEach(el => {
      const datedReferrals = {
        date: new Date(el),
        referrals: []
      };
      datedReferrals.referrals = dataArr.filter((referral: any) => {
        const longDate = new Date(referral.created);
        const completeDate = `${longDate.getMonth() + 1}/${longDate.getDate()}/${longDate.getFullYear()}`;
        return completeDate === el;
      });
      referralArr.push(datedReferrals);
    });
    // console.log(referralArr);
    return referralArr;
  }

  doNamewiseGroup(arr: any[]) {
    // console.log(arr);
    const names = [];
    arr.forEach((el: any) => {
      const fname = this.getFullname(el.practitioner.demog);
      names.push(fname);
    });
    const groupedNames = _.uniq(names);
    const referralArr = [];
    groupedNames.forEach(el => {
      const namedReferrals = {
        name: el,
        referrals: [],
      };
      namedReferrals.referrals = arr.filter((referral: any) => {
        const referredBy = this.getFullname(referral.practitioner.demog);
        return referredBy === el;
      });
      referralArr.push(namedReferrals);
    });
    return referralArr;
  }

  getFullname(demog: any): string {
    return `${demog.name.first} ${demog.name.last}`;
  }

  isCurrentYear(timestamp: string): boolean {
    const d = new Date(timestamp).getFullYear();
    return d === new Date().getFullYear() ? true : false;
  }

}
