import React from 'react';
import Page from '../../../Components/Page/Page';

class Diagrams extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        title="Diagrams and infographics"
      >
        <h1>
          {'This is the Diagrams and infographics page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Diagrams;
