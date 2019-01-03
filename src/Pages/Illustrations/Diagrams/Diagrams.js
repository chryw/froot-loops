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
        {...this.props}
      >
        <h1>
          {'This is the Diagrams and infographics page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Diagrams;
