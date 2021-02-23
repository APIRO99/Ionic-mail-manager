import { Component, OnInit, ViewChild } from '@angular/core';
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
    private filesService: FilesService,
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





  sendMail = () => this.mailService.sendEmail(this.email);
  

}
