import { Story } from '@storybook/react'
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'

/** Creates a Storybook's stories factory for a component*/
export function storybookTemplate<TPropsType> (
  /** Component to be documented */
  Component: (props: TPropsType) => StoryFnReactReturnType | null,
) {
  return function (
    /** Properties of the React component */
    props: Partial<TPropsType>,
    /** React Nodes to be injected in the component's slot */
    Children?: React.ReactNode): Story<TPropsType> 
    {
    const template: Story<TPropsType> = (args) => {
      if (Children) return <Component {...args}>{ Children }</Component>
      return <Component {...args} />
    } 
    const story = template.bind({})
    story.args = props
    return story
  }
}
