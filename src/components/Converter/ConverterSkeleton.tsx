import { Box, Center, Skeleton, SkeletonText } from "@chakra-ui/react";
import Section from "components/Section";
import React from "react";

function ConverterSkeleton() {
  return (
    <Section h="314" py={8}>
      <Center h="100%">
        <Box w="50%">
          <Skeleton w="100%" h="70px" mb={3} />
          <Skeleton w="100%" h="40px" />
        </Box>
      </Center>
    </Section>
  );
}

export default ConverterSkeleton;
