import React from 'react';
import PropTypes from 'prop-types';
import {
  Callout,
  DefaultButton,
  Image,
  ImageFit,
  Link,
  TooltipHost,
} from 'office-ui-fabric-react/lib/index';
import './GridItem.css';

class GridItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isCalloutVisible: false,
    };
    this.elementRef = React.createRef();
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onCalloutDismiss = this.onCalloutDismiss.bind(this);
  }

  onContextMenu(e) {
    const { isCalloutVisible } = this.state;
    this.setState({
      isCalloutVisible: !isCalloutVisible,
    });
    e.preventDefault();
  }

  onCalloutDismiss() {
    this.setState({
      isCalloutVisible: false,
    });
  }

  render() {
    const {
      id,
      name,
      width,
      height,
      onClick,
      urlprefix,
    } = this.props;
    const {
      isCalloutVisible,
    } = this.state;
    return (
      <div ref={this.elementRef}>
        <TooltipHost
          content={name}
          calloutProps={{ gapSpace: 0 }}
        >
          <DefaultButton
            className="GridItem"
            onClick={onClick}
            onKeyDown={onClick}
            onContextMenu={this.onContextMenu}
            type="button"
            id={`GridItem_${id}`}
            style={{
              width,
              height,
            }}
          >
            <div className="GridItem-image">
              <Image
                src={`${urlprefix}/${name}.svg`}
                alt={name}
                imageFit={ImageFit.fill}
                width="100%"
                height="100%"
              />
            </div>
            <Callout
              target={this.elementRef.current}
              className="GridItem-menu ms-ContextualMenu"
              gapSpace={0}
              hidden={!isCalloutVisible}
              onDismiss={this.onCalloutDismiss}
              setInitialFocus
            >
              <ul className="ms-ContextualMenu-list">
                <li className="ms-ContextualMenu-item">
                  <Link href={`${urlprefix}/${name}.svg`} download>
                    {'Download SVG'}
                  </Link>
                </li>
                <li className="ms-ContextualMenu-item">
                  <Link href={`${urlprefix}/${name}.png`} download>
                    {'Download PNG'}
                  </Link>
                </li>
              </ul>
            </Callout>
          </DefaultButton>
        </TooltipHost>
      </div>
    );
  }
}

GridItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  urlprefix: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

GridItem.defaultProps = {
  width: 100,
  height: 100,
  urlprefix: 'https://via.placeholder.com/500/dadada/000000',
};

export default GridItem;
