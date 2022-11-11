import { Skeleton, SkeletonText } from "@chakra-ui/react";
import Section from "components/Section";
import React from "react";

function SettingsSkeleton() {
  return (
    <Section h="364" py={8}>
      <SkeletonText noOfLines={1} w={["45%", "45%", "80px", "80px"]} mb={3} />
      <Skeleton w={["100%", "100%", "360px", "360px"]} h="40px" mb={3} />
      <Skeleton w={["100%", "100%", "360px", "360px"]} h="70px" mb={12} />

      <SkeletonText noOfLines={1} w={["45%", "45%", "80px", "80px"]} mb={3} />
      <Skeleton w={["100%", "100%", "360px", "360px"]} h="40px" mb={3} />

      <Skeleton w="85px" h="40px" />
    </Section>
  );
}

export default SettingsSkeleton;
