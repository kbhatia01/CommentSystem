import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Api/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  hid = true;
  InputForm: FormGroup
   data = [];
  constructor(private router: Router, private fb: FormBuilder, private Api: ApiService) {

    //form builder
    this.InputForm = this.fb.group({
      name: new FormControl("", Validators.required),
      body: new FormControl("", Validators.required),
      upvote: new FormControl(0, Validators.required),
      downvote: new FormControl(0, Validators.required)
    });
  }
  ngOnInit() {
    this.Api.getComments().subscribe(resp => {
      this.data = resp;
    });
  }

  onSubmit(form: FormGroup) {
    if (this.InputForm.invalid) {
      this.hid = false;
    }
    else {
      this.Api.postComments(form).subscribe(resp => {

        console.log(resp);
        this.InputForm.reset()
        this.ngOnInit();
      });
    }
  }

  onAction(type,id,index){
if(type=="l"){
this.data[index].upvote=this.data[index].upvote+1;
let m={
  upvote:this.data[index].upvote+1
}
this.Api.patchComments(m,id).subscribe(resp=>{
  console.log(resp);
})
}
  }
}
