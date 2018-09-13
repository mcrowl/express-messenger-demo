'use strict';

const sinon = require('sinon');
const assert = require('chai').assert;
const rewire = require('rewire');

const moduleUnderTest = rewire('../../../app/main');

function testStartServer() {

  const rewires = [];
  let setupMiddlewareFake;
  let setupRoutesFake;
  let setupSocketIOFake;
  let listenFake;
  let logFake;
  const appFake = {};

  beforeEach(() => {
    setupMiddlewareFake = sinon.fake();
    setupRoutesFake = sinon.fake();
    setupSocketIOFake = sinon.fake();
    listenFake = sinon.fake();
    logFake = sinon.fake();

    rewires.push(moduleUnderTest.__set__(
        'setupMiddleware',
        setupMiddlewareFake
      )
    );

    rewires.push(moduleUnderTest.__set__(
        'setupRoutes',
        setupRoutesFake
      )
    );

    rewires.push(moduleUnderTest.__set__(
        'setupSocketIO',
        setupSocketIOFake
      )
    );

    rewires.push(moduleUnderTest.__set__(
        'http',
        {
          listen: listenFake
        }
      )
    );

    rewires.push(moduleUnderTest.__set__(
        'logger',
        {
          info: logFake
        }
      )
    );

    rewires.push(moduleUnderTest.__set__(
        'app',
        appFake
      )
    );


  });

  afterEach(() => {

    rewires.forEach((resetFunction) => {
      resetFunction()
    });

  });

  it('should start the server and log a message', function() {

    const testPort = 123456;

    moduleUnderTest.__get__('startServer')(testPort);

    assert.isOk(
      setupMiddlewareFake.calledOnce,
      'setupMiddleware() called'
    );

    assert.isOk(
      setupRoutesFake.calledOnce,
      'setupRoutes() called'
    );

    assert.isOk(
      setupRoutesFake.calledWithExactly(
        appFake
      ),
      'setupRoutes() was called with expected argument'
    );

    assert.isOk(
      setupSocketIOFake.calledOnce,
      'setupSocketIO() called'
    );

    assert.isOk(
      listenFake.calledOnce,
      'http.listen() called'
    );

    assert.isOk(
      logFake.notCalled,
      'logger.info() was not called'
    );

    assert.equal(
      listenFake.getCall(0).args[0],
      testPort,
      'http.listen() was passed the correct port'
    );

    assert.isOk(
      typeof listenFake.getCall(0).args[1] === 'function',
      'http.listen() was passed a callback'
    );

    listenFake.getCall(0).args[1]();

    assert.isOk(
      logFake.calledOnce,
      'logger.info() was called in the callback'
    );
  
  });

}

describe('Module: app/main.js', function() {

  describe('startServer()', testStartServer);

});
