# Vanilla Graphics Template

## Adding Template

1. Include a template manifest in the template, all fields must be present.
```json
{
  "name": "blank",
  "version": "0.1.0",
  "description": "Basic template",
  "keywords": [],
  "license": "LGPL-3.0-or-later",
  "author": {
    "name": "Sirius",
    "email": "sirius@siri.ws",
    "url": "https://siri.ws"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/siriusmart/vg-template-blank"
  },
  "dependencies": []
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
|[basic](./packages/basic)|0.1.3|08/23/25 - 15:55|A simple template providing basic features.|
|[blank](./packages/blank)|0.1.3|08/23/25 - 16:21|Empty VG template.|
|[cs-latex](./packages/cs-latex)|0.1.1|08/23/25 - 17:47|Inspired by the IEEE Computer Society magazine.|
<!--end:packages-->
