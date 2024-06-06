/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import PageDesign from '../lib/lowcode/PageDesign';
import GlobalConfig from '../lib/mgrui/lib/components/wrapper/GlobalConfig';
import initI18n from './i18n/config';
import { t } from 'i18next';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

initI18n('en');

render(() => 
  <GlobalConfig notification backdrop i18n={(key) => t(key)}>
    <PageDesign />
  </GlobalConfig>,
root!);
