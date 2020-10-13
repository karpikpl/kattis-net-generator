'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');


describe('generator-kattis-net:app', () => {
  it('creates files', async () => {
    // arrange & act
    const dir = await helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipPrettier: true })
      .withPrompts({
        problem: 'trik',
      })
      .toPromise();

    console.info(`ⓘ generator created temp files in ${dir} ⓘ`);

    // assert
    assert.file([
      'solution.sln',
    ]);
    // assert.fileContent(
    //   'azure-pipelines.yml',
    //   '11111111-1111-1111-5555-111111111111'
    // );
  }, 2500000);
});
