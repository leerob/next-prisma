const path = require('path');
const paths = [
  '.prisma/client/index.js',
  '.prisma/client/index.d.ts',
  '.prisma/client/schema.prisma'
];
module.exports = function (source) {
  console.log('Running Loader');
  console.log(source);

  clientPaths.forEach((p) => {
    this.addDependency(path.resolve(p));
  });
  return source;
};
