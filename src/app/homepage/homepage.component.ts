import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  hid = true;
  InputForm: FormGroup
  constructor(private router: Router, private fb: FormBuilder) {

    //form builder
    this.InputForm = this.fb.group({
      name: new FormControl("", Validators.required),
      body: new FormControl("", Validators.required)
    });
  }
  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    if (this.InputForm.invalid) {
      this.hid = false;
    }
    else {
    
    }
  }
}
