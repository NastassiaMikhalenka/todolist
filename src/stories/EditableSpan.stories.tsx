import React from 'react';
import {ComponentStory, Meta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callback: {
      description: 'value changed',
    },
    title: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan',
    }
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
  callback: action('Value EditableSpan changed'),
};