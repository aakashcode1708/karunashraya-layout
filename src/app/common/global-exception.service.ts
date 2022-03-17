import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorDialogueComponent } from './error-dialogue/error-dialogue.component';

@Injectable()
export class GlobalExceptionService implements ErrorHandler {

  constructor(public dialog: MatDialog,
              private injector: Injector,
              private ngZone: NgZone) { }

  handleError(error: Error | HttpErrorResponse): void {
    console.log(error.message);
    console.log(error.toString());

    this.ngZone.run(() => {
      this.dialog.open(ErrorDialogueComponent,{
        data:{
          message: error.message,
        }
      });  
    });
    console.error(error);
  //throw new Error('Method not implemented.');
}
}
