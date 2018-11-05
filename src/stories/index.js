import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';

import {
  SiteNav,
} from '../Components';

initializeIcons();

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('TextButton', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('EmojiButton', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        {'👍 Emoji Button'}
      </span>
    </Button>
  ));

storiesOf('Navigation', module)
  .add('SiteNav', () => <SiteNav />);
