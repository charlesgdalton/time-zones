## README

This is a Node.js program, so that's required to execute.

Also, to get dependencies run
```
$ npm install
```

To run, execute the following command in your terminal while in the range-count directory:
```
$ node app.js
```

This will start an express server @ localhost:3000. This can be queried at /time or with a timezone e.g. /time/America/Los_Angeles. The API will return a plaintext time based on the current time and optionally inputted timezone.
