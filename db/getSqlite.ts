import download from 'download';
import fs from 'fs';
import path from 'path';
import tempy from 'tempy';

export async function getSqlite() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    return 'dev.db';
  } else {
    // production code
    const tempDir = tempy.directory();
    const dbPath = path.join(tempDir, 'dev.db');
    if (fs.existsSync(dbPath)) {
      console.log('DB Exists', dbPath);
      return dbPath;
    }
    console.log('Downloading DB');
    await download(
      'https://raw.githubusercontent.com/williamluke4/next-prisma/master/prisma/dev.db',
      tempDir
    );
    return path.join(tempDir, 'dev.db');
  }
}
