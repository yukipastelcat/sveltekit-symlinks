import fs from 'fs';
import path from 'path';

function useModule(relativeModuleDir, { routePrefix, targetDir = 'src/routes' }) {
    const symlinksCache = new Map();
    const absoluteModuleDir = path.resolve(relativeModuleDir);

    const createRouteSymlink = (filePath, routesDir) => {
        const sourceFilePath = path.relative(routesDir, filePath);
        const destFilePath = path.join(targetDir, routePrefix, sourceFilePath);

        const destFileDir = path.dirname(destFilePath);
        if (!fs.existsSync(destFileDir)) {
            fs.mkdirSync(destFileDir, { recursive: true });
        }

        // Check if the symlink already exists and skip
        if (symlinksCache.has(filePath)) {
            return;
        } else if (fs.existsSync(destFilePath)) {
            symlinksCache.set(filePath, destFilePath);
            return;
        }

        const relativeSymlinkPath = path.relative(destFileDir, filePath);
        fs.symlinkSync(relativeSymlinkPath, destFilePath, 'file');
        symlinksCache.set(filePath, destFilePath);
    }

    return {
        name: 'use-module',
        buildStart() {
            const targetDirectory = path.resolve(targetDir, routePrefix);
            console.log(targetDirectory);
            if (fs.existsSync(targetDirectory)) {
                fs.rmSync(targetDirectory, { recursive: true });
            }

            const routesDir = path.resolve(relativeModuleDir, 'routes');

            if (!fs.existsSync(routesDir)) {
                console.warn(`Routes directory for module "${relativeModuleDir}" does not exist.`);
                return;
            }

            const files = getAllFiles(routesDir);

            files.forEach((srcFilePath) => createRouteSymlink(srcFilePath, routesDir));
        },
        watchChange(id, change) {
            if (!id.includes(absoluteModuleDir)) {
                return;
            }
            if (change.event === 'delete') {
                const symlink = symlinksCache.get(id);
                if (symlink) {
                    console.log('Remove symlink for', id, 'at', symlink);
                    fs.unlinkSync(symlink);
                }
            } else if (change.event === 'create') {
                const routesDir = path.resolve(relativeModuleDir, 'routes');
                console.log('Create symlink for', id, 'at', routesDir);
                createRouteSymlink(id, routesDir);
            }
        }
    };
}

// Helper function to get all files recursively
function getAllFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });

    list.forEach((file) => {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
            results = results.concat(getAllFiles(filePath)); // Recurse into subdirectory
        } else {
            results.push(filePath); // Add file path to results
        }
    });

    return results;
}

export default function (relativeModuleDir, config) {
    return {
        ...useModule(relativeModuleDir, config),
        enforce: 'pre'
    }
};
