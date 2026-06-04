import { Directive, ElementRef, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap'

@Directive({
  selector: '[appToast]'
})
export class ToastDirective implements OnInit {

  private toastInstance!: bootstrap.Toast;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.toastInstance = new bootstrap.Toast(this.el.nativeElement)
  }

  show() {
    this.toastInstance.show()
  }
}
