import { useState } from 'react'
import { ActionButton } from './ActionButton'
import styles from './Counter.module.css'

export const Counter = () => {
  const [ count, setCount ] = useState( 0 )
  const increaseCounter = () => setCount( count + 1 )
  const decreaseCounter = () => setCount( count - 1 )
  const classNames = [ styles.Counter ]
  if ( count < 0 ) {
    classNames.push( styles.negative )
  }
  if ( count > 0 ) {
    classNames.push( styles.positive )
  }
  return (
    <div className={ classNames.join( ' ' ) }>
      <ActionButton onClick={ decreaseCounter } text={ '-' } />
      <b>
        { count }
      </b>
      <ActionButton onClick={ increaseCounter } text={ '+' } />
    </div>
  )
}
