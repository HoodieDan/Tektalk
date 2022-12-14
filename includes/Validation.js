import {
  Form as VeeForm, Field as VeeField, defineRule,
  ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, email, alpha_spaces as alphaSpaces,
  min_value as minVal, max_value as maxVal, alpha_num as alphaNum,
  confirmed, not_one_of as excluded, between as between,
  // after as afters, before as befores,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('alpha_num', alphaNum);
    defineRule('passwords_mismatch', confirmed);
    defineRule('country_excluded', excluded);
    defineRule('between', between);
    // defineRule('after', afters);
    // defineRule('before', befores);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `This ${ctx.field} is too short.`,
          max: `This ${ctx.field} is too long.`,
          alpha_spaces: `Your ${ctx.field} may only contain alphabetical and numerical characters.`,
          email: `This ${ctx.field} must be a valid email.`,
          min_value: `Your ${ctx.field} is too low.`,
          max_value: `Your ${ctx.field} is too high.`,
          alpha_num: `Your ${ctx.field} may only contain alphabetical and numerical characters.`,
          passwords_mismatch: 'The passwords do not match.',
          country_excluded: 'Due to restrictions, we do not accept users from this location anymore.',
          tos: 'You must accept the terms of service before using this app.',
          // after: 'You cannot enter a time before startTime',
          // before: `You cannot enter a time before the ${ctx.rule.params}`,
          between: `You must enter a date between ${ctx.rule.params[0]} and ${ctx.rule.params[1]}`,
        };

        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid`;
        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
