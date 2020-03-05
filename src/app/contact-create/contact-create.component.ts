import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css']
})
export class ContactCreateComponent implements OnInit {

  contactForm: FormGroup;
  firstName:string='';
  lastName:string='';
  email:string='';
  phone:string='';
  status:boolean= true;
  

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'status' : [this.status, Validators.required]
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.postContact(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/contact-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
