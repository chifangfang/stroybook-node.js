import { configure } from '@storybook/react';

function loadStories() {
  // require('../app/index.js');
  require('../src/app/index.js')
  // You can require as many stories as you need.
}
configure(loadStories, module);


