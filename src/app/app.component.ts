import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statusOps = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  forbiddenProjectName = 'Test';

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'prjname': new FormControl(null, [Validators.required/*, this.forbiddenName.bind(this)*/], this.forbiddenNameAsync.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenName(control: FormControl): {[s:string]: boolean} {
    if (this.forbiddenProjectName === control.value) {
      return {'nameIsForbidden': true}
    }
    return null;
  }

  forbiddenNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.forbiddenProjectName === control.value) {
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
