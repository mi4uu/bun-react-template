import { Counter } from './Counter/Counter'

export const App = () => {
  return (
    <div className='App' role='main'>
      <article className='App-article'>
        <img src={ '/bunlogo.svg' } className='App-logo' alt='logo' />
        <div className={ 'br0' }>
        </div>
        <h3>
          Welcome to Bun!
        </h3>
        <div className={ 'br1' }>
        </div>
        <a className='App-link' href='https://bun.sh/docs' target='_blank' rel='noopener noreferrer'>
          Read the docs →
        </a>
        <Counter />
      </article>
    </div>
  )
}
