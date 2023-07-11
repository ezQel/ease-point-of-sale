import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  buttonDisabled = false;
  errorMessage?: string | null;

  employeeForm = new FormGroup({
    email: new FormControl(),
  });

  constructor(
    private app: AppService,
    private firestore: AngularFirestore,
    public modal: NgbActiveModal
  ) {}

  addEmployee(): void {
    this.errorMessage = null;

    const employee = this.employeeForm.value;

    if (!employee.email) {
      this.errorMessage = 'The email cannot be empty';
      return;
    }

    this.buttonDisabled = true;

    this.firestore.firestore
      .runTransaction(async (transaction) => {
        const shopRef = this.app.getCurrentShopRef().ref;
        const employees = (await transaction.get(shopRef)).get('employees');
        employees.push(employee.email);

        transaction.update(shopRef, { employees });
      })
      .then(() => this.modal.close(true))
      .catch((error) => {
        this.errorMessage = error;
        this.buttonDisabled = false;
      });
  }
}
