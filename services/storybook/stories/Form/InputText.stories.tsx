// import { Meta } from "@storybook/react"

import { InputText } from "@nextbjj/form"

// const SimpleDiv = () => {
//   return <div>awesome</div>
// }

// export default {
//   title: "Form/InputText",
//   component: InputText,
// } as Meta<typeof InputText>

// export default { title: 'components/Button', component: SimpleDiv }
const normal = {
  title: "Component 1",
}

export default normal

export const Story1 = () => <InputText />

// const meta = {
//   title: 'Button',
//   component: SimpleDiv,
// };
// export default meta;

// export default {
//   render: () => <SimpleDiv />
// };
// const Template: ComponentStory<typeof InputText> = (args) => (
//   <div>
//     <InputText config={{ label: "Full Name", placeholder: "Your full name" }} />
//     <InputText config={{ error: true, label: "Email", placeholder: "Your email address" }} />
//     <InputText config={{ label: "Username", placeholder: "Your username" }} />
//   </div>
// )

// export const Default = Template.bind({})
