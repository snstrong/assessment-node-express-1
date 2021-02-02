# Broken App Issues

- Variable declaration: better to use "const" than "var" or "let" when requiring a module, and to be consistent; updated accordingly

- Need to use express.json for JSON post request; added it

- Made callback for the route itself an async function, which will allow us to successfully await the resolution of the Promise returned from axios when we attempt to retreive the requested data

- Error handling bugs: `catch` not given any parameters, `next` undefined

- Created ExpressError class (in separate file for the sake of modularity) and added error handlers to app, which also fixed the aforementioned error handling bugs

- Separated out the server logic into its own file to make the application more modular and scalable, and added a `console.log` to indicate when server is running

- Added documentation
