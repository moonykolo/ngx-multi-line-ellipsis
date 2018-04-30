import { Directive, ElementRef, Input, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxEllipsis]'
})
export class NgxMultiLineEllipsisDirective implements AfterViewInit {

  @Input() lines: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    const elementWidth =
      parseInt(this.getCssproperty(this.el.nativeElement, 'width').split('px')[0], 10);

    const elementFontSize =
      parseInt(this.getCssproperty(this.el.nativeElement, 'font-size').split('px')[0], 10);

    const elementText = this.el.nativeElement.innerHTML;
    let ellipsisText = '';

    this.el.nativeElement.innerHTML = '';
    let hasReachedLimit = false;
    let currentElemetHeight = 0;
    let noBreakingWordsText = '';

    for (let i = 0; i < elementText.length; i++) {
      currentElemetHeight = parseInt(this.getCssproperty(this.el.nativeElement, 'height').split('px')[0], 10);
      if (currentElemetHeight < ((elementFontSize + 2) * this.lines) && !hasReachedLimit) {
        const previosText = this.el.nativeElement.innerHTML;

        if (elementText.charAt(i) && elementText.charAt(i) === '\u0020') {
          noBreakingWordsText = previosText;
        }

        this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML + elementText.charAt(i);

        currentElemetHeight = parseInt(this.getCssproperty(this.el.nativeElement, 'height').split('px')[0], 10);

        if (currentElemetHeight >= ((elementFontSize + 2) * this.lines)) {

          if (elementText.charAt(i) && elementText.charAt(i) === '\u0020') {
            this.el.nativeElement.innerHTML = previosText;
            ellipsisText = elementText.charAt(i);
          } else {
            this.el.nativeElement.innerHTML = noBreakingWordsText;
            const previosTextSplitBySpaces = previosText.split(' ');
            ellipsisText = previosTextSplitBySpaces[previosTextSplitBySpaces.length - 1] + elementText.charAt(i);
          }

          hasReachedLimit = true;
        }
      } else {
        if (elementText.charAt(i + 1) && elementText.charAt(i + 1) === '\u0020') {
          noBreakingWordsText = this.el.nativeElement.innerHTML;
        }
        ellipsisText = ellipsisText + elementText.charAt(i);
      }
    }

    const div = this.renderer.createElement('div');
    const text = this.renderer.createText(ellipsisText);

    this.renderer.setStyle(
      div,
      'overflow',
      'hidden'
    );

    this.renderer.setStyle(
      div,
      'white-space',
      'nowrap'
    );

    this.renderer.setStyle(
      div,
      'text-overflow',
      'ellipsis'
    );

    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.el.nativeElement, div);
  }

  getCssproperty(element: Element, property: string) {
    return getComputedStyle(element, null).getPropertyValue(property);
  }
}
