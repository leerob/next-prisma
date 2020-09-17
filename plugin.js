const PLUGIN_NAME = 'PrismaClientReloaderPlugin';
const path = require('path');
const paths = [
  '.prisma/client/index.js',
  '.prisma/client/index.d.ts',
  '.prisma/client/schema.prisma',
  '.prisma/client/query-engine-debian-openssl-1.1.x',
  '@prisma/client/index.js',
  '@prisma/client/runtime/index.js',
  '@prisma/client/generator-build/index.js'
];
class PrismaClientReloaderPlugin {
  apply(compiler) {
    const clientPaths = paths.map((p) =>
      path.join(compiler.context, 'node_modules', p)
    );
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      if (compilation.fileDependencies) {
        clientPaths.forEach((p) => {
          compilation.fileDependencies.add(p);
        });
      } else {
        clientPaths.forEach((p) => {
          compilation.compilationDependencies.add(p);
        });
      }
      // console.log(compiler);
    });
  }
}
module.exports = PrismaClientReloaderPlugin;
