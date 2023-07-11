export interface Shop {
  id: string;
  name: string;
  logoUrl: string;
  pinNumber: string;
  phoneNumber: string;
  creationDate: string;
  postalAddress: string;
  owner: string;
  admins: string[];
  printReceipt: boolean;
  discount: string | null; //Discount type
  employees: string[];
}
