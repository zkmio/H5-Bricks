/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import PageDesign from '../lib/lowcode/PageDesign';
import GlobalConfig from '../lib/mgrui/lib/components/wrapper/GlobalConfig';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => 
  <GlobalConfig notification>
    <PageDesign />
  </GlobalConfig>,
root!);
