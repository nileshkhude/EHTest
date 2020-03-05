import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contactForm: FormGroup;
  id:string = '';
  firstName:string = '';
  lastName:string='';
  email:string='';
  phone:string='';
  status:boolean= true;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getContact(this.route.snapshot.params['id']);
    this.contactForm = this.formBuilder.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'status' : [this.status, Validators.required]
    });
  }

  getContact(id) {
    this.api.getContact(id).subscribe(data => {
      this.id = data._id;
      this.contactForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        status: data.status
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateContact(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/contact-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  contactDetails() {
    this.router.navigate(['/contact-details', this.id]);
  }
}
