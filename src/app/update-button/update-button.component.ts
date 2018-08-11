import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.sass']
})
export class UpdateButtonComponent implements OnDestroy {
   wasClicked: boolean = false;
   private timeoutId: number;

   onClick(e) {
       if (this.timeoutId) {
           e.stopPropagation();
           return;
       }
       this.wasClicked = true;
       this.timeoutId = window.setTimeout(() => {
           this.timeoutId = undefined;
           this.wasClicked = false;
       }, 800);
   }

   ngOnDestroy() {
    if (this.timeoutId !== undefined) {
        clearTimeout(this.timeoutId);
    }
   }
}
