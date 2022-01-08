const presets = ['next/babel'];
let plugins = [['module-resolver', { root: ['./src'] }]];

if (process.env['CY'] == 'true') {
  console.log('cypress build');
  plugins = [...plugins, 'istanbul'];
}

module.exports = { presets, plugins };
