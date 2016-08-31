const path = require('path')

module.exports = {
    module: {
        loaders: [{
            test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel'
        }, {
            test: /\.js$/,
            include: path.resolve(__dirname, 'node_modules/mapbox-gl/js/render/painter/use_program.js'),
            loader: 'transform/cacheable?brfs'
        }, {
            test: /\.css/,
            include: /node_modules/,
            loaders: ['style', 'css']
        }, {
            test: /\.css/,
            exclude: /node_modules/,
            loaders: [ 'style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
        }, {
            test: /\.(png|jpg|eot|woff|woff2|ttf)$/,
            loader: 'file'
        }, {
            test: /\.svg$/,
            loader: 'file'
        }, {
            test: /\.json$/,
            loader: 'json'
        }],
        postLoaders: [{
            include: /node_modules\/mapbox-gl/,
            loader: 'transform',
            query: 'brfs'
        }]
    },
    resolve: {
        root: [
            path.resolve('./client/src'),
            path.resolve('./node_modules')
        ],
        alias: {
            constants: 'constants',
            styles: 'styles',
            components: 'components',
            compose: 'compose',
            containers: 'containers',
            mapbox: 'mapbox',
            prismic: 'prismic',
            webworkify: 'webworkify-webpack',
            reducers: 'reducers',
            router: 'router',
            store: 'store',
            middleware: 'middleware',
            api: 'api',
            selectors: 'selectors',
            utils: 'utils',
        }
    },
    postcss: [
        require('postcss-import'),
        require('postcss-cssnext'),
        require('rucksack-css'),
    ]
}
