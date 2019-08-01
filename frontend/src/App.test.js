import React from 'react';
import ReactDOM from 'react-dom';
import Website from './components/Website';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Website />, div);
  ReactDOM.unmountComponentAtNode(div);
});
