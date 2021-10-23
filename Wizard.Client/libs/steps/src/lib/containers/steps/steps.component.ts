import { Component, OnInit } from '@angular/core';

import { SectionItemService, SectionService } from '@wizard/shared/data-access';
import { SectionItemModel, SectionModel, SectionWithItemsModel } from '@wizard/shared/data-models';
import { StepsModel } from './steps.models';

@Component({
  selector: 'wizard-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  model: StepsModel;
  constructor(private sectionService: SectionService, private sectionItemService: SectionItemService) {
    this.model = new StepsModel();
  }

  ngOnInit(): void {
    this.getAllSteps();
  }

  addStep(): void {
    const order = this.getNewItemOrder();
    const newSection: SectionModel = {id: 0, title: `Step ${order}`, order };
    this.sectionService.add(newSection).subscribe(res => {
      if (res.isSuccess) {
        newSection.id = res.result;
        this.addSectionToTheList(newSection);
      }
    })
  }

  deleteStep(sectionId: number): void {
    this.sectionService.deleteSection(sectionId).subscribe(res => {
      if (res.isSuccess) {
        this.model.allSteps = this.model.allSteps.filter(s => s.id !== sectionId);
      }
    })
  }

  selectedTabChange(): void {
    this.model.selectedItemToEdit = null;
  }

  selectItemForEdit(item: SectionItemModel): void {
    this.model.selectedItemToEdit = item;
  }

  addUpdateItem(item: SectionItemModel, section: SectionWithItemsModel): void {
    item.sectionId = section.id;
    if (!item.id) {
      this.addItem(item, section);
    } else {
      this.updateItem(item, section);
    }
  }

  deleteItem(itemId: number, section: SectionWithItemsModel): void {
    this.sectionItemService.deleteItem(itemId).subscribe(res => {
      if (res.isSuccess) {
        section.items = section.items.filter(item => item.id != itemId);
      }
    })
  }

  private addItem(item: SectionItemModel, section: SectionWithItemsModel): void {
    this.sectionItemService.add(item).subscribe(res => {
      if (res.isSuccess) {
        item.id = res.result;
        this.addItemToSection(item, section);
      }
    })
  }

  private updateItem(item: SectionItemModel, section: SectionWithItemsModel): void {
    this.sectionItemService.update(item).subscribe(res => {
      if (res.isSuccess) {
        const itemIndexNeedUpdate = section.items.findIndex(i => i.id == item.id);
        section.items[itemIndexNeedUpdate] = item;
        section.items = this.getDeepCopy(section.items);
        this.model.selectedItemToEdit = null;
      }
    })
  }

  private getNewItemOrder(): number {
    if (!this.model.allSteps || this.model.allSteps.length == 0) {
      return 1;
    }
    const currentOrders = this.model.allSteps.map(s => s.order);
    return Math.max(...currentOrders) + 1;
  }

  private addItemToSection(item: SectionItemModel, section: SectionWithItemsModel): void {
    const allItems: SectionItemModel[] = this.getDeepCopy(section.items);
    allItems.push(item);
    section.items = allItems;
  }

  private getAllSteps(): void {
    this.sectionService.getAll().subscribe(res => {
      this.model.allSteps = res.result;
    })
  }

  private addSectionToTheList(section: SectionModel): void {
    const sectionWithItemsModel: SectionWithItemsModel = {
      ...section,
      items: []
    }
    this.model.allSteps.push(sectionWithItemsModel);
  }

  private getDeepCopy<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }

}
