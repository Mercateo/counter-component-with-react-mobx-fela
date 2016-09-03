import React, { SFC, Component } from 'react';
import { connect } from 'react-fela';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

// note: it looks mobx-react needs react-dom here, so we need it as a dependency in our
// package.json even though we don't use it directly

// 1) basic counter which has no state and logic

export interface CounterComponentProps {
  value: number;
  increment: () => void;
  decrement: () => void;
  canDecrement: boolean;
  canIncrement: boolean;
  styles?: {
    decrementButton?: string;
    incrementButton?: string;
    valueContainer?: string;
  }
}

export const CounterComponent: SFC<CounterComponentProps> = ({ value, decrement, increment, styles, canDecrement, canIncrement }) =>
  <div>
    <button type="button"
            onClick={decrement}
            className={styles && styles.decrementButton}
            disabled={!canDecrement}>
      -1
    </button>
    <span className={styles && styles.valueContainer}>
      Value: {value}
    </span>
    <button type="button"
            onClick={increment}
            className={styles && styles.incrementButton}
            disabled={!canIncrement}>
      +1
    </button>
  </div>;

// 2) basic counter which is styled

const defaultStyle = {
  border: '1px solid #bbb',
  backgroundColor: '#eee',
  height: '25px',
  padding: '4px'
};

const enabledStyle = {
  borderColor: '#bbb',
  ':hover': {
    backgroundColor: '#bbb'
  }
};

const disabledStyle = {
  borderColor: 'red'
};

const decrementButton = (props: CounterComponentProps) => (Object.assign({}, defaultStyle, {
  borderBottomLeftRadius: '10px',
  borderTopLeftRadius: '10px'
}, props.canDecrement ? enabledStyle : disabledStyle));

const incrementButton = (props: CounterComponentProps) => (Object.assign({}, defaultStyle, {
  borderBottomRightRadius: '10px',
  borderTopRightRadius: '10px'
}, props.canIncrement ? enabledStyle : disabledStyle));

const valueContainer = props => (Object.assign({}, defaultStyle, {
  borderLeft: 'none',
  borderRight: 'none',
  display: 'inline-block',
  boxSizing: 'border-box'
}));

const counterStyles = props => ({ renderRule }) => ({
  decrementButton: renderRule(decrementButton, props),
  incrementButton: renderRule(incrementButton, props),
  valueContainer: renderRule(valueContainer, props)
});

export const StyledCounter: SFC<CounterComponentProps> = connect(counterStyles)(CounterComponent);

// 3) counter with state and logic

const MINIMUM = 0;
const MAXIMUM = 10;

@observer
export class Counter extends Component<{}, {}> {
  @observable value = 5;

  @computed get canDecrement() {
    return this.value !== MINIMUM;
  }

  @computed get canIncrement() {
    return this.value !== MAXIMUM;
  }

  decrement = () => {
    this.value -= 1;
  };

  increment = () => {
    this.value += 1;
  };

  render() {
    return (
      <StyledCounter
        value={this.value}
        decrement={this.decrement}
        increment={this.increment}
        canDecrement={this.canDecrement}
        canIncrement={this.canIncrement}
      />
    );
  }
}
