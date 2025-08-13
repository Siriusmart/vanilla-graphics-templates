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
> 3. Run `node pull` (You may need to run `npm install` before this.)
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
|[blank](./packages/blank)|0.1.0|08/13/25 - 15:19|Basic template|
|[chat](./packages/chat)|0.1.0|07/13/25 - 22:02|Helper methods for the in-game chat.|
|[command](./packages/command)|0.1.7|07/18/25 - 14:03|Declarative command registration.|
|[config](./packages/config)|0.1.4|07/18/25 - 22:29|Write on quit config.|
|[console](./packages/console)|0.1.2|07/15/25 - 21:28|Provides the console object.|
|[devtools](./packages/devtools)|0.1.10|07/19/25 - 12:25|Developer's best friend.|
|[dummy1](./packages/dummy1)|0.1.0|07/01/25 - 19:16|Dummy package.|
|[dummy2](./packages/dummy2)|0.1.0|07/01/25 - 19:16|Dummy package.|
|[extract-zip](./packages/extract-zip)|0.1.0|06/30/25 - 10:48|Extract zip file to directory.|
|[fabric-api-events](./packages/fabric-api-events)|0.1.2|07/15/25 - 21:28|Event listeners for Fabric API events|
|[fetch](./packages/fetch)|0.1.2|07/15/25 - 21:28|Provides the fetch API.|
|[fs](./packages/fs)|0.1.7|07/19/25 - 12:25|Provides the fs object.|
|[listener](./packages/listener)|0.1.4|07/20/25 - 22:54|Event listeners for JSCore.|
|[print-events](./packages/print-events)|0.1.0|07/13/25 - 15:36|Saves a JSON file of all available events.|
|[promise](./packages/promise)|0.1.0|06/30/25 - 10:48|Provides the promise object.|
|[pully](./packages/pully)|0.1.14|07/22/25 - 14:14|Package manager.|
|[require](./packages/require)|0.1.1|06/30/25 - 16:45|Provides the require function.|
|[rinode](./packages/rinode)|0.1.1|07/06/25 - 13:30|Node.js simulator for Rhino.|
|[text](./packages/text)|0.1.7|07/18/25 - 14:03|Helper methods for Text related things.|
|[timer](./packages/timer)|0.1.0|07/06/25 - 13:30|Provide the setTimeout and setInterval methods.|
|[toggle](./packages/toggle)|0.1.0|07/20/25 - 23:05|Create and use toggleable modules!|
|[translate](./packages/translate)|0.1.3|07/22/25 - 14:40|Adds a small button next to each message to translate that message with LibreTranslate.|
|[updater](./packages/updater)|0.1.5|07/20/25 - 18:20|Notify you when there is an update.|
|[yarn-extra](./packages/yarn-extra)|0.1.0|07/13/25 - 00:00|Yarn helper functions.|
<!--end:packages-->
