/**
 * @author - Shahbaz Shaikh
 * @description - Create a PasswordDirective for show and hide password.
 */
import { Directive, ElementRef } from '@angular/core';
// ------------------------------------------- //

@Directive({
  selector: '[imsPassword]'
})

export class PasswordDirective {
  /**
   * declaer varibale
   */
  private shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  /**
   * setup method are create a new i tag for password hide and show
   */
  public setup() {
    const parent = this.el.nativeElement.parentNode;
    const i = document.createElement('i');
    i.style.cssText = 'position: relative; top: -66px; left: 767px;';
    i.className = 'fa fa-eye-slash';
    i.addEventListener('click', (event) => {
      this.toggle(i);
    });
    parent.appendChild(i);
  }

  /**
   * toggele method are password hide and show symbole and text and password field
   * @param i - get html element
   */
  public toggle(i: HTMLElement) {
    this.shown = !this.shown;
    if (this.shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      i.className = 'fa fa-eye';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      i.className = 'fa fa-eye-slash';
    }
  }

}
