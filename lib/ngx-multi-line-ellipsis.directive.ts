import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[ngxEllipsis]'
})
export class NgxMultiLineEllipsisDirective implements AfterViewInit{

  @Input() lines: number;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
  }
}
