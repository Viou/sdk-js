/* global jest, angular, inject, describe, beforeEach, test, expect */

import 'angular';
import 'angular-mocks';
import AvModule from './';

import {AvExceptions as AvExceptionsCore} from '@availity/exceptions-core';

const DEFAULT_REPEAT = (new AvExceptionsCore(jest.fn())).REPEAT_LIMIT;


describe('AvExceptions', () => {
  // let $q;
  let AvExceptions;

  beforeEach(() => {
    angular.mock.module(AvModule);
    inject( (_AvExceptions_) => {
      AvExceptions = _AvExceptions_;
    });
  });

  test('AvExceptions should be defined', () => {
    expect(AvExceptions).toBeDefined();
  });

});


describe('AvExceptionsProvider', () => {
  let provider;

  beforeEach(() => {
    angular.mock.module(AvModule, (AvExceptionsProvider) => {
      provider = AvExceptionsProvider;
    });
  });

  test('AvExceptionsProvider should be defined', () => {
    inject(() => {
      expect(provider).toBeDefined();
    });
  });

  test('enabled should return enabled value', () => {
    inject(() => {
      expect(provider.enabled()).toBe(provider.isEnabled);
    });
  });

  test('enabled should set enabled if value is passed in', () => {
    inject(() => {
      let testEnabled = false;
      let testExpect = false;
      expect(provider.enabled(testEnabled)).toBe(testExpect);
      testEnabled = 123;
      testExpect = true;
      expect(provider.enabled(testEnabled)).toBe(testExpect);
    });
  });

  test('appId should return appId value', () => {
    inject(() => {
      provider.thisAppId = 'test';
      expect(provider.appId()).toBe(provider.thisAppId);
    });
  });

  test('appId should set appId if value is passed in string or number', () => {
    inject(() => {
      const testAppId = 'test';
      provider.thisAppId = 'test';

      let testId = false;
      expect(provider.appId(testId)).toBe(testAppId);
      testId = 123;
      expect(provider.appId(testId)).toBe(testId);
      testId = 'world';
      expect(provider.appId(testId)).toBe(testId);
      const lastTest = { value: 'hello' };
      expect(provider.appId(lastTest)).toBe(testId);
    });
  });

  test('repeatTime should return the timer value', () => {
    inject(() => {
      const testExpect = 1000;
      provider.REPEAT_LIMIT = testExpect;
      expect(provider.repeatTime()).toBe(testExpect);
    });
  });

  test('repeatTime should set timer if number value is passed', () => {
    inject(() => {
      let testTime = 500;
      const testExpect = testTime;
      expect(provider.repeatTime(testTime)).toBe(testExpect);
      testTime = '1000';
      expect(provider.repeatTime(testTime)).toBe(testExpect);
    });
  });

  test('AvAnalytics appId, repeatTime and enabled should reflect provider', () => {
    inject((AvLogMessagesResource) => {
      let testEnabled = true;
      let testId = 'test1';

      provider.thisAppId = testId;
      provider.isEnabled = testEnabled;
      let testAnalytics = provider.$get(AvLogMessagesResource);
      expect(testAnalytics.isEnabled).toBe(testEnabled);
      expect(testAnalytics.thisAppId).toBe(testId);
      expect(testAnalytics.REPEAT_LIMIT).toBe(DEFAULT_REPEAT);

      testEnabled = false;
      testId = 'test2';
      const testRepeat = 200;
      provider.thisAppId = testId;
      provider.isEnabled = testEnabled;
      provider.REPEAT_LIMIT = testRepeat;
      testAnalytics = provider.$get(AvLogMessagesResource);
      expect(testAnalytics.isEnabled).toBe(testEnabled);
      expect(testAnalytics.thisAppId).toBe(testId);
      expect(testAnalytics.REPEAT_LIMIT).toBe(testRepeat);
    });
  });

  test('AvAnalytics log should call AvLogMessagesResource.error', () => {
    inject(() => {
      const mockLogMessage = {
        error: jest.fn()
      };
      const testAnalytics = provider.$get(mockLogMessage);
      const testMessage = 'hello world';
      testAnalytics.log(testMessage);
      expect(mockLogMessage.error).toHaveBeenCalledWith(testMessage);
    });
  });
});
