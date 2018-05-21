# Ideal-Filename

**Gets the ideal filename according to the given one.**

## API

- `idealFilename(filename: string, extname:? string): Promise<string>`
    - `filename` The original filename.
    - `extname` Sets a specified extension name.
- `idealFilename(filename: string, callback: (err: Error, filename: string) => void): void;`
- `idealFilename(filename: string, extname: string, callback: (err: Error, filename: string) => void): void`

This function will check if the given filename already exists, if not, the 
given filename will be returned, otherwise increase the filename with a number 
appended to the basename (before extname).

It's better to always pass the `filename` an absolute path, and the separators
will always be converted to platform-specific ones.

## Example

```javascript
const idealFilename = require("ideal-filename");

idealFilename("index.js").then(filename => {
    console.log(filename); // => index (1).js
});

// Or
(async() => {
    var filename = await idealFilename("index.js");
    console.log(filename);
})();

// Or 
idealFilename("index.js", filename => {
    console.log(filename);
});
```