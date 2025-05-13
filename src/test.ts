// This file has a deliberate error to test the extension
interface User {
  name: string;
  age: number;
}

function processUser(user: User) {
  console.log(user.name.toUpperCase()); // This will cause a TypeError if user is undefined
}

// Deliberately pass undefined to cause an error
processUser(undefined as any);
