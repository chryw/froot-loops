import React from 'react';
import Page from '../../../Components/Page/Page';

class Partners extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        {...this.props}
      >
        <h1>
          {'This is the 3rd party partner brands page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Partners;
