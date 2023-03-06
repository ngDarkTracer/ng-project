import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  users: any = [];

  constructor() { }

  addUser(user: any) {
    this.users.push({
      id: this.users.length ? this.users.length : 0,
      name: user.name,
      surname: user.surname,
      email: user.email
    });
  }

  deleteUser(id: number) {
    const elt = this.users.find((user: any) => user.id === id);
    this.users.splice(elt.id, 1);
    this.users = this.users.map((user: any, index: any) => {
      user.id = index;
      return user;
    });
  }

  editUser(userToModify: any) {
    this.users.forEach((user: any) => {
      if (user.id === userToModify.id) {
        user.name = userToModify.name;
        user.surname = userToModify.surname;
        user.email = userToModify.email;
      }
    });
  }
}
