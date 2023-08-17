import style from './ActionButton.module.css'
export interface ActionButtonProps {
  text : string
  onClick : () => void
}
export const ActionButton = ( props : ActionButtonProps ) => {
  return (
    <a className={ style.ActionButton } onClick={ props.onClick }>
      { props.text }
    </a>
  )
}
