import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../service/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  errMsg: any;
  successMsg: any;
  getparamid: any;

  constructor(
    private apiSrc: ApiServiceService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.router.snapshot.paramMap.get('id'), 'getid');
    this.getparamid = this.router.snapshot.paramMap.get('id');

    this.apiSrc.getSingleData(this.getparamid).subscribe((res) => {
      console.log(res, 'res==>');
      this.userForm.patchValue({
        fullname: res.data[0].fullname,
        email: res.data[0].email,
        mobile: res.data[0].mobile,
      });
    });
  }
  userForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
  });

  //create new user
  submit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.apiSrc.createData(this.userForm.value).subscribe((res) => {
        console.log(res, 'submit data');
      });
      this.userForm.reset();
      this.successMsg = 'data inserted !';
    } else {
      this.errMsg = 'all Field are required !';
    }
  }

  //update

  updateUser() {
    console.log(this.userForm.value, 'update data');
    if (this.userForm.valid) {
      this.apiSrc
        .updateData(this.userForm.value, this.getparamid)
        .subscribe((res) => {
          console.log(res, 'update data');
          this.successMsg = res.successMsg;
          this.route.navigate(['/data']);
        });
    } else {
      this.errMsg = 'all fields are required';
    }
  }
}
