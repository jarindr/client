/* eslint-disable jsx-a11y/no-autofocus */

import React from 'react';
import { func, string, shape } from 'prop-types';

import ButtonBar from '../ButtonBar';
import styles from './AddressBar.scss';

const historyShape = shape({
  push: func.isRequired
});
const locationShape = shape({
  pathname: string.isRequired
});
export default class AddressBar extends React.Component {
  static propTypes = {
    doQuery: func.isRequired,
    query: string,
    history: historyShape.isRequired,
    location: locationShape.isRequired
  }

  static defaultProps = {
    query: null
  }

  searchInput = React.createRef()

  componentDidUpdate(prevProps, _prevState) {
    if (this.props.query !== prevProps.query) {
      this.searchInput.current.value = this.props.query;
      this.props.doQuery(this.searchInput.current.value);
    }
  }

  render() {
    return (
      <form className={styles.addressBar} onSubmit={this.handleSubmitAddress}>
        <input
          type="text"
          placeholder="Search or enter address"
          ref={this.searchInput}
          defaultValue={this.props.query}
        />
        <ButtonBar />
      </form>
    );
  }

  handleSubmitAddress = (e) => {
    e.preventDefault();
    this.props.doQuery(this.searchInput.current.value);
    this.searchInput.current.blur();
    if (this.props.location.pathname !== '/browser') {
      this.props.history.push('/browser');
    }
  }
}
