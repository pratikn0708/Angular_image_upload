import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<ng-container><h1 (click)="click()">Hello {{name}}!</h1></ng-container>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit {
  @Input() name: string;
  ngOnInit() {
    console.log(this.name)
  }
  click() {
    console.log(this.name)
  }
}
