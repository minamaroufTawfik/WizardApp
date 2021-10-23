import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionItemModel } from '@wizard/shared/data-models';

@Component({
  selector: 'wizard-step-items',
  templateUrl: './step-items.component.html',
  styleUrls: ['./step-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepItemsComponent {
  @Input() items: SectionItemModel[] = [];
  @Output() deleteItem = new EventEmitter<number>();
  @Output() selected = new EventEmitter<SectionItemModel>();

  deleteItemClick(itemId: number): void {
    this.deleteItem.emit(itemId);
  }

  selectItem(item: SectionItemModel): void {
    this.selected.emit(item);
  }
}
