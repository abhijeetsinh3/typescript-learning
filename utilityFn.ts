type Foo = {
  a: string;
  b: number;
  c: boolean;
};

//-------------- 1. implement Partial<T> -------------------
type MyPartial<T> = {
  [P in keyof T]?: T[P]; // The `?` modifier makes the property optional
};

//-------------- 2. implement Readonly<T> -------------------
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]; // The `readonly` modifier makes the property read-only
};

//-------------- 2. implement Required<T> -------------------
type MyRequired<T> = {
  [P in keyof T]-?: T[P]; // The `-?` modifier makes the property required
};

//-------------- 3. implement Record<K, T> -------------------
type myRecord<K extends keyof any, T> = {
  [P in K]: T; // Maps keys of type K to values of type T
};

// -------------- 4. implement Pick<T, K> -------------------
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
const vr: MyPick<Foo, "a"> = {
  a: "hello",
};

// -------------- 5. implement Omit<T, K> -------------------
type MyOmit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P];
};
const vr2: MyOmit<Foo, "b" | "c"> = {
  a: "hello",
};

// -------------- 6. implement Exclude<T, K> -------------------
// type MyExclude<T, K> = T extends K ? never : T;

// const vr3: MyExclude<Foo, "a"> = {
//   b: 0,
//   c: true,
// }; // "c" is also valid

// -------------- 7. implement Extract<T, K> -------------------
type MyExtract<T, K> = T extends K ? T : never;
const vr4: MyExtract<"a" | "b" | "c", "a"> = "a"; // "a" is valid, but "b" and "c" are not

// -------------- 8. implement NonNullable<T> -------------------
type MyNonNullable<T> = T extends null | undefined ? never : T;
const vr5: MyNonNullable<{ d: string }> = { d: "" }; // Valid, as it is not null or undefined

// -------------- 9. implement Parameters<T> -------------------
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type myFunc = (a: string, b: number, c: null) => string; // Example function type
const vr6: MyParameters<myFunc> = ["", 0, null]; // Valid, as it matches the function parameters

// -------------- 10. implement ConstructorParameters<T> -------------------
type MyConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

class MyClass {
  constructor(a: string, b: null) {} // Example constructor
}
const vr7: MyConstructorParameters<typeof MyClass> = ["", null]; // Valid, as it matches the constructor parameters

// -------------- 11. implement ReturnType<T> -------------------
type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

type myFunc2 = (a: string, b: string) => string; // Example function type
const vr8: MyReturnType<myFunc2> = ""; // Valid, as it matches the return type of the function

// -------------- 12. implement InstanceType<T> -------------------
type MyInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : never;

class MyClass2 {
  constructor(a: string) {
    return a;
  } // Example class with a constructor
}
const vr9: MyInstanceType<typeof MyClass2> = new MyClass2("AKR"); // Valid, as it matches the instance type of the class

// -------------- 13. implement ThisType<T> -------------------
type MyThisType<T> = {
  [P in keyof T]: T[P];
} & ThisType<T>; // Adds a `this` type to the object

const vr10: MyThisType<{ a: string }> = {
  a: "hello",
  // @ts-ignore
  this: { a: "asd" }, // This is a placeholder for the `this` type
};

// -------------- 14. implement OmitThisParameter<T> -------------------
type MyOmitThisParameter<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => infer R
  ? (...args: P) => R
  : never;

const vr11: MyOmitThisParameter<
  (this: { a: string }, b: number, c: boolean) => string
> = (b, c) => {
  return `${b} ${c}`;
}; // Valid, as it omits the `this` parameter

// -------------- 15. implement Uppercase<T> -------------------
type MyUppercase<T extends string> = T extends `${infer U}${Uppercase<string>}`
  ? `${Uppercase<string>}`
  : never;

const vr12: MyUppercase<"HE"> = "HE"; // Valid, as it converts the string to uppercase

// -------------- 16. implement Lowercase<T> -------------------

type MyLowercase<T extends string> = T extends `${infer U}${Lowercase<string>}`
  ? `${Lowercase<string>}`
  : never;
const vr13: MyLowercase<"he"> = "he"; // Valid, as it converts the string to lowercase

// -------------- 17. implement Capitalize<T> -------------------
type MyCapitalize<T extends string> = T extends `${Uppercase<infer U>}${string}`
  ? T
  : never;

const vr14: MyCapitalize<"He"> = "He";

// -------------- 18. implement MyFirstChar<T> -------------------
type MyFirstChar<T extends string> = T extends `${infer U}${string}`
  ? U
  : never;

const vr15: MyFirstChar<"closure"> = "c"; // valid as first letter is c and not null
