import React from 'react';
import Page from '../../../Components/Page/Page';

class ExtensionIcons extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        title="Visual Studio and Visual Studio Code extension icons"
      >
        <h1>
          {'This is the extension icons page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default ExtensionIcons;
