import { ElementRef, Renderer2, inject } from '@angular/core';

export function setupApplyClass(cssClass: string) {
  const renderer = inject(Renderer2);

  return {
    addClass: (element: ElementRef) => {
      renderer.addClass(element.nativeElement, cssClass);
    },
    removeClass: (element: ElementRef) => {
      renderer.removeClass(element.nativeElement, cssClass);
    },
  };
}
