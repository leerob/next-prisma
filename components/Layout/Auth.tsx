import { Avatar, Button, Divider, Flex, Text } from '@chakra-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';

export default function Auth() {
  const [session, loading] = useSession();
  console.log(session);
  if (session && session.user) {
    return (
      <Flex style={{ padding:"8px"}}>
        <Divider flexGrow="1"/>
        <Button isLoading={loading} position="relative" right="-10px" top="5px" zIndex="1" onClick={signOut}>Sign out</Button>
        <Avatar name={session.user?.name} src={session.user.image} about={session.user.email} zIndex="2"/>
  
      </Flex>
    );
  }
  return (
    <Flex as="div" align="center" justifyContent="space-around" padding="8px">
      <Divider flexGrow="1"/>
      <Button isLoading={loading} position="relative" left="-10px" top="5px" zIndex="1"  onClick={signIn}>Sign in</Button>
    </Flex>
  );
}
