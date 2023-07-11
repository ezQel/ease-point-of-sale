import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/shared/services/app.service';
import { AddEmployeeComponent } from '../../components/add-employee/add-employee.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { Observable, map } from 'rxjs';
import { UserInfo } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Shop } from 'src/app/shared/models/shop';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  user$?: Observable<UserInfo | null>;
  shop$?: Observable<Shop | undefined>;

  constructor(
    private modal: NgbModal,
    private app: AppService,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getEmployees();
  }

  getUser(): void {
    this.user$ = this.auth.user;
  }

  getEmployees(): void {
    this.shop$ = this.app.getCurrentShop();
  }

  addEmployee(): void {
    this.modal.open(AddEmployeeComponent);
  }

  removeEmployee(employee: string): void {
    const confirmationModal = this.modal.open(ConfirmationModalComponent);
    confirmationModal.componentInstance.title = `Remove ${employee}?`;

    confirmationModal.closed.subscribe(() => {
      this.firestore.firestore.runTransaction(async (transaction) => {
        const shopRef = this.app.getCurrentShopRef().ref;
        const employees: string[] = (await transaction.get(shopRef)).get(
          'employees'
        );

        const employeeIndex = employees.findIndex((e) => e === employee);

        if (employeeIndex > -1) {
          employees.splice(employeeIndex, 1);
        }

        transaction.update(shopRef, { employees });
      });
    });
  }
}
