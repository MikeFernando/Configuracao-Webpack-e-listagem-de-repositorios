// PADRÕES PARA CAMINHOS EM SISTEMAS OPERACIONAIS
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
   // PARA QUE EXECUTE O BUILD DO WEBPACK MAIS RÁPIDO
   mode: isDevelopment ? 'development' : 'production',

   // PARA MOSTRAR O ERROU EXATAMENTE IGUAL AO ARQUIVO
   devtool: isDevelopment ? 'eval-source-map' : 'source-map',

   // ARQUIVO PRINCIPAL DA APLICAÇÃO, O PRIMEIRO ARQUIVO A SER TRANSPILADO
   entry: path.resolve(__dirname, 'src', 'index.tsx'),

   // ONDE VAI SER GERADO O ARQUIVO TRANSPILADO, E O NOME DO ARQUIVO(bundle.js)
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   // EXTENSÕES QUE WEBPACK PODERÁ TRANSPILAR
   resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
   },
   devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      hot: true
   },
   // INJETAR O HTML DE FORMA AUTOMATICA, SEM PRECISAR IMPORTAR O ARQUIVO JS NO INDEX.HTML
   plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'public', 'index.html')
      })
   ].filter(Boolean),
   // TIPOS DE ARQUIVOS PARA SER LIDADOS(js, css, images)
   module: {
      rules: [
         {
            test: /\.(j|t)sx$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  plugins: [
                     isDevelopment && require.resolve('react-refresh/babel')
                  ].filter(Boolean)
               }
            },
         },
         {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         }
      ],
   }
}
