import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User, Mail } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { MailService } from 'src/app/services/mail.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import Quill from 'quill'
const parchment = Quill.import('parchment');
const BackgroundClass = Quill.import('attributors/class/background');
const ColorClass = Quill.import('attributors/class/color');
const SizeStyle = Quill.import('attributors/style/size');

Quill.register(BackgroundClass, true);
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);



@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.page.html',
  styleUrls: ['./new-email.page.scss'],
})
export class NewEmailPage implements OnInit {
  @ViewChild('fileButton', { static: false }) fileButton;
  users:[];
  email: Mail;

  form: FormGroup = this.fb.group({
    mailBody: new FormControl('')
  })
  constructor(
    private usersService: UsersService,
    private toastController: ToastController,
    private mailService: MailService,
    private fb: FormBuilder,
    private loadingController: LoadingController
  ) { }
  async ngOnInit() { this.cleanEmail() }

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
    this.form.get('mailBody').setValue('');
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


  async addUsersToast(message, color, duration) {
    const toast = await this.toastController.create({
      message, color, duration,
      mode: "ios",
      position: 'top'
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Sending email...'
    });
    loading.present();
  }


  sendMail = async () => {
    if (this.email.to.length > 0) {
      this.presentLoading()
      const { code, message } = await this.mailService.sendEmail({
        ...this.email, 
        body: this.form.get('mailBody').value
      });
      this.loadingController.dismiss();
      const succeed = ( code == 200 );

      this.addUsersToast(
        message,
        ( succeed ) ? "success" : "danger",
        ( succeed ) ? 3000 : 6000 );

      if (succeed) this.cleanEmail()

    } else 
      this.addUsersToast("You ned to select at least 1 user", "danger", 2000);
  }

}
