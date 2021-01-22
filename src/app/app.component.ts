import { Component, OnInit } from '@angular/core';
import  { ethers} from 'ethers';
import { User } from './models/user';
const { abi } = require('./GLDToken.json');

let provider = ethers.getDefaultProvider('rinkeby');

let privateKey = '##PRIVATEKEY##';
let wallet = new ethers.Wallet(privateKey, provider);
let contractAddress = "0xAD60FDa915d8722BE0DFae0681A8b272d08357F6";
let contract = new ethers.Contract(contractAddress, abi, provider);
let contractWithSigner = contract.connect(wallet);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};

  constructor() { }

  async ngOnInit() {
    this.users = await contract.retrieveWhiteList();
    console.log(this.users);
  }

  

  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;

  }

  async saveUser(user: User) {
    if (this.isNewUser) {
      let tx = await contractWithSigner.addWhiteList(user.address);
      console.log(tx.hash);
      await tx.wait();
      this.users = await contract.retrieveWhiteList();

    }
    this.userForm = false;
  }

  

  async removeUser(user: User) {
    let tx = await contractWithSigner.removeWhiteList(user);
      console.log(tx.hash);
      await tx.wait();
      this.users = await contract.retrieveWhiteList();
  }

  

  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }

}
