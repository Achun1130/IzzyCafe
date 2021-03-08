import Vue from 'vue';
import {
  ValidationObserver, ValidationProvider, extend, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/zh_TW.json';

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
