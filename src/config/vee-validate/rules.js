import { defineRule } from "vee-validate"; 
import { required, email, min, max, confirmed, alpha_num, alpha_spaces, numeric, image } from "@vee-validate/rules"; 

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
defineRule("alpha_num", alpha_num);
defineRule("alpha_spaces", alpha_spaces);
defineRule("number", numeric);
defineRule("image", image);
defineRule("lowercase", (value) => {
    if (!value || !value.length) {
        return true;
    }
    const lowercaseLettersRegex = /[^a-z0-9]/g;
    if (!lowercaseLettersRegex.test(value)) {
    return true;
  } else {
    return false;
  }
});
  
defineRule("georgian", (value) => {
  if (!value || !value.length) {
      return true;
  }
  const georgianRegex = /^[ა-ჰ.,!?\s]*$/gi;
  if (georgianRegex.test(value)) {
  return true;
} else {
  return false;
}
});

