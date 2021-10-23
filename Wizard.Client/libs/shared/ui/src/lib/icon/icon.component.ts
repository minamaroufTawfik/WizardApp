import { Component, Input } from '@angular/core';
import { IconLookup, IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

export type IconPerfixType =  'd' | 'b' | 'r' | 'l' | 's';

@Component({
  selector: 'wizard-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  @Input() spin = false;
  @Input() set icon(val: [IconName, IconPerfixType] | IconName | string[]) {
    if (Array.isArray(val)) {
      const [iconName, prfx] = val;
      this.src = [`fa${prfx}` as IconPrefix, iconName as IconName];
    } else {
      this.src = ['fas', val];
    }
  }
  src?: IconName | [IconPrefix, IconName] | IconLookup;
  @Input() cssClass = '';
}
