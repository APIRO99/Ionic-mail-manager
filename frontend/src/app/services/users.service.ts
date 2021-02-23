import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  constructor(private storage: Storage) {
    this.updateFromCurrentStorage();
  }

  private updateFromCurrentStorage = async () => {
    if (this.users.length === 0)  
      await this.getUsers().then(res => this.users = res || []);
  }

  private updateAndReturn = async () => {
    await this.storage.set('users', this.users);
    return this.users
  }

  getUsers = async () => await this.storage.get('users');

  addUser = async ( user: User ) => {
    this.users.push(user);
    return await this.updateAndReturn();
  }


  updateUser = async ( user: User ) => {
    this.users = this.users.map( usr => usr = (usr.email === user.email) ? user : usr );
    return await this.updateAndReturn();
  }


  deleteUser = async ( user: User ) => { 
    this.users = this.users.filter( usr => usr.email !== user.email);
    return await this.updateAndReturn();
  }
}