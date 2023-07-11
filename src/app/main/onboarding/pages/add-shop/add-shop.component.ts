import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss'],
})
export class AddShopComponent implements OnInit {
  buttonDisabled = false;
  email?: string | null;
  errorMessage?: string | null;

  shopForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    phoneNumber: new FormControl(),
    postalAddress: new FormControl(),
    pinNumber: new FormControl(),
    discount: new FormControl('AMOUNT'),
    employees: new FormArray([]),
    admins: new FormArray([]),
  });

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.getUserEmail();
  }

  getUserEmail(): void {
    this.auth.user.subscribe((user) => {
      const employees = <FormArray>this.shopForm.get('employees');
      employees.clear();
      employees.push(new FormControl(user?.email));
    });
  }

  saveShop(): void {
    this.errorMessage = null;

    const shop = this.shopForm.value;

    if (!shop.name) {
      this.errorMessage = 'The shop name is cannot be empty';
      return;
    }

    if (!shop.employees?.length) {
      this.errorMessage = 'Something went wrong!. please try again';
      return;
    }

    this.buttonDisabled = true;

    shop.admins = shop.employees;
    const shopRef = this.firestore.collection('companies').doc();
    shop.id = shopRef.ref.id;

    shopRef
      .set(shop)
      .then(() => this.router.navigateByUrl('/onboarding/select-shop'))
      .catch((error) => {
        this.errorMessage = error;
        this.buttonDisabled = true;
      });
  }
}
