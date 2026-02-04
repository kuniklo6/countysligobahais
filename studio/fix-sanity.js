const fs = require('fs');
const path = require('path');

try {
    const targetDir = path.join(__dirname, 'node_modules/sanity/lib/_internal/cli/threads');
    const cjsFile = path.join(targetDir, 'getGraphQLAPIs.cjs');
    const jsFile = path.join(targetDir, 'getGraphQLAPIs.js');

    console.log(`Checking for Sanity fix in: ${targetDir}`);

    if (fs.existsSync(cjsFile)) {
        console.log('Found getGraphQLAPIs.cjs, creating ESM wrapper...');

        // Create a wrapper that imports the CJS file
        // This allows Node to handle the .js file as ESM (due to package.json type: module)
        // but correctly load and validly execute the CJS logic.
        const wrapperContent = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('./getGraphQLAPIs.cjs');
`;

        fs.writeFileSync(jsFile, wrapperContent.trim());
        console.log('SUCCESS: Created getGraphQLAPIs.js wrapper');

    } else {
        console.error('ERROR: Source getGraphQLAPIs.cjs missing. Sanity version might be different than expected.');
        if (fs.existsSync(targetDir)) {
            console.log('Directory contents:', fs.readdirSync(targetDir));
        } else {
            console.error(`ERROR: Directory ${targetDir} does not exist`);
        }
    }
} catch (error) {
    console.error('ERROR in fix-sanity script:', error);
    process.exit(1);
}
