# Copywriter

## Installation

Locally

```
$ cd [repository root] && npm install --save-dev git@github.com:tonysickpony/copywriter.git
```

Globally

```
$ npm install --global git@github.com:tonysickpony/copywriter.git
```

## Command line API

Locally

```
$ cd [repository root] && ./node_modules/.bin/copywriter -f /path/to/your/config/file.json
```

Globally

```
$ copywriter -f /path/to/your/config/file.json
```

## Configuration file

see [example config](/sampleconfig.json.dist)

```json
{
    "vars": {
        "key": "value",
        "key2": "value2"
    },
    "mappings": {
        "inputFile1": "outputFile1",
        "inputFile2": "outputFile2",
        "inputDir": "outputDir"
    },
    "options": {
        "templateExtensions": [
            "tmp",
            "otherTemplateFileFormat"
        ]
    }
}
```

## Precedence

Latter entries will overide former entries. Files will always overide directories.

For example the configuration below:

```json
{
    "vars": {
        "key": "value"
    },
    "mappings": {
        "inputDir": "outputDir",
        "inputDir/subDir": "outputDir2",
        "inputDir/a.tmp": "file.ext"
    },
    "options": {
        "templateExtensions": [
            "tmp"
        ]
    }
}
```

with a file system structured like this:

```
└── inputDir
    ├── a.tmp
    ├── b.tmp
    └── subDir
        └── c.tmp

```

will generate file system structured like this:

```
├── file.ext
├── outputDir
│   └── b
└── outputDir2
    └── c
```



## Interpolate variables

The templating uses lodash's `_.template()` function. Template delimiter we choose is handle bar/mustache style `{{ variable }}` and this is hardcoded for the moment.

So the template file may look like:

```yaml
my keys:
    - {{ key }}
    - {{ key2 }}
```

## Uninstallation

Locally

```
$ cd [repository root] && npm rm --save-dev copywriter
```

Globally

```
$ npm rm --global copywriter
```

## Development

Prerequisite

* [nodejs](https://nodejs.org/en/) 4.X or later
* [yarn](https://yarnpkg.com/) package manager(optional)

Download repository

```
$ git clone git://git@bitbucket.org:gorapid/rapid-template.git && cd rapid-template
```

Install dependencies

```
$ npm install
```

Or if you have yarn installed

```
$ yarn install
```

Run tests. We choose [ava](https://github.com/avajs/ava) as our test suite

```
$ npm test
```

Test coverage. We choose [nyc](https://github.com/istanbuljs/nyc) as our test coverage tool

```
$ npm run coverage
```

Code style linting. We choose [js standard](http://standardjs.com/rules.html) as our code standard and linting tool

```
$ npm run lint
```

## Bugs and feature requests
