import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _currentUser: UserModel;

  get currentUser(): UserModel {
      return this._currentUser;
  }
}
