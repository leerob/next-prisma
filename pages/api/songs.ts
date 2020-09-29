import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handle(req, res) {
  const songs = await prisma.song.findMany({ include: { artist: true } });
  return res.json(songs);
}
