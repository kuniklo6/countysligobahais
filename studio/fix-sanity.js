const fs = require('fs');
const path = require('path');

try {
    const targetDir = path.join(__dirname, 'node_modules/sanity/lib/_internal/cli/threads');
    const cjsFile = path.join(targetDir, 'getGraphQLAPIs.cjs');
    const jsFile = path.join(targetDir, 'getGraphQLAPIs.js');

    console.log(`Checking for Sanity fix in: ${targetDir}`);

    if (fs.existsSync(cjsFile)) {
        if (!fs.existsSync(jsFile)) {
            fs.copyFileSync(cjsFile, jsFile);
            console.log('SUCCESS: Copied getGraphQLAPIs.cjs to getGraphQLAPIs.js');
        } else {
            console.log('INFO: getGraphQLAPIs.js already exists');
        }
    } else {
        console.error('ERROR: Source getGraphQLAPIs.cjs missing. Sanity version might be different than expected.');
        // Check if directory exists
        if (fs.existsSync(targetDir)) {
            console.log('Directory contents:', fs.readdirSync(targetDir));
        } else {
            console.error(`ERROR: Directory ${targetDir} does not exist`);
        }
    }
} catch (error) {
    console.error('ERROR in fix-sanity script:', error);
}
