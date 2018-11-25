import React from 'react';
import Page from '../../../Components/Page/Page';

class Internal extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        title="Internal brands"
      >
        <h1>
          {'This is the internal brands page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Internal;
