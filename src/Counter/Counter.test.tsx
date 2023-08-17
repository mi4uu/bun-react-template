import { afterEach, beforeEach, expect, test } from 'bun:test'
import { createRoot } from 'react-dom/client'

import { act } from 'react-dom/test-utils'

import assert from 'assert'
import { Counter } from './Counter'

let container : HTMLDivElement | null = null
beforeEach( () => {
  // setup a DOM element as a render target
  container = document.createElement( 'div' )
  document.body.appendChild( container )
} )

afterEach( () => {
  // cleanup on exiting
  if ( container ) {
    document.body.removeChild( container )
    container = null
  }
} )

test('Counter renders', () => {
  assert( container )
  act( () => {
    createRoot( container! ).render( <Counter /> )
  } )

  const counter = container.querySelector( '[data-testid="counter"]' )
  expect( counter?.innerHTML ).toBe( '<a>-</a><b>0</b><a>+</a>' )
})

test('Counter minus btn  works', () => {
  assert( container )
  act( () => {
    createRoot( container! ).render( <Counter /> )
  } )

  const counter = container.querySelector( '[data-testid="counter"]' )
  const minusBtn = container.querySelector( '[data-testid="counter"]>a' )
  expect( minusBtn?.innerHTML ).toBe( '-' )

  act( () => {
    minusBtn!.dispatchEvent( new MouseEvent( 'click', { bubbles: true } ) )
  } )
  expect( counter?.innerHTML ).toBe( '<a>-</a><b>-1</b><a>+</a>' )
  act( () => {
    minusBtn!.dispatchEvent( new MouseEvent( 'click', { bubbles: true } ) )
  } )
  act( () => {
    minusBtn!.dispatchEvent( new MouseEvent( 'click', { bubbles: true } ) )
  } )
  expect( counter?.innerHTML ).toBe( '<a>-</a><b>-3</b><a>+</a>' )
})

test('Counter plus btn works', () => {
  assert( container )
  act( () => {
    createRoot( container! ).render( <Counter /> )
  } )

  const counter = container.querySelector( '[data-testid="counter"]' )
  const plusBtn = counter?.lastChild

  expect( plusBtn?.textContent ).toBe( '+' )

  act( () => {
    plusBtn!.dispatchEvent( new MouseEvent( 'click', { bubbles: true } ) )
  } )
  expect( counter?.innerHTML ).toBe( '<a>-</a><b>1</b><a>+</a>' )
  act( () => {
    plusBtn!.dispatchEvent( new MouseEvent( 'click', { bubbles: true } ) )
  } )
  act( () => {
    plusBtn!.dispatchEvent( new MouseEvent( 'click', { bubbles: true } ) )
  } )
  expect( counter?.innerHTML ).toBe( '<a>-</a><b>3</b><a>+</a>' )
})
