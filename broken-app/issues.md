# Broken App Issues

- Variable declaration: better to use "const" than "var" or "let" when requiring a module, and to be consistent

- Error handling: `catch` not given any parameters, `next` being used improperly

- Need to use express.json for JSON post request

- `return await axios.get()` is incorrect

- Callback for this route should be an async function, which will allow us to await the resolution of the Promise returned from axios when we attempt to retreive the requested data
