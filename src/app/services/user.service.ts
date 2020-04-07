import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _currentUser = new BehaviorSubject<UserModel | null>(null);

    public get currentUser(): Observable<UserModel> {
        return this._currentUser;
    }

    public setCurrentUser(user: UserModel | null) {
      this._currentUser.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    }
}
