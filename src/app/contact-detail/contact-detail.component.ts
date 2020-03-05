import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getContactDetails(this.route.snapshot.params['id']);
  }

  getContactDetails(id) {
    this.api.getContact(id)
      .subscribe(data => {
        console.log(data);
        this.contact = data;
      });
  }

  deleteContact(id) {
    this.api.deleteContact(id)
      .subscribe(res => {
          this.router.navigate(['/contacts']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
