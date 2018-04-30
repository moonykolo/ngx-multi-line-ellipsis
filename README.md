# ngx-multi-line-ellipsis

Angular directive for multi-line ellipsis 

## Getting Started

### Installing

Install the plugin with npm:
```shell
$ npm install --save ngx-multi-line-ellipsis
```

Add to your angular module:
```javascript
import { NgxMultiLineEllipsisModule } from "ngx-multi-line-ellipsis";

@NgModule({
    imports: [
        // ...
        NgxMultiLineEllipsisModule
    ],
    // ...
});
```
## Usage
```html
<!-- The text container div must have a width (via css class or any other way) -->
<div ngxEllipsis [lines]="2">
    Technology is nothing. What's important is that you have a faith in people, 
    that they're basically good and smart, and if you give them tools, 
    they'll do wonderful things with them.
</div>
```
Will become (depending on font size etc.):
```
Technology is nothing. What's
important is that you have a faith in...
```
The above div width is 250px

## Built With

* [Angular](https://angular.io/) - The framework we all love

## Contributing

[CONTRIBUTING.md]() will be added to project as soon as it exists
## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/moonykolo/ngx-multi-line-ellipsis/tags). 

## Authors

* **moony kolo** - *Initial work* - [moonykolo](https://github.com/moonykolo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details