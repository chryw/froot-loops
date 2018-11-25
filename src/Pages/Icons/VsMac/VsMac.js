import React from 'react';
import Page from '../../../Components/Page/Page';

class VsMac extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        title="Visual Studio for Mac icons"
      >
        <h1>
          {'This is the Visual Studio for Mac icons page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default VsMac;
