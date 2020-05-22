import React from 'react';

import './style.css';

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      this.props.onLoading(true);
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      if (this.props.onSelectItem) {
        setTimeout(() => {
          this.props.onSelectItem(selectedItem);
          this.props.onLoading(false);
        }, 4 * 1000);
      }

      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div className="wheel-container">
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={this.selectItem}
        >
          {items.map((item, index) => (
            <div
              className="wheel-item"
              key={index}
              style={{ '--item-nb': index }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
