import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {

  private tooltip?: Tooltip;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.tooltip = new Tooltip(this.el.nativeElement)
  }

  ngOnDestroy(): void {
    this.tooltip?.dispose()
  }

}
