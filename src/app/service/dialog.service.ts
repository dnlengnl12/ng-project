import {Injectable, OnInit, TemplateRef} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogFormComponent} from "../component/dialog-form";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnInit {
  constructor(
    protected _dialog: MatDialog
  ) {
  }

  form!: any;

  ngOnInit() {
  }

  setTitle(_data: []) {
    const title: string[] = [];

    for (const key in _data) {
      title[title.length] = key;
    }

    return title;
  }


  create({
           form = null,
           component = DialogFormComponent,
           target = null,
           onSubmit = null,
           serviceName = ''
         }: {
    form: any | null,
    component?: any | null,
    target?: any | null,
    onSubmit?: Function | null,
    serviceName?: string
  }) {
    if(!this.form) {
      this.form = form;
    }
    return this.open({component, target, onSubmit, serviceName});
  }

  update({
           form = null,
           component = DialogFormComponent,
           target = null,
           onSubmit = null,
    serviceName = ''
         }: {
    form: any | null,
    component?: any | null,
    target?: any | null,
    onSubmit?: Function | null,
    serviceName?: string
  }) {
    if(!this.form) {
      this.form = form;
    }

    return this.open({component, target, onSubmit, serviceName});
  }

  delete() {

  }

  setForm() {
    const {form} = this;
    if (!form) {
      return;
    }

    return form;
  }

  open({
         component = DialogFormComponent,
         target = null,
         onSubmit = null,
         serviceName = ''
       }: {
    component?: any | null,
    target?: any | null,
    onSubmit?: Function | null,
    serviceName?: string
  }) {
    const _data = {
      target,
      serviceName,
      onSubmit
    }
    return this._dialog.open(
      component,
      {
        data: _data,
        /*?
          {
            form,
            onSubmit
          } :
          {
            form,
            onSubmit
          }*/
      }
    );
  }
}
