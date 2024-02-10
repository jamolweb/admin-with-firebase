import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import StyledIcon from './StyledIcons';

const StyledFlex = ({ onClick, icon, text, mt }) => {
  return (
    <Flex onClick={onClick} p={'10px'} w={'100%'} borderRadius={'10px'} align={'center'} _hover={{ bg: 'gray.300' }} mt={mt}>
      <StyledIcon>{icon}</StyledIcon>
      <Text display={{base: 'none', md: 'flex'}} fontSize={{base:'20px', lg: '23px'}} ml={'15px'}>
        {text}
      </Text>
    </Flex>
  );
};

export default StyledFlex;