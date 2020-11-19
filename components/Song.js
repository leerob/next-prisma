import {
  ListItem,
  Image,
  Flex,
  Text,
  Stack,
  Heading,
  Badge
} from '@chakra-ui/core';
import NextLink from 'next/link';

const Song = ({ id, name, artist, albumCoverUrl }) => (
  <ListItem
    border="1px solid"
    borderColor="gray.200"
    borderRadius={4}
    my={2}
    bg="white"
  >
    <NextLink href={`/songs/[id]`} as={`/songs/${id}`} passHref>
      <Flex as="a">
        <Image
          size="100px"
          borderTopLeftRadius={4}
          borderBottomLeftRadius={4}
          objectFit="cover"
          src={albumCoverUrl}
          alt={name}
          mr={4}
        />
        <Stack mt={4}>
          <Heading size="lg" fontWeight="500">
            {name}
            <Badge mx="2" color="gray.700" bg="gray.200">
              {artist.genre}
            </Badge>
          </Heading>

          <Text color="gray.700">{artist.name}</Text>
        </Stack>
      </Flex>
    </NextLink>
  </ListItem>
);

export default Song;
