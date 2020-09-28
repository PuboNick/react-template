import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileReader from './fileReader';

Enzyme.configure({ adapter: new Adapter() });

test('file reader should be render', () => {
  const wrapper = mount(<FileReader>hello world</FileReader>);
  expect(wrapper.find('button').length).toEqual(1);
});
