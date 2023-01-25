import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputText } from '@nextbjj/form'

export default {
    title: 'Form/InputText',
    component: InputText,
} as ComponentMeta<typeof InputText>;

const Template: ComponentStory<typeof InputText> = (args) => <InputText />;

export const Default = Template.bind({});
