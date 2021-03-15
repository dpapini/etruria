import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';


@Component({
   // tslint:disable-next-line: component-selector
   selector: 'select-btn-cell-renderer',
   template: `
   <button class="btn btn-sm btn-light" type="button"
      title="Seleziona" style="border:1px sold black;" (click)="btnClickedHandler($event)">
      <fa-icon [icon]="['far', 'edit']"></fa-icon>
   </button>
  `,
})
// tslint:disable-next-line: component-class-suffix
export class AgGridSelectBtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
   private params: any;

   refresh(params: any): boolean {
      return true;
   }
   afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
   }

   agInit(params: any): void {
      this.params = params;
   }

   btnClickedHandler(e: any) {
      // console.log('btnClickedHandler', e, this.params);
      if (this.params.onClick instanceof Function) {
         // put anything into params u want pass into parents component
         const params = {
            event: e,
            rowData: this.params.node.data
         };
         // console.log('p', params);
         this.params.onClick(params);
      }
   }

   ngOnDestroy() {
      // no need to remove the button click handler 
      // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
   }
}