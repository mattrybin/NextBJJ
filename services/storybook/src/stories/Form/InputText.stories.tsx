import { ComponentStory, ComponentMeta } from "@storybook/react"

import { InputText } from "@nextbjj/form"

export default {
  title: "Form/InputText",
  component: InputText,
} as ComponentMeta<typeof InputText>

const Template: ComponentStory<typeof InputText> = (args) => (
  <div>
    <InputText config={{ label: "Full Name", placeholder: "Your full name" }} />
    <InputText config={{ disabled: true, label: "Email", placeholder: "Your email address" }} />
    <InputText config={{ label: "Username", placeholder: "Your username" }} />
  </div>
)

export const Default = Template.bind({})
