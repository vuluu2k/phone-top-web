import { useEffect, useRef } from "react";


export const camelize = str => str.replace(/_([a-z])/g, childstr => childstr[1].toUpperCase());

export function converObjToCamelKeys(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if ('' + key !== camelize('' + key)) {
        obj[camelize('' + key)] = obj[key];
        delete obj[key];
      }
    }
  }
  return obj;
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}