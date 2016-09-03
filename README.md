# counter-component

This component was created with [React](https://github.com/facebook/react), [MobX](https://github.com/mobxjs/mobx) and [Fela](http://fela.js.org/). It is just an example to show how these three frameworks can be used to create components with isolated styling and easy state handling.

To see the component in action you'll want to look into the included [example](examples/usage).

The counter has a specific `value` which can be incremented and decremented. The increment and decrement buttons will be deactivated, if a certain threshold is reached (`value = 0` or `value = 10`). The style will be updated accordingly.
