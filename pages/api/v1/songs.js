import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === 'POST') {
    const { body } = req;
    const songDetails = {
      name: '',
      youtubeId: '',
      albumCoverUrl: ''
    };
    const artistDetails = {
      name: '',
      genre: ''
    };
    songDetails.name = JSON.parse(body).songName;
    songDetails.youtubeId = JSON.parse(body).youtubeId;
    songDetails.albumCoverUrl = JSON.parse(body).albumCover;
    artistDetails.name = JSON.parse(body).artistName;
    artistDetails.genre = JSON.parse(body).genre;
    const artist = await prisma.artist.create({
      data: {
        name: artistDetails.name,
        genre: artistDetails.genre,
        songs: {
          create: {
            name: songDetails.name,
            youtubeId: songDetails.youtubeId,
            albumCoverUrl: songDetails.albumCoverUrl
          }
        }
      },
      include: { songs: true }
    });

    res.json(artist);
  }
}
