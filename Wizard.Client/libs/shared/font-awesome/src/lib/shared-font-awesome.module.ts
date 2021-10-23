import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import {
  faSignOutAlt as fasSignOutAlt,
  faSpinner as  fasSpinner,
  faMinus as fasMinus
} from '@fortawesome/free-solid-svg-icons';


const fonts = [fasSignOutAlt, fasSpinner, fasMinus];

@NgModule({
  exports: [FontAwesomeModule]
})
export class SharedFontAwesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(...fonts);
  }
}
