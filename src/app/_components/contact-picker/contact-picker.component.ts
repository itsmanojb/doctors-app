import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Users from '../../../assets/dummy/users.json';
import * as _ from 'lodash';

@Component({
  selector: 'app-contact-picker',
  templateUrl: './contact-picker.component.html',
  styleUrls: ['./contact-picker.component.scss'],
})
export class ContactPickerComponent implements OnInit {

  contactType: string;
  multiselect: boolean;

  userId: string;
  jwt: string;
  dataLoading: boolean;

  contacts: any[] = Users;
  allContacts: any[] = [];
  filteredContacts: any[] = [];
  contactAlphabet: any[] = [];

  searchText: string;
  showLetter: string;
  searchInitated = false;
  showAll = true;
  noFilter = true;
  canProceed = false;

  selectedContact: any[] = [];
  selectedNames: any[] = [];
  selectedPhotos: any[] = [];

  public readonly alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    '#',
  ];

  constructor(
    private modal: ModalController,
  ) {
  }

  ngOnInit() {
    this.dataLoading = true;
    switch (this.contactType) {
      case 'Patient':
        this.getPatientList();
        break;
      case 'Doctor':
        this.getDoctorList();
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.dataLoading = false;
    }, 500);
  }

  search(event) {
    const key = event.target.value;
    if (key.length > 0) {
      this.searchInitated = true;
      this.filteredContacts = this.allContacts.filter((contact) => {
        return contact.name.toUpperCase().includes(key.toUpperCase()) || contact.id.toUpperCase().includes(key.toUpperCase());
      })
    } else {
      this.searchInitated = false;
    }
  }

  resetSearch() {
    this.filteredContacts = [];
    this.searchInitated = false;
  }

  selectLetter(e) {
    this.showLetter = e.target.value;
    this.noFilter = e.target.value === '*' ? true : false;
    this.showAll = e.target.value === '*' ? true : false;
  }

  closePicker(): void {
    this.modal.dismiss();
  }

  getPatientList() {
    const patDataArr = this.contacts.filter(u => u.userType === 'Patient');
    this.arrangeNames(patDataArr, 'pat');
  }

  getDoctorList() {
    const patDataArr = this.contacts.filter(u => u.userType === 'Doctor');
    this.arrangeNames(patDataArr, 'doc');
  }

  arrangeNames(list: any[], contactType: string) {
    let mappedContacts: any;
    if (contactType === 'pat') {
      mappedContacts = list.map((item) => {
        const cObj = {
          id: item._id,
          name: `${item.name.first} ${item.name.last}`,
          photo: item.picture,
          age: item.age,
          sex: item.sex
        }
        return cObj;
      });
    } else if (contactType === 'doc') {
      mappedContacts = list.map((item) => {
        const cObj = {
          id: item._id,
          name: `${item.name.first} ${item.name.last}`,
          photo: item.picture,
          age: item.age,
          speciality: item.speciality.toLowerCase()
        }
        cObj.speciality = cObj.speciality.charAt(0).toUpperCase() + cObj.speciality.slice(1)
        return cObj;
      });
    }

    this.allContacts = mappedContacts;
    const groupedContacts = _.groupBy(mappedContacts, function (contact) {
      return contact.name.substr(0, 1);
    });
    const contactLetters = Object.keys(groupedContacts).sort();
    const mapped = this.alphabet.map((l) => {
      var rObj = {};
      rObj['letter'] = l;
      rObj['disabled'] = contactLetters.includes(l) ? false : true;
      return rObj;
    });
    const arr = Object.entries(groupedContacts).reverse();
    arr.sort(function (a, b) {
      var textA = a[0];
      var textB = b[0];
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    this.contacts = arr;
    this.contactAlphabet = mapped;
    // console.log(this.contacts, this.allContacts);
  }

  doSelection(item: any) {
    if (this.contactType === 'Patient' || this.contactType === 'Doctor') {
      const itemId = item.id;
      const itemName = item.name;
      const photo = item.photo;
      if (!this.multiselect) {
        if (this.selectedContact.length !== 0) {
          if (this.selectedContact.includes(itemId)) {
            this.selectedContact = [];
            this.selectedNames = [];
            this.selectedPhotos = [];
          } else {
            this.selectedContact[0] = itemId;
            this.selectedNames[0] = itemName;
            this.selectedPhotos[0] = photo;
          }
        } else {
          this.selectedContact.push(itemId);
          this.selectedNames.push(itemName);
          this.selectedPhotos.push(photo);
        }
      } else {
        if (this.selectedContact.length !== 0) {
          if (this.selectedContact.indexOf(itemId) === -1) {
            this.selectedContact.push(itemId)
            this.selectedNames.push(itemName)
            this.selectedPhotos.push(photo)
          } else {
            const num = this.selectedContact.indexOf(itemId);
            this.selectedContact.splice(num, 1)
            this.selectedNames.splice(num, 1)
            this.selectedPhotos.splice(num, 1)
          }
        } else {
          this.selectedContact.push(itemId)
          this.selectedNames.push(itemName)
          this.selectedPhotos.push(photo)
        }
      }
      this.canProceed = this.selectedContact.length === 1 ? true : false;
    }
  }

  isSelected(id: string) {
    if (this.contactType === 'Patient' || this.contactType === 'Doctor') {
      return this.selectedContact.includes(id) ? true : false;
    }
  }

  proceed() {
    const output = {
      ids: this.selectedContact,
      texts: this.selectedNames,
      photos: this.selectedPhotos
    }
    this.modal.dismiss(output, this.contactType);
  }

}
