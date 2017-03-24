import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'type-link',
  templateUrl: 'link.component.html',
  styleUrls: ['link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() type: string;
  @Input() isActive: boolean;
  @Output() changeFilterType: EventEmitter<string> = new EventEmitter();

  onLinkClick() {
    if(this.isActive) return;
    this.changeFilterType.emit(this.type);
  }
}
