import { Component } from '@angular/core';
import { WifiWizard2 } from '@ionic-native/wifi-wizard-2/ngx';
import { Platform } from '@ionic/angular';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public connected: any = {};

  constructor(private wifiWizard2: WifiWizard2,
              private platform: Platform,
              private app: AppService) {}

  async example() {
    const result =  await this.wifiWizard2.scan();
    const BSSID = await this.wifiWizard2.getConnectedBSSID();
    this.connected = result.find(data => data.BSSID === BSSID);
  }

  async ngOnInit() {
    await this.platform.ready();
    this.example();
  }

  doRefresh(event) {
    this.example();
    event.target.complete();
  }

  async save() {
    this.example();
    const red = {
      nombre_red: this.connected.SSID,
      rssi: this.connected.level
    }
    await this.app.post('wifi/addItem', red);
  }
}
