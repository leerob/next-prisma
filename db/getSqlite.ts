import download from 'download'
import path from 'path'
import tempy from 'tempy'
import fs from 'fs'
export async function getSqlite() {
  const tempDir = tempy.directory()
  const dbPath = path.join(tempDir,"dev.db")
  if(fs.existsSync(dbPath)){
    console.log('DB Exists', dbPath);
    return dbPath
  }
  await download(
    'https://raw.githubusercontent.com/williamluke4/next-prisma/master/prisma/dev.db',
    tempDir,
  )
  return path.join(tempDir, 'dev.db')
}