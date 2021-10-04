<h1 align="center">Welcome to placeholder-img-generator 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.2.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/SimonLeclere/placeholder-img-generator#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/SimonLeclere/placeholder-img-generator/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/SimonLeclere/placeholder-img-generator/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/SimonLeclere/placeholder-img-generator" />
  </a>
</p>

A simple nodeJS module for creating placeholders images using canvas.

https://www.npmjs.com/package/placeholder-img-generator

## Install 

```sh
npm i placeholder-img-generator
```

## Usage

* ### braids(options)

Allows you to generate a placeholder made up of several ribbons that intersect with pretty shadows. Code adapted from [this article](http://rectangleworld.com/blog/archives/733)

Options : 
```js
{
  width: Number,
  height: Number,
  bgColor: String,
  crossingProbability: Number,
  stringThickness: Number
}
```

Example :
```js
const fs = require('fs')
const generator = require('placeholder-img-generator');

generator.braids().then((buffer) => {

    fs.writeFile(`./braids.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![Braids](examples%20images/braids.png)

* ### cellularAutomata(options)

Allows to generate a placeholder formed by a pattern of several squares of colors. Code adapted from [generativeartistry.com](https://generativeartistry.com/)

Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array,
}
```

Example : 
```js
const fs = require('fs')
const generator = require('placeholder-img-generator');

generator.cellularAutomata().then((buffer) => {

    fs.writeFile(`./cellularAutomata.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![cellularAutomata](examples%20images/cellularAutomata.png)

* ### circlePacking(options)

Generates a placeholder formed by a pattern of several circles. Code adapted from [generativeartistry.com](https://generativeartistry.com/)

Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array
}
```

Example : 
```js
const fs = require('fs')
const generator = require('placeholder-img-generator');

generator.circlePacking().then((buffer) => {

    fs.writeFile(`./circlePacking.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![circlePacking](examples%20images/circlePacking.png)

* ### color(options)

generates an image of a solid color drawn at random.
Options : 
```js
{
  width: Number,
  height: Number,
  color: String
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.color().then((buffer) => {

    fs.writeFile(`./color.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/color.png)

* ### cubicDisarray(options)

Generates a placeholder formed by several squares in disorder. Code adapted from [generativeartistry.com](https://generativeartistry.com/)
Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.cubicDisarray().then((buffer) => {

    fs.writeFile(`./cubicDisarray.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/cubicDisarray.png)

* ### gradient(options)

Generates a cool gradient placeholder

Options : 
```js
{
  width: Number,
  height: Number,
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.gradient().then((buffer) => {

    fs.writeFile(`./gradient.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/gradient.png)

* ### hypnoticSquares(options)

Generates a cool placeholder with hypnotic squares.

Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.hypnoticSquares().then((buffer) => {

    fs.writeFile(`./hypnoticSquares.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/hypnoticSquares.png)

* ### joyDivision(options)

Generates a placeholder composed of several small randomly generated waves. Code adapted from [generativeartistry.com](https://generativeartistry.com/)

Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.joyDivision().then((buffer) => {

    fs.writeFile(`./joyDivision.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/joyDivision.png)

* ### matrix(options)

Generates a placeholder composed of several green characters cascades as in the film matrix.
Options : 
```js
{
  width: Number,
  height: Number,
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.matrix().then((buffer) => {

    fs.writeFile(`./matrix.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/matrix.png)

* ### mondrian(options)

Generates a placeholder looking like Mondrian's works. Code adapted from [generativeartistry.com](https://generativeartistry.com/)
Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.mondrian().then((buffer) => {

    fs.writeFile(`./mondrian.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/mondrian.png)

* ### noise(options)

Generates an image filled with digital noise
Options : 
```js
{
  width: Number,
  height: Number,
  opacity: Number
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.noise().then((buffer) => {

    fs.writeFile(`./noise.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/noise.png)

* ### pollock(options)

Generates a placeholder looking like Pollock's work. Code inspired by [@curator_machine](https://twitter.com/curator_machine)

Options : 
```js
{
  width: Number,
  height: Number,
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.pollock().then((buffer) => {

    fs.writeFile(`./pollock.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/pollock.png)

* ### tiledLines(options)

Generates a placeholder composed of several lines forming a kind of random maze. Code adapted from [generativeartistry.com](https://generativeartistry.com/)
Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.tiledLines().then((buffer) => {

    fs.writeFile(`./tiledLines.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/tiledlines.png)

* ### triangularMesh(options)

Generates a placeholder composed of triangles that together form a patern. Code adapted from [generativeartistry.com](https://generativeartistry.com/)
Options : 
```js
{
  width: Number,
  height: Number,
  gap: Number,
  colors: Array
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.triangularMesh().then((buffer) => {

    fs.writeFile(`./triangularMesh.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/triangularMesh.png)

* ### unDeuxTrois(options)

Generates a placeholder composed of more or less organized lines. Code adapted from [generativeartistry.com](https://generativeartistry.com/)
Options : 
```js
{
  width: Number,
  height: Number,
  colors: Array
}
```

Example : 
```js
const generator = require('placeholder-img-generator');

generator.unDeuxTrois().then((buffer) => {

    fs.writeFile(`./unDeuxTrois.png`, buffer, () => {
        console.log('finished generating!')
    });

})
```

![color](examples%20images/unDeuxTrois.png)

## Author

👤 **Simon Leclere**

* Github: [@SimonLeclere](https://github.com/SimonLeclere)

## 🤝 Contributors

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/SimonLeclere/Quora-Data-Scraper/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Simon Leclere](https://github.com/SimonLeclere).<br />
This project is [MIT](https://github.com/SimonLeclere/placeholder-img-generator/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
