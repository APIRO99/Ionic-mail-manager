import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
})
export class UserFormPage implements OnInit {
  @ViewChild('fileButton', { static: false }) fileButton;
  @Input() user: User = { name: "", email: "", avatar: "" };
  @Input() addUser: boolean;
  @Input() updateUser: boolean;

  title: string = "";
  buttonAction: string = "";
  name: string = "";
  email: string = "";

  constructor(
    public modalController: ModalController,
    private usersService: UsersService,
    private filesService: FilesService
  ) {  }
  ngOnInit() { 
    if (this.addUser) {
      this.title = "Add new user";
      this.buttonAction = "Add";
    } else if (this.updateUser) {
      this.title = "Update user";
      this.buttonAction = "Update";
    }

    this.name = this.user.name;
    this.email = this.user.email;
  }


  getUserImage = (user: User) => {
    return ( user.avatar ) 
      ? user.avatar
      : './assets/images/default-photo.jpg'
  }


  addUpdateUser = async (name, email) => {
    if (this.user.avatar === "")
    this.user.avatar = "./assets/images/default-photo.jpg";

    this.user = { ...this.user, name, email}

    if (this.addUser)
      await this.usersService.addUser(this.user);
    if (this.updateUser)
      await this.usersService.updateUser(this.user);

    this.modalController.dismiss({
      user: this.user
    });
  }


  uploadFile = () =>
    this.fileButton.nativeElement.click();

  fileChanged = async(event) => 
    this.user.avatar = await this.filesService.loadImage(event);
}
