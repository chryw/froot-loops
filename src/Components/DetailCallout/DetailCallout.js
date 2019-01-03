import React from 'react';
import PropTypes from 'prop-types';
import {
  Callout,
} from 'office-ui-fabric-react/lib/index';
import './DetailCallout.css';

class DetailCallout extends React.Component {
  constructor() {
    super();
    // TODO: use Redux to better handle states
    this.state = {
      isVisible: false,
    };

    this.onDismiss = () => {
      this.setState({
        isVisible: false,
      });
    };
  }

  componentDidMount() {
    const {
      isVisible,
    } = this.props;

    this.setState({
      isVisible,
    });
  }

  componentWillUnmount() {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const {
      item,
      itemProps,
      target,
      className,
    } = this.props;

    const {
      isVisible,
    } = this.state;

    return (
      <Callout
        className={`DetailCallout ${className}`}
        gapSpace={0}
        target={target}
        role="tooltip"
        calloutWidth={250}
        hidden={!isVisible}
        onDismiss={this.onDismiss}
      >
        <h4 className="DetailCallout-header">
          {item.name}
        </h4>
        <div>
          {
            itemProps
              .filter(prop => prop.key !== 'name')
              .map(prop => (
                <div
                  key={`${item.key}-prop-${prop.key}`}
                >
                  <h4>
                    {prop.name}
                  </h4>
                  <p>
                    {item[prop.key]}
                  </p>
                </div>
              ))
          }
        </div>
      </Callout>
    );
  }
}

DetailCallout.propTypes = {
  item: PropTypes.object.isRequired,
  itemProps: PropTypes.array,
  target: PropTypes.object,
  className: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
};

DetailCallout.defaultProps = {
  itemProps: [
    {
      name: 'Name',
    },
  ],
  className: '',
  target: null,
};

export default DetailCallout;
