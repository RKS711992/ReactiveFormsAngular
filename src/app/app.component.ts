import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { forbiddenNameValidator } from "./shared/user-name.validator";
import { passwordValidator } from "./shared/password.validator";
import { RegistrationService } from "./registration.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  userResgistration: FormGroup;
  ngOnInit(): void {
    this.userResgistration = this.fb.group(
      {
        userName: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            forbiddenNameValidator(/password/)
          ]
        ],
        email: [""],
        subscribe: [false],
        password: ["test"],
        confirmPassword: ["test"],
        address: this.fb.group({
          city: ["City1"],
          state: ["State"],
          postalCode: [123456]
        })
      },
      { validator: passwordValidator }
    );

    this.userResgistration
      .get("subscribe")
      .valueChanges.subscribe(checkedValue => {
        const email = this.userResgistration.get("email");
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }
  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {}
  // get userName() {
  //   return this.userResgistration.get("userName");
  // }

  get email() {
    return this.userResgistration.get("email");
  }

  title = "ReactiveFormsProject";

  // userResgistration = new FormGroup({
  //   userName: new FormControl("Rishabh"),
  //   password: new FormControl(""),
  //   confirmPassword: new FormControl(""),
  //   address: new FormGroup({
  //     city: new FormControl(""),
  //     state: new FormControl(""),
  //     postalCode: new FormControl("")
  //   })
  // });

  loadAPIWithSetValue() {
    this.userResgistration.setValue({
      userName: "Rishabh",
      password: "test",
      confirmPassword: "test",
      address: {
        city: "City1",
        state: "State",
        postalCode: 123456
      }
    });
  }

  loadAPIWithPatchValue() {
    this.userResgistration.patchValue({
      userName: "Rishabh",
      password: "test",
      confirmPassword: "test"
      // address: {
      //   city: "City1",
      //   state: "State",
      //   postalCode: "Postal Code"
      // }
    });
  }
  onSubmit() {
    console.log(this.userResgistration.value);

    this.registrationService.register(this.userResgistration.value).subscribe(
      data => {
        console.log("Success", data);
      },
      error => {
        console.error("Error", error);
      }
    );

    //   this.registrationService
    //     .registerUser(this.userResgistration.value)
    //     .subscribe(
    //       data => console.log("Success", data),
    //       error => console.error("Error", error)
    //     );
  }
}
