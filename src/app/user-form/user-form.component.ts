import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})

export class UserFormComponent implements OnInit {
  fullname_error: string = '';
  app_id_error: string = '';
  valid_period_error: string = '';
  active_error: boolean = true;
  edit_active: boolean = false;
  edit_id: number = 0;
  enteredValues: Object = {};
  user_form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userDService: UserDataService) {
    this.user_form = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/) ]],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      phone_number: ['', [Validators.required]],
      send_email: [false],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      contacts: ['', [Validators.minLength(7), Validators.maxLength(15)]],
      valid_period: ['', Validators.required],
      app_id: ['', Validators.required],
      capacity: ['', Validators.required],
      postscript: [''],
      authorization: [false],
    })
  }

  ngOnInit() {
    this.userDService.formValues.subscribe(editFormValues => {this.edit(editFormValues)});
  }

  resetForm(login: any)
  {
    login.resetForm()
  }

  onSubmit(login: any) {
    if(this.active_error === false)
    {
      this.userDService.addUserInfo(login.value);
      this.active_error = true;
      this.resetForm(login);
    }
  }

  checkDate(inputDate)
  {
    let today = new Date();
    let current_dd = today.getDate();
    let current_mm = today.getMonth() + 1;
    let current_yyyy = today.getFullYear();
    let enteredDate = new Date(inputDate);
    let entered_dd = enteredDate.getDate();
    let entered_mm = enteredDate.getMonth() + 1;
    let entered_yyyy = enteredDate.getFullYear();
    return (entered_yyyy >= current_yyyy && entered_mm >= current_mm && entered_dd >= current_dd)
  }

  change(value: any) {
    console.log(value);
  }

  onChange(value: any, login: any) {
    //checking if the fullname input field has been changed and if its has passed basic validity
    if(value.name === "fullname") { 
      if(value.valid){
        for(let i = 0; i<value.viewModel.length; i++)
        {
          if((/[a-zA-Z]/).test(value.viewModel.charAt(i)) == false && value.viewModel.charAt(i) != ' ')
          {
            this.fullname_error = "Full name must have only characters"
          } 
          else this.fullname_error = '';
        }
      }
      else this.fullname_error = '';
    }
    else if(value.name === "app_id") {
      for(let i = 0; i<value.viewModel.length; i++)
      {
        if((/[a-zA-Z0-9]/).test(value.viewModel.charAt(i)) == false)
        {
          this.app_id_error = "App ID can only have numbers or characters";
          return
        }
        else
          this.app_id_error = '';
      }
    }
    else if(value.name === "valid_period")
    {
      if (this.checkDate(value.viewModel) === false) // this means that the valid period is before today
      {
        this.valid_period_error = "Please Enter a Valid Period!"
      }
      else 
        this.valid_period_error = "";
    }
    if(login.invalid == true)
      this.active_error = true;
    else if (this.fullname_error != "" && this.app_id_error != "" && this.valid_period_error != "")
      this.active_error = true;
    else this.active_error = false;
  }

  edit(formValues)
  {
    this.edit_id = formValues.id;
    this.user_form.setValue({
      fullname: formValues.fullname?formValues.fullname:'',
      username: formValues.username?formValues.username:'',
      password: formValues.password?formValues.password:'',
      phone_number: formValues.phone_number?formValues.phone_number:'',
      send_email: formValues.send_email?formValues.send_email:false,
      email: formValues.email?formValues.email:'',
      address: formValues.address?formValues.address:'',
      contacts: formValues.contacts?formValues.address:'',
      valid_period: formValues.valid_period?formValues.valid_period: '',
      app_id: formValues.app_id?formValues.app_id: '',
      capacity: formValues.capacity?formValues.capacity: '',
      postscript: formValues.postscript?formValues.postscript:'',
      authorization: formValues.background?formValues.background:false,
    });
    if(formValues.fullname === '')
      this.edit_active = true;
  }

  cancel()
  {
    this.user_form.reset();
  }

  submit()
  {
    if(this.user_form.valid && this.edit_active === false)
    {
      this.userDService.addUserInfo(this.user_form.value);
      this.active_error = true;
      this.user_form.reset();
    }
    else if(this.edit_active && this.user_form.valid)
    {
      this.userDService.editUserInfo(this.user_form.value, this.edit_id);
      this.edit_active = false;
      this.user_form.reset();
    }
  }
}
