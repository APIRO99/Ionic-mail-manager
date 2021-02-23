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
  avatar: string = "";

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

    this.name   = this.user.name || "";
    this.email  = this.user.email || "";
    this.avatar = this.user.avatar || "";
  }


  getUserImage = () => {
    return ( this.avatar ) 
      ? this.avatar
      : './assets/images/default-photo.jpg'
  }

  updateName  = ({ detail }) => this.name = detail.value
  updateEmail = ({ detail }) => this.email = detail.value
    

  addUpdateUser = async (name, email, avatar) => {
    const oldEmail = this.user.email;
    this.user = { name, email, avatar }

    if (this.user.avatar === "")
    this.user.avatar = "./assets/images/default-photo.jpg";
    
    let users = []
    if (this.addUser)
      users = await this.usersService.addUser(this.user);
    if (this.updateUser)
      users = await this.usersService.updateUser(this.user, oldEmail);

    this.modalController.dismiss({ users });
  }


  uploadFile = () =>
    this.fileButton.nativeElement.click();

  fileChanged = async(event) => 
    this.avatar = await this.filesService.loadImage(event);
}
