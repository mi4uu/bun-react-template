import { Counter } from './Counter/Counter'
import style from './App.module.css'
export const App = () => {
  return (
    <div className={style.App} role='main'>
      <article className={style.AppArticle}>
        <img src={ '/bunlogo.svg' } className={style.AppLogo} alt='logo' />
        <div className={ style.br0 }/>
        <h3>
          Welcome to Bun!
        </h3>
        <div className={ style.br1 }>
        </div>
        <a className={style.AppLink} href='https://bun.sh/docs' target='_blank' rel='noopener noreferrer'>
          Read the docs →
        </a>
        <Counter />
      </article>
    </div>
  )
}
