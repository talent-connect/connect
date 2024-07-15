import { render } from '@testing-library/react'

import SharedShadcnUiComponents from './shared-shadcn-ui-components'

describe('SharedShadcnUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedShadcnUiComponents />)
    expect(baseElement).toBeTruthy()
  })
})
