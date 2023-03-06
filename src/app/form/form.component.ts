import { Component } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {UserdataService} from "../services/userdata.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(private formBuilder: FormBuilder, private userdata: UserdataService) {

  }

  dataForm = this.formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  onSubmit() {
    const userInfo = {
      name: this.dataForm.get('name')?.value,
      surname: this.dataForm.get('surname')?.value,
      email: this.dataForm.get('email')?.value
    }
    this.userdata.addUser(userInfo)
    this.dataForm.reset();
  }
}
