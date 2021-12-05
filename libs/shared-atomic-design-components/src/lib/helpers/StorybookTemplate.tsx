import { Story } from '@storybook/react'
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'

export const storybookTemplate =
  <TPropsType,>(
    Component: (props: TPropsType) => StoryFnReactReturnType | null
  ) =>
  (props: Partial<TPropsType>): Story<TPropsType> => {
    const template: Story<TPropsType> = (args) => {
      return <Component {...args} />
    }
    const story = template.bind({})
    story.args = props
    return story
  }
