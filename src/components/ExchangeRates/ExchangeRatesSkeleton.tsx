import { Box, SimpleGrid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Section from "components/Section";
import React from "react";

function ChartSkeleton() {
  return (
    <Section w={["100%", "100%", "70%", "100%"]} py={6} h="273px">
      <SkeletonText noOfLines={1} mb={3} w="40%" />
      <SkeletonText noOfLines={1} mb={3} w="55%" />

      <Box overflow="hidden">
        <Skeleton h={150} w="100%" />
      </Box>
    </Section>
  );
}

function ExchangeRatesSkeleton() {
  return (
    <Box>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={[5, 5, 5, 10]}>
        <ChartSkeleton />
        <ChartSkeleton />
      </SimpleGrid>
    </Box>
  );
}

export default ExchangeRatesSkeleton;
