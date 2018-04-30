import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[ngxEllipsis]'
})
export class NgxMultiLineEllipsisDirective implements AfterViewInit{

  @Input() lines: number;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    const elementWidth = this.getCssproperty(this.el.nativeElement, 'width');
    const elementFontSize = this.getCssproperty(this.el.nativeElement, 'font-size');
    const elementText = this.el.nativeElement.innerHTML;

    for (let i = 0; i < elementText.length; i++) {
      console.log(elementText.charAt(i));
    }

  }

  getCssproperty(element: Element, property: string) {
    return getComputedStyle(element, null).getPropertyValue(property);
  }
}
