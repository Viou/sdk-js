import angular from 'angular';

import AvApiAngular from '@availity/api-angular';

import {AvAnalyticsProvider} from './analytics';

import {AvAnalyticsPluginFactory} from './plugin';
import {AvSplunkAnalyticsFactory} from './splunk';

// make sure AvAnalytics is instantiated.
function runBlock(AvAnalytics) {
  AvAnalytics.init();
}
runBlock.$inject = ['AvExceptions'];

export default angular
  .module('availity.analytics', [AvApiAngular])
  .provider('AvAnalytics', AvAnalyticsProvider)
  .factory('AvAnalyticsPlugin', AvAnalyticsPluginFactory)
  .factory('AvSplunkAnalytics', AvSplunkAnalyticsFactory)
  .run(runBlock)
  .name;
