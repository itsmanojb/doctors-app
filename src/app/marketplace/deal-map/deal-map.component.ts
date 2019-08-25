import { Component, OnInit } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavParams, ModalController, Platform } from '@ionic/angular';
import MapStyle from './map-styles.json';

@Component({
  selector: 'app-deal-map',
  templateUrl: './deal-map.component.html',
  styleUrls: ['./deal-map.component.scss']
})
export class DealMapComponent implements OnInit {


  public lat: number;
  public lng: number;
  // public origin: any;
  // public destination: any;

  title: string;
  address: string;
  styles = MapStyle;

  constructor(
    params: NavParams,
    // private loc: Geolocation,
    private modal: ModalController,
    private platform: Platform
  ) {
    this.lat = params.get('value').lat;
    this.lng = params.get('value').lon;
    this.title = params.get('value').name;
    this.address = params.get('value').address;
  }

  ngOnInit() {
    // this.destination = { lat: this.lat, lng: this.lng };
    // this.loc.getCurrentPosition().then(resp => {
    //   this.mylat = resp.coords.latitude;
    //   this.mylng = resp.coords.longitude;
    //   this.origin = { lat: this.mylat, lng: this.mylng }
    // })
  }

  ionViewDidEnter() {
    this.platform.backButton.subscribe(() => {
      this.dismissModal();
    });
  }

  dismissModal() {
    this.modal.dismiss(null);
  }
}
