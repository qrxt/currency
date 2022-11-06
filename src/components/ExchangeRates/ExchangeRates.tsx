import React from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Section from "components/Section";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Series } from "./hooks";

interface ExchangeRatesProps {
  chartOptions: ApexOptions;
  timeseries: Series[];
}

function ExchangeRates(props: ExchangeRatesProps) {
  const { chartOptions, timeseries } = props;

  return (
    <Box>
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={[5, 5, 5, 10]}>
        <Section w={["100%", "100%", "70%", "100%"]} py={6}>
          <Box px={4}>
            <Heading as="h2" size="md" mb={3}>
              USD / RUB
            </Heading>

            <Text>1 USD = 63.49 RUB</Text>
          </Box>

          <Box overflow="hidden">
            <Chart
              options={chartOptions}
              series={timeseries}
              type="line"
              height={150}
            />
          </Box>
        </Section>

        <Section w={["100%", "100%", "70%", "100%"]} py={6}>
          <Box px={4}>
            <Heading as="h2" size="md" mb={3}>
              USD / RUB
            </Heading>

            <Text>1 USD = 63.49 RUB</Text>
          </Box>

          <Box overflow="hidden">
            <Chart
              options={chartOptions}
              series={timeseries}
              type="line"
              height={150}
            />
          </Box>
        </Section>
      </SimpleGrid>
    </Box>
  );
}

export default ExchangeRates;
