import 'normalize.css/normalize.css';
import { createRenderer } from 'fela';
import { Provider } from 'react-fela';
import React from 'react';
import { render } from 'react-dom';
import {
  CounterComponent,
  StyledCounter,
  Counter
} from '../../../src';

// initialize fela
const stylesheet = document.createElement('style');
document.head.appendChild(stylesheet);
const renderer = createRenderer();

render(
  <Provider renderer={renderer} mountNode={stylesheet}>
    <div>
      <p>This is the basic counter component. It has no logic or style.</p>
      <CounterComponent
        value={5}
        decrement={() => console.log('decrement')}
        increment={() => console.log('increment')}
        canDecrement={true}
        canIncrement={true}
      />
      <br/>

      <p>This is the styled counter. But still without logic.</p>
      <StyledCounter
        value={5}
        decrement={() => console.log('decrement')}
        increment={() => console.log('increment')}
        canDecrement={true}
        canIncrement={true}
      />
      <br/>

      <p>This is the final counter with logic.</p>
      <Counter/>
    </div>
  </Provider>,
  document.getElementById('app')
);
