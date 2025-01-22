/**
* Iteratively calculate the sum of the integer series
* from 1 to n.
*/
function iterativeSumSeries(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

/**
* Recursively calculate the sum of the integer series
* from 1 to n.
*/
function recursiveSumSeries(n) {
  if (n === 1) {
    return n;
  }

  return n + recursiveSumSeries(n - 1);
}

/**
* Iteratively sum the first n powers of 2.
*/
function iterativeSumPowersOf2(n) {
  let j = k = 2;

  while (n > 1) {
    j *= 2; 
    k += j;
    n -= 1; 
  }

  return k;
}

/**
* Recursively sum the first n powers of 2.
*/
function recursiveSumPowersOf2(n) {
  if (n <= 1) {
    return 2;
  }

  return (2 * recursiveSumPowersOf2(n - 1)) + (1 * recursiveSumPowersOf2(n - 2));
}

/**
* Iteratively reverse a string.
*/
function iterativeReverseString(string) {
  let reversed = '';

  for (let i = string.lenght - 1; i > 0; i--) {
    reversed += string[i];
  }

  return reversed;
}

/**
* Recursively reverse a string.
*/
function recursiveReverseString(string) {
  if (string.length === 1) {
    return string;
  }

  const head = string[0];
  const rest = string.slice(1);

  return recursiveReverseString(rest) + head;
}

/**
* Iteratively check if a given string is a palindrome.
*/
function iterativeIsPalindrome(string) {
  let isPalindrome = true;
  let i = 0;
  let j = string.length - 1;

  while (isPalindrome && i <= j) {
    isPalindrome = string[i] === string[j];
    i++;
    j--;
  }

  return isPalindrome;
}

/**
* Recursively check if a given string is a palindrome.
*
*
* Example:
  recursiveIsPalindrome('foobar');
  head = f
  mid = ooba
  tail = r
  -------------------------------
  recursiveIsPalindrome('ooba');
  head = o
  mid = ob
  tail = a
  -------------------------------
  recursiveIsPalindrome('ob');
  head = o
  mid = b
  tail = b
  ------------------------------
  recursiveIsPalindrome('b');
  rightaway return true.
*/
function recursiveIsPalindrome(string) {
  if (string.length <= 1) {
    return true;
  }

  const head = string[0];
  const mid = string.slice(1, string.length - 1);
  const tail = string[string.length - 1];

  return head === tail && recursiveIsPalindrome(mid);
}

// TODO
function recursiveBinarySearch(array, value, left = 0, right = array.length - 1) {
  if (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (value === array[mid]) {
      return mid;
    }
    if (value < array[mid]) {
      right = mid - 1;
      return recursiveBinarySearch(array, value, left, right);
    }
    if (value > array[mid]) {
      left = mid + 1;
      return recursiveBinarySearch(array, value, left, right);
    }
  }
}

function imperativeBinarySearch(array, value) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (array[mid] === value) {
      return mid;
    }
    if (value > array[mid]) {
      left = mid + 1;
    }
    else {
      right = mid - 1;
    }
  }
  return -1;
}

// TODO
function mergeSort(array, left = 0, right = array.length - 1) {
  if (left <= right) {
    mid = Math.floor((left + right) / 2);
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(array, left, mid, right);
  }
}

function merge(array, left, mid, right) {
  const tmp = [];
  let i = left, j = mid, k = 0;

  while (i <=  mid && j <= right) {
    if (i <= j) {
      tmp[k] = array[i];
      i++; k++;
    }
    else {
      tmp[k] = array[j];
      j++; k++;
    }
  }

  while (i <= mid) {
    tmp[k] = i;
    i++; k++;
  }

  while (j <= right) {
    tmp[k] = j;
    j++; k++;
  }
}

function getValueByKey(any, key) {
  if (Array.isArray(any)) {
    for (let i = 0; i < any.length; i++) {
      const result = getValueByKey(any[i], key);
      if (result !== undefined) return result;
    }
  }

  if (typeof any === "object" && any !== null) {
    for (const k in any) {
      const result = getValueByKey(any[k], key);
      if (result !== undefined) return result;
    }
  }

  if (any.hasOwnProperty(key)) {
    return any[key];
  }

  return undefined;
}

function containsKey(any, key) {
  if (Array.isArray(any)) {
    for (let i = 0; i < any.length; i++) {
      if (containsKey(any[i], key)) {
        return true;
      }
    }
  }

  if (typeof any === "object" && any !== null) {
    for (const k in any) {
      if (containsKey(any[k], key)) {
        return true;
      }
    }
  }

  if (any.hasOwnProperty(key)) {
    return true;
  }

  return false;
}

function containsValue(any, value) {
  function arraysEqual(arr, value) {
    if (arr.length !== value.length) return false;
    for (let i = 0; i < arr.length; i++) {
      if (!isEqual(arr[i], value[i])) return false;
    }
    return true;
  }

  function isEqual(any, value) {
    if (typeof any !== typeof value) return false;
    if (typeof any !== "object") return any === value;
    if (Array.isArray(any) && Array.isArray(value)) {
      return arraysEqual(any, value);
    }
  }

  if (isEqual(any, value)) {
    return true;
  }

  if (typeof any !== "object" || any === null) {
    return false;
  }

  for (const key in any) {
    if (containsValue(any[key], value)) {
      return true;
    }
  }

  return false;
}

const result = getValueByKey(
  [
    {
      data: [
        {
          foo: "foo"
        },
        {
          bar: "bar"
        },
        {
          fizz: "fizz"
        },
        {
          name: "buzz"
        }
      ]
    }
  ],
  "name"
);

console.log(result);
