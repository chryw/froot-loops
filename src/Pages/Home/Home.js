import React from 'react';
import Page from '../../Components/Page/Page';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Page
        title="Home"
      >
        <h1>
          {'This is the home page. Content TBD.'}
        </h1>
      </Page>
    );
  }
}

export default Home;
