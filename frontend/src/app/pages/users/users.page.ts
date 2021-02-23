import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { UserFormPage } from '../user-form/user-form.page';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: User[] = [];
  constructor( 
    private usersService: UsersService,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {  }
  async ngOnInit(){
    this.usersService.getUsers()
      .then( res => {
        if (res) this.users.push(...res);
        else this.users = [];
      })
  }

  presentActionSheet = async ( user: User ) => {
    const actionSheet = await this.actionSheetController.create({
      header: user.name,
      buttons: [{
        text: 'Edit',
        icon: 'create-outline',
        handler: async () => await this.updateUserModal(user)
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        cssClass:'redAlert',
        handler: async () => {
          const tmp = await this.usersService.deleteUser(user);
          this.users = [];
          this.users.push(...tmp);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async addUserModal() {
    const addUser = true;
    const modal = await this.modalController.create({
      component: UserFormPage,
      componentProps: { addUser }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    (data) ? this.updateList(data) : "";
  }

  async updateUserModal(user: User) {
    const updateUser = true;
    const modal = await this.modalController.create({
      component: UserFormPage,
      componentProps: { user, updateUser }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    (data) ? this.updateList(data) : "";
  }

  updateList = ({ users }) => {
    this.users = [];
    this.users.push(...users)
  }

}