import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
})
export class StudentDetailComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  isUpdatedFormActive = false;

  student_name: string = '';
  course: string = '';
  Fee: string = '';
  currentStudentId = '';

  constructor(private http: HttpClient) {
    this.getAllStudent();
  }

  getAllStudent() {
    this.http.get('student').subscribe((resultData: any) => {
      this.isResultLoaded = true;
      console.log(resultData.data);
      this.StudentArray = resultData.data;
    });
  }
  3;

  register() {
    let bodyData = {
      student_name: this.student_name,
      course: this.course,
      Fee: this.Fee,
    };

    this.http
      .post('http://localhost:8085/api/student/add', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Successfully');
        this.getAllStudent();
      });
  }

  setUpdate(data: any) {
    this.student_name = data.student_name;
    this.course = data.course;
    this.Fee = data.Fee;

    this.currentStudentId = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      student_name: this.student_name,
      course: this.course,
      Fee: this.Fee,
    };

    this.http
      .put(
        'http://localhost:8085/api/student/update' +
          '/' +
          this.currentStudentId,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Updateddd');
        this.getAllStudent();
      });
  }

  save() {
    if (this.currentStudentId == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete('http://localhost:8085/api/student/delete' + '/' + data.id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Deletedddd');
        this.getAllStudent();
      });
  }
}
