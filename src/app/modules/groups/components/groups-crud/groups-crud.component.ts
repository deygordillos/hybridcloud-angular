import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { GroupsService } from '@app/services/groups/groups.service';
import { Group } from '@app/models/group.model';

@Component({
  selector: 'app-groups-crud',
  templateUrl: './groups-crud.component.html',
  styleUrls: ['./groups-crud.component.scss']
})
export class GroupsCrudComponent implements OnInit {

  productDialog: boolean = false;

  inactiveGroupDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  groups: Group[] = [];

  group: Group = {};

  selectedProducts: Group[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private groupsService: GroupsService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadGroups();

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' },
    ];

    this.statuses = [
      { label: 'Activo', value: '1' },
      { label: 'Inactivo', value: '0' }
    ];
  }

  loadGroups() {
    this.groupsService.getGroups().then(data => (this.groups = data));
  }

  openNew() {
    this.group = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(group: Group) {
    this.group = { ...group };
    this.productDialog = true;
  }

  inactiveGroup(group: Group) {
    this.inactiveGroupDialog = true;
    this.group = { ...group };
  }

  activeGroup(group: Group) {
    this.group = { ...group };
    this.group.group_status = 1; // Set group status to inactive
    this.updateGroup();
    this.loadGroups();
  }
  
  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.groups = this.groups.filter(
      val => !this.selectedProducts.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedProducts = [];
  }

  confirmInactivateGroup() {
    this.group.group_status = 0; // Set group status to inactive
    this.updateGroup();
  }

  updateGroup() {
    this.groupsService.updateGroup(this.group).then(res => {
      this.inactiveGroupDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: '¡Éxito!',
        detail: 'Grupo actualizado',
        life: 3000,
      });
      this.group = {};
      this.loadGroups();
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.group.group_name?.trim()) {
      if (this.group.group_id) {
        // @ts-ignore
        // this.group.inventoryStatus = this.group.inventoryStatus.value
        //   ? this.group.group_status!.value
        //   : this.group.group_status;
        this.groups[this.findIndexById(this.group.group_id)] = this.group;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        // this.group.group_id = this.createId();
        // this.group.group_name = this.createId();
        // this.group.image = 'product-placeholder.svg';
        // @ts-ignore
        // this.group.inventoryStatus = this.group.inventoryStatus
        //   ? this.group.inventoryStatus.value
        //   : 'INSTOCK';
        // this.groups.push(this.group);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.groups = [...this.groups];
      this.productDialog = false;
      this.group = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].group_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
