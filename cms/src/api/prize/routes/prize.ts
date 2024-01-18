/**
 * prize router
 */

import { factories } from '@strapi/strapi';
import { customRouter } from '../../../../utils';

export default factories.createCoreRouter('api::prize.prize');

/*const defaultRouter = factories.createCoreRouter('api::prize.prize');

const extraRoutes = [  
  {
    method: 'GET',
    path: '/all',
    handler: "prize",
    config: {
      auth: false,
    }
  }
];

module.exports = customRouter(defaultRouter, extraRoutes);*/