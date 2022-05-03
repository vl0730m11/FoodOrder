import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User, CreditCard } from 'src/app/models/classes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deepCopy } from 'src/app/utils/utils-functions';
import { ModalService } from 'src/app/shared/services/modal.service';
import { IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  userForm: FormGroup;
  submitted: boolean = false;
  private _user: User = new User();

  @Input() get user() {
    return this._user;
  }
  set user(value) {
    this.initForm(value);
    this._user = value;
  }

  @Input() cards: CreditCard[] = [];

  @Output() logout = new EventEmitter();
  @Output() saveClick = new EventEmitter<User>();
  @Output() deleteCard = new EventEmitter<CreditCard>();

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private routerOutlet: IonRouterOutlet
  ) {
    this.initForm(null);
  }

  addPaymentMethod() {
    return this.modalService.openCreditCardModal(this.routerOutlet.nativeEl, this.user);
    // this.router.navigate(['tabs/more/credit-card-details']);
  }

  removeCard(card: CreditCard, slidingItem) {
    if (!card) return;
    if (slidingItem) { slidingItem.close(); }
    return this.deleteCard.emit(card);
  }

  saveUser() {
    this.submitted = true;
    if (this.userForm.invalid) return;
    this.submitted = false;

    const formValue = this.userForm.value;
    const currentUser: User = deepCopy(this.user);
    currentUser.mobile = formValue.mobile;
    currentUser.address = formValue.address;
    this.saveClick.emit(currentUser);
  }

  initForm(user: User) {
    if (!user) {
      this.userForm = this.fb.group({
        displayName: ['', Validators.required],
        email: ['', Validators.required],
        address: [''],
        mobile: ['']
      });
    } else {
      this.userForm = this.fb.group({
        displayName: [user.displayName, Validators.required],
        email: [user.email, Validators.required],
        address: [user.address],
        mobile: [user.mobile],
      });
    }
  }

  openVerification() {
    this.modalService.openEmailVerification(this.userForm.value.email);
  }

  editAddress() {
    this.modalService.openEditor('Address', this.userForm.value.address);
  }

  editMobile() {
    this.modalService.openEditor('Mobile Phone', this.userForm.value.mobile);
  }
}
