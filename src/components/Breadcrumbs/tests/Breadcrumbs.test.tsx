import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from '../../../../tests/utilities';
import {CallbackAction, LinkAction} from '../../../types';
import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  describe('url', () => {
    it('is using <a> tags when passed a LinkAction', () => {
      const linkBreadcrumbs: LinkAction[] = [
        {
          content: 'Products',
          url: 'https://www.google.com',
          target: 'new',
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={linkBreadcrumbs} />,
      );

      expect(breadcrumbs.find('a')).toHaveLength(1);
    });
  });

  describe('onAction()', () => {
    it('is using <button> tags when passed a CallbackAction', () => {
      const callbackBreadcrumbs: CallbackAction[] = [
        {
          content: 'Products',
          onAction: noop,
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={callbackBreadcrumbs} />,
      );

      expect(breadcrumbs.find('button')).toHaveLength(1);
    });

    it('is calling the correct function when clicked', () => {
      const spy = jest.fn();
      const callbackBreadcrumbs: CallbackAction[] = [
        {
          content: 'Products',
          onAction: spy(),
        },
      ];

      const breadcrumbs = mountWithAppProvider(
        <Breadcrumbs breadcrumbs={callbackBreadcrumbs} />,
      );

      breadcrumbs.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
