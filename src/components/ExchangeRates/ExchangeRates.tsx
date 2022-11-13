import React from "react";
import { Box, Heading, SimpleGrid, Text, useColorMode } from "@chakra-ui/react";
import Section from "components/Section";
import Chart from "react-apexcharts";
import { getChart, getChartOptions } from "./hooks";
import { TimeSeries } from "types/timeSeries";
import { map } from "lodash";
import { CurrencySymbol } from "types/currency";

interface ExchangeRatesProps {
  series: TimeSeries[];
  baseCurrency: CurrencySymbol;
}

function ExchangeRates({ series, baseCurrency }: ExchangeRatesProps) {
  const { colorMode } = useColorMode();

  return (
    <Box data-testid="rates-wrapper">
      <SimpleGrid columns={[1, 1, 1, 2]} spacing={[5, 5, 5, 10]}>
        {map(series, (seriesItem, idx) => {
          const chartSeries = getChart(seriesItem);
          const options = getChartOptions(seriesItem, colorMode);
          return (
            <Section
              w={["100%", "100%", "70%", "100%"]}
              py={6}
              key={idx}
              data-testid="rates-item"
            >
              <Box px={4}>
                <Heading
                  as="h2"
                  size="md"
                  mb={3}
                  data-testid="rates-item-title"
                >
                  {`${seriesItem.base} / ${seriesItem.target}`}
                </Heading>

                <Text>{`${baseCurrency} 1 = ${seriesItem.target} ${chartSeries.today}`}</Text>
              </Box>

              <Box overflow="hidden">
                <Chart
                  options={options}
                  series={[chartSeries]}
                  type="line"
                  height={150}
                />
              </Box>
            </Section>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}

export default ExchangeRates;
