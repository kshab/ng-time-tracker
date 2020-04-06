import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _registeredUser: UserModel = {
    username: 'test',
    password: 'qwerty',
  };

  public addRegisteredUserToLocalStorage(): void {
    localStorage.setItem(
      'registeredUser',
      JSON.stringify(this._registeredUser)
    );
  }

  public isUserExists(user: UserModel) {
    const registeredUser = this.getUserFromLocalStorage();
    console.log(registeredUser);
  }

  private getUserFromLocalStorage(): UserModel {
      return JSON.parse(localStorage.getItem('registeredUser'));
  }
}
