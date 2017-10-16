/* global jest, describe, beforeEach, test, expect */

import {AvLogMessages} from '../index';
import {API_OPTIONS} from '../defaultOptions';

const defaultOptions = Object.assign({}, API_OPTIONS, {
  name: 'log-messages'
});

const mockHttp = jest.fn(() => {
  return Promise.resolve({});
});

describe('AvLogMessages', () => {
  let TestLogMessage;

  test('AvLogMessages should be defined', () => {
    TestLogMessage = new AvLogMessages(mockHttp, Promise, {});
    expect(TestLogMessage).toBeDefined();
  });

  test('AvLogMessages should merge its config with passed in config', () => {
    TestLogMessage = new AvLogMessages(mockHttp, Promise, {});
    expect(TestLogMessage.defaultConfig).toEqual(defaultOptions);

    const testConfig = { name: 'testName' };
    const testExpect = Object.assign({}, defaultOptions, testConfig);
    TestLogMessage = new AvLogMessages(mockHttp, Promise, testConfig);
    expect(TestLogMessage.defaultConfig).toEqual(testExpect);
  });

  test('requestPayload should return {level, entries}', () => {
    TestLogMessage = new AvLogMessages(mockHttp, Promise, {});
    const level = 'testLevel';
    const entries = 'testEntries';
    expect(TestLogMessage.requestPayload(level, entries)).toEqual({level, entries});
  });
  test('requestPayload should delete entries.level', () => {
    TestLogMessage = new AvLogMessages(mockHttp, Promise, {});
    const level = 'testLevel';
    const entries = {
      value: 'testEntries'
    };
    const expectedResult = Object.assign({}, {level, entries});
    entries.level = 'testEntriesLevel';
    expect(TestLogMessage.requestPayload(level, entries)).toEqual(expectedResult);
  });

  describe('log levels', () => {
    const testEntries = 'testEntry';
    beforeEach(() => {
      TestLogMessage = new AvLogMessages(mockHttp, Promise, {});
      TestLogMessage.requestPayload = jest.fn();
      TestLogMessage.create = jest.fn();
    });

    test('debug should create with level \'debug\'', () => {
      TestLogMessage.debug(testEntries);
      expect(TestLogMessage.requestPayload).toHaveBeenLastCalledWith('debug', testEntries);
      expect(TestLogMessage.create).toHaveBeenCalled();
    });
    test('info should create with level \'info\'', () => {
      TestLogMessage.info(testEntries);
      expect(TestLogMessage.requestPayload).toHaveBeenLastCalledWith('info', testEntries);
      expect(TestLogMessage.create).toHaveBeenCalled();
    });
    test('warn should create with level \'warn\'', () => {
      TestLogMessage.warn(testEntries);
      expect(TestLogMessage.requestPayload).toHaveBeenLastCalledWith('warn', testEntries);
      expect(TestLogMessage.create).toHaveBeenCalled();
    });
    test('error should create with level \'error\'', () => {
      TestLogMessage.error(testEntries);
      expect(TestLogMessage.requestPayload).toHaveBeenLastCalledWith('error', testEntries);
      expect(TestLogMessage.create).toHaveBeenCalled();
    });
  });
});
