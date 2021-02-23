import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { User, Mail } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { FilesService } from '../../services/files.service';
import { MailService } from '../../services/mail.service';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.page.html',
  styleUrls: ['./new-email.page.scss'],
})
export class NewEmailPage implements OnInit {
  @ViewChild('fileButton', { static: false }) fileButton;
  users:[];
  email: Mail;
  constructor(
    private usersService: UsersService,
    private toastController: ToastController,
    private mailService: MailService
  ) { }
  async ngOnInit() {this.cleanEmail()}

  async ionViewWillEnter() {
    this.users = await this.usersService.getUsers();
  }

  private cleanEmail = () => {
    this.email = {
      to: [],
      subject: "",
      body: "",
      attachments: []
    }
  }

  findEmail = ({ email }) => this.email.to.find(usr => usr.email === email);

  displayNoUsersMessage = () => {
    return (this.users)
      ? (this.users.length > 0) ? false : true
      : true
  }

  toggleUserFromMail = (user: User) => {
    let diff = usr => usr.email !== user.email;
    if (this.findEmail(user))
      this.email.to = this.email.to.filter(diff);
    else
      this.email.to.push(user);
  } 

  uploadFiles = () =>
    this.fileButton.nativeElement.click();

  fileChanged = async(event) => {
    const { files } = event.target;
    this.email.attachments.push(...files);
  }

  deleteFile = ({ name }) => {
    let diff = file => file.name !== name;
    this.email.attachments = this.email.attachments.filter(diff);
  }


  async addUsersToast(message, color) {
    const toast = await this.toastController.create({
      message, color,
      duration: 2000,
      mode: "ios",
      position: 'top'
    });
    toast.present();
  }

  sendMail = () => {
    if (this.email.to.length > 0) {
      this.addUsersToast("Succesfully send the email", "success");
      this.mailService.sendEmail(this.email);
    } else 
      this.addUsersToast("You ned to select at least 1 user", "danger");
  }


  

}
