import { HighlightDirective } from './highlight.directive';
import { ElementRef } from '@angular/core';

describe('HighlightDirective', () => {
  let el: ElementRef;
  it('should create an instance', () => {
    const directive = new HighlightDirective(el);
    expect(directive).toBeTruthy();
  });
});
