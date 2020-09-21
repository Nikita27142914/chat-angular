import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  canSubmit: boolean = false
  loginValue: string = ""
  passwordValue: string = ""

  constructor() {}

  ngOnInit(): void {}

  changeLogin(value: string) {
    this.loginValue = value
    this.canSubmit = Boolean(this.loginValue) && Boolean(this.passwordValue)
  }

  changePassword(value: string) {
    this.passwordValue = value
    this.canSubmit = Boolean(this.loginValue) && Boolean(this.passwordValue)
  }
}
