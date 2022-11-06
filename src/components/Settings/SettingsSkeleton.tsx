import { Skeleton, SkeletonText } from "@chakra-ui/react";
import Section from "components/Section";
import React from "react";

function SettingsSkeleton() {
  return (
    <Section h="268" py={8}>
      <SkeletonText noOfLines={1} w="80px" mb={3} />
      <Skeleton h="40px" w="360px" mb={3} />
      <Skeleton w="360px" h="70px" mb={6} />
      <Skeleton w="85px" h="40px" />
    </Section>
  );
}

export default SettingsSkeleton;
