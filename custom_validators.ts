// Service

import { FormControl, Validators } from '@angular/forms';

// setup simple regex for white listed characters
const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {
  
  // create a static method for your validation
  static validateCharacters(control: FormControl) {
     
    // first check if the control has a value
    if (control.value && control.value.length > 0) {
       
      // match the control value against the regular expression
      const matches = control.value.match(validCharacters);
      
      // if there are matches return an object, else return null.
      return matches && matches.length ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }
}


// Component

import { CustomValidators } from './services/custom_validators'

this.signUpForm = this.form.group({
      name: ['', [Validators.required, CustomValidators.validateCharacters]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
