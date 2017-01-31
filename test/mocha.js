'use strict';

const expect = require('chai').expect;
const luciferVerify = require('../lucifer-verify');

describe('lucifer-verify', function() {
  this.timeout(10000);
  it('should verify waiting for sharpeville', function(done) {
    const url = 'https://luciferzero.org/2016/12/29/waiting-for-sharpeville/';
    luciferVerify(url, function(err, verified) {
      expect(err).to.not.exist;
      expect(verified).to.exist;
      expect(verified).to.be.a('boolean');
      expect(verified).to.be.true;
      done();
    });
  });
  it('should verify shadowboxing', function(done) {
    luciferVerify(
      'https://luciferzero.org/2017/01/25/shadowboxing-how-trumps-war-on-' +
      'muslims-threatens-us-all/',
      function(err, verified) {
        expect(err).to.not.exist;
        expect(verified).to.be.true;
        done();
      }
    );
  });
  it('should verify finding the best spot', function(done) {
    luciferVerify('https://luciferzero.org/2017/01/25/50/', function(err, ver) {
      expect(err).to.not.exist;
      expect(ver).to.be.true;
      done();
    });
  });
  it('should verify no real pleasure', function(done) {
    luciferVerify(
      'https://luciferzero.org/2017/01/26/no-real-pleasure-in-life/',
      function(err, verified) {
        expect(err).to.not.exist;
        expect(verified).to.be.true;
        done();
      }
    );
  });
  it("should verfiy trump's family", function(done) {
    luciferVerify(
      'https://luciferzero.org/2017/01/06/why-going-after-trumps-family' + 
      '-isnt-worth-it/',
      function(err, verified) {
        expect(err).to.not.exist;
        expect(verified).to.be.true;
        done();
      }
    );
  });
  it('should return an error if used on a non-luciferzero.org url', 
    function(done) {
      const url = 'https://google.com';
      luciferVerify(url, function(err, verified) {
        expect(err).to.exist;
        expect(err).to.be.an('error');
        expect(verified).to.not.exist;
        done();
      });
  });
  it('should handle http urls', function(done) {
    const url = 'http://luciferzero.org/2016/12/29/waiting-for-sharpeville/';
    luciferVerify(url, function(err, verified) {
      expect(err).to.not.exist;
      expect(verified).to.be.true;
      done();
    });
  });
  it('should add protocols', function(done) {
    luciferVerify(
      'luciferzero.org/2017/01/26/no-real-pleasure-in-life/',
      function(err, verified) {
        expect(err).to.not.exist;
        expect(verified).to.be.true;
        done();
      }
    );
  });
  it('shouuld remove url whitespace', function(done) {
    luciferVerify(
      '\n https://luciferzero.org/2017/01/26/no-real-pleasure-in-life/ ',
      function(err, verified) {
        expect(err).to.not.exist;
        expect(verified).to.be.true;
        done();
      }
    );
  });
  it('should return an error when given an empty url', function(done) {
    luciferVerify(
      '',
      function(err, verified) {
        expect(err).to.exist;
        expect(err).to.be.an('error');
        expect(verified).to.not.exist;
        done();
      }
    );
  });
});
