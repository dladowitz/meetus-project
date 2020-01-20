export function textPresent(text){
  console.log("text: ", text);
  if (text.trim().length >= 1) {
    return true;
  } else {
    return false;
  }
}

export function onePresent(text){
  console.log("text: ", text);
  return text.includes("1")
}

export function minimumLength(text, minimum){
  console.log("text.trim.length: ", text.trim().length);
  console.log("minimum ", minimum);
  const result = text.trim().length >= minimum
  console.log("result: ", result)
  return result
}

export function validEmail(text) {
  return text.includes(".com")
}
