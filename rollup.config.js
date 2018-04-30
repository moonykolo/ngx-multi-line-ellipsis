import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'dist/index.js',
    output: {
        file: 'dist/bundles/ngx-multi-line-ellipsis.umd.js',
        globals: {
            '@angular/core': 'ng.core',
            'rxjs/Observable': 'Rx',
            'rxjs/ReplaySubject': 'Rx',
            'rxjs/add/operator/map': 'Rx.Observable.prototype',
            'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
            'rxjs/add/observable/fromEvent': 'Rx.Observable',
            'rxjs/add/observable/of': 'Rx.Observable'
        },
        format: 'umd',
        sourceMap: false,
        name: 'ngx.multi.line.ellipsis'
    },
    plugins: [
        resolve({
            modulesOnly: true
        })
    ]
}