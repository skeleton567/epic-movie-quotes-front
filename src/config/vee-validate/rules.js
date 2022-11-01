import { defineRule } from "vee-validate"; 
import { required, email, min, max, confirmed, alpha_num, alpha, numeric } from "@vee-validate/rules"; 

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
defineRule("alpha_num", alpha_num);
defineRule("alpha", alpha);
defineRule("number", numeric);
defineRule("lowercase", (value) => {
    if (!value || !value.length) {
        return true;
    }
    const lowercaseLettersRegex = /[^a-z0-9]/g;
    if (!lowercaseLettersRegex.test(value)) {
    return true;
  } else {
    return "Only lowercase letters are allowed";
  }
  });

