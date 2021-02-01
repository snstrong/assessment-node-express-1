### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

  - Asynchronous code in JavaScript can be handled with Promises and async functions.

- What is a Promise?

  - A Promise is a JavaScript feature that enables an asynchronous flow of control. A Promise tells JS to expect some type of data, but to not wait until it arrives before going on to the next line. Promises can have three states: resolved, in which the expected data becomes available; pending, which means the program is still waiting on the data; and rejected, in which there is a failure to resolve the data.

- What are the differences between an async function and a regular function?

  - Regular functions in JavaScript are called synchronously at runtime, i.e., one after the other in the order they are called. Async functions disrupt that flow of control, so that the flow of control can move on to the next line of code while it "awaits" the async function rather than halting at the async function until it is finished. This can be useful for time-intensive operations like making HTTP requests.

- What is the difference between Node.js and Express.js?

  - Node.js is a JavaScript framework that enables server-side use of JavaScript, allowing us to write command-line scripts in JS. Express.js is framework built on top of Node.js that facilitates using Node.js to create an HTTP server, much like Flask or Django do for Python.

- What is the error-first callback pattern?

  - The error-first callback pattern prioritizes handling errors as a foundational part of writing code. It is commonly used in Node.js and simply means that edge cases that might throw an error are checked for in a function at the beginning, "short-circuiting" the code so that if there is an error, the rest of the code will not run and no futher resources will be used.

- What is middleware?

  - Middleware refers to code that is intended to run between a request being made and a response being sent. One common use of middleware is to log requests and errors to the console, e.g. the morgan library.

- What does the `next` function do?

  - `next` is a callback function that is called as the "next step" in certain situations, such as when an error is thrown.

- What does `RETURNING` do in SQL? When would you use it?

  - `RETURNING` is used to retreive a column of data from a SQL table after it has been modified, as by an `INSERT` or `DELETE` statement. You would use it anytime you need to use or examine just-modified data and do not want to make a query with `SELECT`.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```

- An async function will always return a Promise, so it will not return the array `[elie, matt, joel]` as a regular function would, but will instead return a Promise. To use the resolved data in this array, one would either need to chain a `.then` onto `getUsers()` or to call `getUsers` within another async function and await it. Also, this code assumes that `elie`, `joel`, and `matt` will all be retrieved without issue, when in fact one or all of these Promises could come back rejected rather than resolved. This is a situation where one might want to use `Promise.all` to wait for all of these Promises to resolve, along the lines of:

```js
async function getUsers(userArr) {
  let baseURL = "https://api.github.com/users";
  let promisedUsers = [];
  for (let user in userArr) {
    promisedUsers.push($.getJSON(`${baseURL}/${user}`));
  }
  let users = await Promise.all(promisedUsers);
  return users;
}
```

- This refactoring further optimizes the function by allowing any array of users to be passed in as an argument rather than hardcoding three particular users, making the function more broadly useful.
