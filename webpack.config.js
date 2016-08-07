module.exports = {
    entry: './src/lib/main.js',
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    loaders:
    [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015']
            }
        }
    ]
};