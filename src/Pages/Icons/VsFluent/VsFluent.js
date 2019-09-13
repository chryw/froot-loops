import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Page from '../../../Components/Page/Page';

class VsFluent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { figmaFileKey } = this.props;
    // GET request for remote image
    axios({
      method: 'get',
      headers: {
        'X-Figma-Token': process.env.REACT_APP_FIGMAKEY,
      },
      url: `https://api.figma.com/v1/files/${figmaFileKey}`,
    })
      .then((response) => {
        this.setState({
          data: response.data.document,
        });
      });
  }

  render() {
    const { data } = this.state;
    const pages = data.children;
    console.log(pages);
    return (
      <Page
        {...this.props}
      >
        <h1>
          {'This is the Visual Studio Fluent icons page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

VsFluent.propTypes = {
  figmaFileKey: PropTypes.string.isRequired,
};

export default VsFluent;
