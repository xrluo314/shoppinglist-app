import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
})
export class ItemsListComponent implements OnInit {
  panelOpenState = false;

  createItem= { item_product: null, item_quantity: null, item_priority: null };

  items: any;
  currentItem = null;
  currentIndex = -1;
  item_product = '';
  initNewItem = { item_product: null, item_quantity: null, item_priority: null };

  newItem = { item_product: null, item_quantity: null, item_priority: null };
  priors=[1,2,3];

  addItem = {
    item_id: 0,
    item_product: '',
    item_quantity: 1,
    item_priority: 3,
    item_deleted: 0,
    item_purchased: 0,
    item_modified: '',
    item_created: '',
    user_user_id: '',
  };


  constructor(private listService: ListService) {}

  ngOnInit() {
    this.retrieveItems();
  }

  retrieveItems() {
    this.listService.getAll().subscribe(
      (data) => {
        this.items = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList() {
    this.retrieveItems();
    this.currentItem = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(item, index) {
    this.currentItem = item;
    this.currentIndex = index;
  }

  removeAllTutorials() {
    this.listService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.retrieveItems();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  itemPurchased(item) {
    this.listService.itemPurchased(item.item_id).subscribe(
      (response) => {
        console.log(response);
        this.retrieveItems();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  itemDeleted(item) {
    this.listService.itemDeleted(item.item_id).subscribe(
      (response) => {
        console.log(response);
        this.retrieveItems();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle() {
    this.listService.findByTitle(this.item_product).subscribe(
      (data) => {
        this.items = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  change() {
    var data=this.currentItem;
    if(this.newItem.item_product){data.item_product=this.newItem.item_product}
    if(this.newItem.item_quantity){
      if(this.checkNumber(this.newItem.item_quantity)){
        data.item_quantity=this.newItem.item_quantity
      }}
    if(this.newItem.item_priority){data.item_priority=this.newItem.item_priority}

    this.listService.itemChange(data.item_id,data).subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
    this.newItem={ item_product: null, item_quantity: null, item_priority: null };
  }

  checkNumber(obj){
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(obj)) {
        return true;
    }
    return false;
  }

  saveAddItem(){
    if(this.addItem.item_product==''){
      alert("Please enter item name!")}else{
        this.listService.create(this.addItem).subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
    this.addItem = {
      item_id: 0,
      item_product: '',
      item_quantity: 1,
      item_priority: 3,
      item_deleted: 0,
      item_purchased: 0,
      item_modified: '',
      item_created: '',
      user_user_id: '',
    };
      }

  }
}
