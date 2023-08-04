# Firebolt Common JS

Firebolt® transpiled to CommonJS for usage with Paramount's Webplex Connected TV purposes.

## Upgrading the Firebolt SDK version on GitHub
For publishing access to github (https://github.com/james-fong/firebolt-common-js/), please reach out to James Fong (James.Fong@paramount.com) or Leo Ka Chun Wong (KC.Wong@paramount.com)

1. Check out the project
2. Create a new branch off 'master'
3. cd to the root directory of the new project
4. Open up package.json, and update both the version number and '@firebolt-js/sdk' version number
5. Run "npm i" in your terminal. 
6. run "npm run build" in your terminal.
7. Create a Pull Request to merge into "master" & Merge once approvals are gathered

## Publishing a new version of firebolt-sdk-common-js onto npm
You will need publishing access to https://www.npmjs.com/package/firebolt-sdk-common-js in order to publish a new npm version. For access, please reach out to  James Fong (James.Fong@paramount.com) or Leo Ka Chun Wong (KC.Wong@paramount.com)

1. cd to the root directory of /firebolt-common-js
2. Ensure you are on the correct branch that contains the code that you are attempting to publish
3. Run "npm publish --dry-run" to see what files will be commited. The Tarbal Details should look something similar to the following:
     ````
     === Tarball Details ===
       npm notice name:          firebolt-sdk-common-js                  
       npm notice version:       0.15.0                                  
       npm notice filename:      firebolt-sdk-common-js-0.15.0.tgz       
       npm notice package size:  30.1 kB                                 
       npm notice unpacked size: 181.2 kB                                
       npm notice shasum:        26c4586fce6cdd2df82d8b5d7e3bb0c4de61176f
       npm notice integrity:     sha512-/4+NRGz4T/E5C[...]ZtK0esZ4UVOIA==
       npm notice total files:   49
     ```
4. Run "npm publish" once you have confirmed the Tarball details are correct
5. Verify on https://www.npmjs.com/package/firebolt-sdk-common-js that the new version is published
