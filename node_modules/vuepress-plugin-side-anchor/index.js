const { resolve } = require('path')

module.exports = (option) => ({
    enhanceAppFiles: [
        resolve(__dirname, 'enhanceAppFile.js')
    ],

    globalUIComponents: 'SideAnchor'
});