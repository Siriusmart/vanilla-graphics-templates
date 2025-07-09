# JSCore OpenRepo

## Adding Packages

1. Include a package manifest in the package, all fields must be present.
```json
{
  "name": "extract-zip",
  "version": "0.1.0",
  "description": "Extract zip file to directory.",
  "keywords": [],
  "license": "LGPL-3.0-or-later",
  "author": {
    "name": "Sirius",
    "email": "sirius@siri.ws",
    "url": "https://siri.ws"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/fabriccore/extract-zip-js"
  },
  "dependencies": {
    "rinode": "0.1.0"
  }
}
```
2. Open an issue containing the link to your Git repo.

> ### Adding Packages (with your own hands)
> 
> 1. Git clone the repository.
> 2. Add an entry to seeds.json
> 3. Run `node pull.js` (You may need to run `npm install` before this.)
> 4. Push

## Resources

|Path|Description|
|---|---|
|/index.json|List of all packages on the repo.|
|/packages/packageName/package.json|Package manifest of the latest version.|
|/packages/packageName/versions.json|List of all available versions.|
|/packages/packageName/releases/version.zip|Release zip for that version.|
|/packages/packageName/releases/version.json|Manifest for that version.|

### All Packages

<!--begin:packages-->
|Package|Version|Updated|Description|
|---|---|---|---|
|[command](./packages/command)|0.1.4|07/07/25 - 22:11|Declarative command registration.|
|[console](./packages/console)|0.1.1|07/09/25 - 22:15|Provides the console object.|
|[devtools](./packages/devtools)|0.1.2|07/09/25 - 22:15|Developer's best friend.|
|[dummy1](./packages/dummy1)|0.1.0|07/01/25 - 19:16|Dummy package.|
|[dummy2](./packages/dummy2)|0.1.0|07/01/25 - 19:16|Dummy package.|
|[extract-zip](./packages/extract-zip)|0.1.0|06/30/25 - 10:48|Extract zip file to directory.|
|[fetch](./packages/fetch)|0.1.1|06/30/25 - 12:53|Provides the fetch API.|
|[fs](./packages/fs)|0.1.3|07/06/25 - 17:28|Provides the fs object.|
|[listener](./packages/listener)|0.0.1|07/06/25 - 17:28|Event listeners for JSCore.|
|[promise](./packages/promise)|0.1.0|06/30/25 - 10:48|Provides the promise object.|
|[pully](./packages/pully)|0.1.8|07/09/25 - 22:15|Package manager.|
|[require](./packages/require)|0.1.1|06/30/25 - 16:45|Provides the require function.|
|[rinode](./packages/rinode)|0.1.1|07/06/25 - 13:30|Node.js simulator for Rhino.|
|[timer](./packages/timer)|0.1.0|07/06/25 - 13:30|Provide the setTimeout and setInterval methods.|
<!--end:packages-->