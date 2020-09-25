import { Button, Flex, Text } from '@chakra-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';

export default function Auth() {
  const [session, loading] = useSession();
  if (session) {
    return (
      <Flex as="div" align="center" justifyContent="space-around" padding="8px">
        <Text>Signed in as {session.user.email}</Text>
        <Button onClick={signOut}>Sign out</Button>
      </Flex>
    );
  }
  return (
    <Flex as="div" align="center" justifyContent="space-around" padding="8px">
      <Text> </Text>
      <Button onClick={signIn}>Sign in</Button>
    </Flex>
  );
}
