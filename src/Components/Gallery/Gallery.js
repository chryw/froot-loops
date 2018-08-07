import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Gallery.css';

class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentWillMount() {
    const { datasrc } = this.props;

    axios.get(datasrc)
      .then((response) => {
        this.setState({
          items: response.data,
        });
      });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="Gallery ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm10 ms-u-smPush1 ms-u-xl8 ms-u-xlPush2">
            <h1>
              {`items count: ${items.length}`}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  datasrc: PropTypes.string.isRequired,
};

export default Gallery;
