import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Echarts from './Echarts';

Enzyme.configure({ adapter: new Adapter() });

test('echarts should be render', () => {
  const wrapper = mount(
    <Echarts options={{ title: { text: 'HELLO WORLD' } }} />,
  );
  expect(wrapper.find('div').length).toEqual(1);
});
