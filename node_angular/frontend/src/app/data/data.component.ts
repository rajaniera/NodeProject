import { Component } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent {
  userData: any;
  successMsg: any;

  constructor(private apiService: ApiServiceService) {
    this.getAllData();
  }

  deletId(id: any) {
    console.log(id, 'deleteid==>');
    this.apiService.deletData(id).subscribe(
      (res) => {
        console.log(res, 'deleteId==>');
        this.successMsg = 'Deleted data successfully!';
        this.getAllData(); // Refresh the data after deletion
      },
      (error) => {
        console.error('Error deleting data:', error);
      }
    );
  }

  getAllData() {
    this.apiService.getAllData().subscribe(
      (res) => {
        console.log(res, 'res==>');
        this.userData = res.data;
      },
      (error) => {
        console.error('Error getting data:', error);
      }
    );
  }

  //update

  updateData() {}
}
