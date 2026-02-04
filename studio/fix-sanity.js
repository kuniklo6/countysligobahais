const fs = require('fs');
const path = require('path');

try {
    const targetDir = path.join(__dirname, 'node_modules/sanity/lib/_internal/cli/threads');
    const cjsFile = path.join(targetDir, 'getGraphQLAPIs.cjs');
    const jsFile = path.join(targetDir, 'getGraphQLAPIs.js');

    console.log(`Checking for Sanity fix in: ${targetDir}`);

    if (fs.existsSync(cjsFile)) {
        console.log('Found getGraphQLAPIs.cjs, creating ESM wrapper...');

        // Create a wrapper that acts as a bridge between the ESM environment (forced by package.json)
        // and the CJS expectations of the Stackbit Sanity Patcher.
        // The patcher will append "exports.getStudioWorkspaces = getStudioWorkspaces.getStudioWorkspaces;"
        // We use a setter on 'exports' to capture this value and expose it via an ESM export.
        const wrapperContent = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 1. Define the live binding for the export expected by the consumer
let exportedGSW;
export { exportedGSW as getStudioWorkspaces };

// 2. Define 'exports' to capture the assignment from the patcher
// Patcher writes: exports.getStudioWorkspaces = ...
const exports = {
    set getStudioWorkspaces(v) {
        exportedGSW = v;
    }
};

// 3. Define the local variable that the patcher reads from
// Patcher reads: ... = getStudioWorkspaces.getStudioWorkspaces;
const getStudioWorkspaces = require("../../../_chunks-cjs/getStudioWorkspaces.cjs");

// 4. Ensure grep Match (in comments or unreachable code)
// getStudioWorkspaces.getStudioWorkspaces
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
