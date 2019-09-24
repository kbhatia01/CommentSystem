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
      name: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      upvote: new FormControl(0, Validators.required),
      downvote: new FormControl(0, Validators.required)
    });

    for (const item of this.data) {
      //intially make selected as false;
      item.upvoted = false;
      item.downvoted = false;

    }
  }
  ngOnInit() {
    this.Api.getComments().subscribe(resp => {
      this.data = resp;
    });
  }

  onSubmit(form: FormGroup) {

    if (this.InputForm.get('name').value==null || this.InputForm.get('body').value==null) {
      this.hid = false;
    }
    else {
      this.Api.postComments(form).subscribe(resp => {
        this.hid = true;
        console.log(resp);
        this.InputForm.reset()
        this.ngOnInit();
      });
    }
  }

  onAction(type, id, index) {
    let m;
    if (this.data[index].downvoted && type == "d" && this.data[index].downvote > 0) {
      this.data[index].downvote = this.data[index].downvote - 1;
      m = { downvote: this.data[index].downvote }
      this.data[index].downvoted = false;
    }
    else if (this.data[index].upvoted && type == "l" && this.data[index].upvote > 0) {
      this.data[index].upvote = this.data[index].upvote - 1;
      m = { upvote: this.data[index].upvote }
      this.data[index].upvoted = false;
    }
    else if (type == "l") {
      this.data[index].upvote = this.data[index].upvote + 1;
      if (this.data[index].downvoted && this.data[index].downvote > 0) {
        this.data[index].downvote = this.data[index].downvote - 1;
        this.data[index].downvoted = false
      }
      m = { upvote: this.data[index].upvote, downvote: this.data[index].downvote }

      this.data[index].upvoted = true;
    }
    else if (type == "d") {
      this.data[index].downvote = this.data[index].downvote + 1;
      if (this.data[index].upvoted && this.data[index].upvote > 0) {
        this.data[index].upvote = this.data[index].upvote - 1;
        this.data[index].upvoted = false
      } m = { upvote: this.data[index].upvote, downvote: this.data[index].downvote }

      this.data[index].downvoted = true;
    }
    if (m != null)
      this.Api.patchComments(m, id).subscribe(resp => {
        console.log(resp);
      })
  }
}
