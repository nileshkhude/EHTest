import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: any;
  displayedColumns = ["firstName", "lastName", "email", "phone", "status"];
  dataSource = new ContactDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getContacts()
      .subscribe(res => {
        console.log(res);
        this.contacts = res;
      }, err => {
        console.log(err);
      });
  }
}

export class ContactDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getContacts();
  }

  disconnect() {

  }
}
