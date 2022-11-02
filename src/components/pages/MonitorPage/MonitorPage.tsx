import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Section from "components/Section";
import Chart from "react-apexcharts";
import { useChart } from "./hooks";

// TODO: get from redux
const series = {
  base: "USD",
  end_date: "2022-11-02",
  rates: {
    "2022-10-25": {
      RUB: 62.250018,
    },
    "2022-10-26": {
      RUB: 61.275022,
    },
    "2022-10-27": {
      RUB: 61.32499,
    },
    "2022-10-28": {
      RUB: 61.525038,
    },
    "2022-10-29": {
      RUB: 61.525038,
    },
    "2022-10-30": {
      RUB: 61.524985,
    },
    "2022-10-31": {
      RUB: 62.049837,
    },
    "2022-11-01": {
      RUB: 61.749903,
    },
    "2022-11-02": {
      RUB: 61.67497,
    },
  },
  start_date: "2022-10-25",
  success: true,
  timeseries: true,
};
// TODO: get from redux

function MonitorPage() {
  const [chartOptions, timeseries] = useChart(series);
  return (
    chartOptions && (
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
    )
  );
}

export default MonitorPage;
