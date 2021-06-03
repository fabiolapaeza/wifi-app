import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public items: any[] = [];
  constructor(private app: AppService) {}

  ngOnInit() {
    this.getItems();
  }

  async getItems() {
    const data = await this.app.get('wifi/getItems');
    if (data) {
      this.items = data.data;
    }
    console.log(data);
  }

  doRefresh(event) {
    this.getItems();
    event.target.complete();
  }
}
