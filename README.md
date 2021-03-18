[![Known Vulnerabilities](https://snyk.io/test/github/ReasonScore/core/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ReasonScore/core?targetFile=package.json)

# To have NPM Install and update work:
May need to remove the lines 

```
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ReasonScore/core.git"
  },
```
from package.json

AND
may need to chnage the name of .npmrc

To dpeloy the package to gihub you will need to set that all back.

TODO: Probably should reverse this process to be set for updates and not publishes