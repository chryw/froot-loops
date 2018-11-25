import React from 'react';
import Page from '../../../Components/Page/Page';

class VsCode extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        title="Visual Studio Code icons"
      >
        <h1>
          {'This is the Visual Studio Code icons page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default VsCode;
