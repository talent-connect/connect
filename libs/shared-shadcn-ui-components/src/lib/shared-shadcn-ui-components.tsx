import styles from './shared-shadcn-ui-components.module.scss'

/* eslint-disable-next-line */
export interface SharedShadcnUiComponentsProps {}

export function SharedShadcnUiComponents(props: SharedShadcnUiComponentsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedShadcnUiComponents!</h1>
    </div>
  )
}

export default SharedShadcnUiComponents
