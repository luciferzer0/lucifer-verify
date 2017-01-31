'use strict';
const request = require('request');
const cheerio = require('cheerio');
const striptags = require('striptags');
const entities = require('entities');
const crypto = require('crypto');
const cert = '-----BEGIN CERTIFICATE-----\n' +
  'MIIDBjCCAe4CCQCLP1YSaCWjZTANBgkqhkiG9w0BAQUFADBFMQswCQYDVQQGEwJB\n' +
  'VTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50ZXJuZXQgV2lkZ2l0\n' +
  'cyBQdHkgTHRkMB4XDTE2MTIyNjA3NTIzNVoXDTE5MTAxNjA3NTIzNVowRTELMAkG\n' +
  'A1UEBhMCQVUxEzARBgNVBAgTClNvbWUtU3RhdGUxITAfBgNVBAoTGEludGVybmV0\n' +
  'IFdpZGdpdHMgUHR5IEx0ZDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB\n' +
  'AMuSuW4WraF2BW2ixztFnY+4yv05Yi+9rn2aPmWrz52hiEp0rFOsMSCukmkV+PUW\n' +
  'peLsDWv1o9gpx4MyHoiXxKgu7UkvaA4IvaZ93tFaNOBYZlIwYn6f7V9TTy/3rrlt\n' +
  'NdFP9FDX2qt5cme7nLbK7ar6lrI4ctElYovY3fs73RGlxlZ6jJgSUC2bU72Ly6rA\n' +
  'H4HKe37NpubwsE9oQDYmSBUHTs5KOm912w3sqLMwhSBG86YITh9rOwoUwDe5UO1a\n' +
  'RZiTLqjnzWQqz00yrLs1JohtYF1tipMzQz4k2NjFfst10tbs7/UUaoTbpWfCx0gs\n' +
  'qX3dd27plDdaX2H5wdIznKkCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEANJjs7gkj\n' +
  'W0+BjUgha729s7JCoRw5+dNCIwlj8HDix1ndiGJkzGh4SRPmqbWOg7ELUZClJGqV\n' +
  'TWNyL8Vmqq8Q/CwCNGLr+svEnZhhN1ReKVboOph6Y6c6KVX3jg+Zqby0iqwBJtdn\n' +
  'APWEyoroRs1Fd7LidKRYKrmWe9NxPbzGQO4uS9ldgHE/+PhIt7g+fTdCL/s+x4+m\n' +
  'FSYfquJYQBQ9NEhfMyMyclQ0Rb29OFlA8+07QI3dHNCPxz0j7xmJTXTc8E2yA2AY\n' +
  'FqE1ABpAtxLvT0eL8im9ZJfyi2siHR0WxVPl2BHl70HO2DHFRr8oK3B6TIHeDdwg\n' +
  'lpNlyIl6MwIPgQ==\n' +
  '-----END CERTIFICATE-----\n';

module.exports = function(url, callback) {
  url = url.replace(/\s/gi, '');
  if (url.length === 0) {
    return callback(new Error('please enter a valid url'));
  } else if (url.indexOf('luciferzero.org') === -1) {
    return callback(new Error('please enter the full post url'));
  } else if (url.indexOf('http://') > -1) {
    url = url.replace('http://', 'https://');
  } else if (url.indexOf('https://') !== 0) {
    url = 'https://' + url;
  }
  request({
      url: url,
      headers: {
        'User-Agent': 'lucifer-verify'
      }
    }, function(err, response, body) {
      if (err && err !== null) {
        return callback(err);
      }
      var $ = cheerio.load(body);
      var sig = $('article.post .entry-content .post-signature pre code')
                  .text()
                  .replace('-----BEGIN SIGNATURE-----', '')
                  .replace('-----END SIGNATURE-----')
                  .replace(/\s/gi, '');
      $('article.post .entry-content hr.signature-sep').remove();
      $('article.post .entry-content .post-signature').remove();
      $('article.post .entry-content #jp-post-flair').remove();
      var html = $('article.post .entry-content').html();
      var text = entities.decodeHTML(striptags(html)).replace(/\s/gi, '');
      var verifier = crypto.createVerify('RSA-SHA512');
      verifier.update(text);
      var confirmed = verifier.verify(cert, sig, 'base64');
      callback(null, confirmed);
    }
  );
};