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

    // Get element font size to be able to measure max height
    const elementFontSize =
      parseInt(this.getCssproperty(this.el.nativeElement, 'font-size')
        .split('px')[0], 10);

    // Get element original text (will be replaced in future code lines)
    const elementOriginalText = this.el.nativeElement.innerHTML;

    // Init final ellipsis text variable
    let ellipsisTextLine = '';

    // Init inner html (original text) with an empty string
    this.el.nativeElement.innerHTML = '';

    // A flag veriable to indicate if current words num as reached
    // the required lines num (minus one)
    let hasReachedLimit = false;

    // A veriable that holds current height (top element)
    let currentElemetHeight = 0;

    // A veriable that holds last text that has only complete words in it'
    // to aviod white spaces breaks
    let completeWordsText = '';

    // Run on original text string
    for (let i = 0; i < elementOriginalText.length; i++) {

      // Get current (parent) element height
      currentElemetHeight =
        parseInt(this.getCssproperty(this.el.nativeElement, 'height')
          .split('px')[0], 10);

      // Checks if current height is smaller than
      // the max line number times font size (line height)
      if (currentElemetHeight < ((elementFontSize + 2) * this.lines) && 
          !hasReachedLimit) {

        // Save the current text as previos text
        const previosText = this.el.nativeElement.innerHTML;

        // If the current char is 'Space' then it saves the current text
        // as it has only complete words
        if (elementOriginalText.charAt(i) && 
            elementOriginalText.charAt(i) === '\u0020') {
          completeWordsText = this.el.nativeElement.innerHTML;
        }

        // Add current char to current text
        this.el.nativeElement.innerHTML =
          this.el.nativeElement.innerHTML + elementOriginalText.charAt(i);

        // Get the new current element height
        currentElemetHeight =
          parseInt(this.getCssproperty(this.el.nativeElement, 'height')
            .split('px')[0], 10);

        // Checks if current height is bigger or equal to
        // the max line number times font size (line height)
        if (currentElemetHeight >= ((elementFontSize + 2) * this.lines)) {

          // If the current char is 'Space' it gets
          // the previos text as the final text
          if (elementOriginalText.charAt(i) &&
              elementOriginalText.charAt(i) === '\u0020') {

            // Set previos text as the current element final text
            this.el.nativeElement.innerHTML = previosText;

            // Set the ellipsis text line with it's first char
            ellipsisTextLine = elementOriginalText.charAt(i);

          // Else if the current char is NOT 'Space' means there's a broken word
          } else {

            // Set the complete words text string as the element final text
            this.el.nativeElement.innerHTML = completeWordsText;

            // Get the previos text (to get the last word taht we didn't included)
            const previosTextSplitBySpaces = previosText.split(' ');

            // Set the ellipsis text line with it's first word and current char
            ellipsisTextLine =
              previosTextSplitBySpaces[previosTextSplitBySpaces.length - 1] +
              elementOriginalText.charAt(i);
          }

          // Set flag to true so now it'll start to fill ellipsis element
          hasReachedLimit = true;
        }

      // Finish to fill the top element
      } else {

        // If Next char is 'Space' then saves the current string
        // as complete words string
        if (elementOriginalText.charAt(i + 1) &&
            elementOriginalText.charAt(i + 1) ===
            '\u0020') {
          completeWordsText = this.el.nativeElement.innerHTML;
        }

        // Add current char to ellipsis text
        ellipsisTextLine = ellipsisTextLine + elementOriginalText.charAt(i);
      }
    }

    // Create new dive element
    const div = this.renderer.createElement('div');

    // Create new text line with the ellipsis text string
    const text = this.renderer.createText(ellipsisTextLine.trim());

    // Set all styles on the new element to get ellipsis behavior
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

    // Append the new ellipsis div to current elemnt (will appear below the upper text)
    this.renderer.appendChild(div, text);
    this.renderer.appendChild(this.el.nativeElement, div);
  }

  getCssproperty(element: Element, property: string) {
    return getComputedStyle(element, null).getPropertyValue(property);
  }
}
