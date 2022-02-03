import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from "victory";

import {
  Container,
  Legend,
  LegendLabel,
  LegendRow,
  LegendTitle,
  LegendValue,
} from "./Chart.styles";

export const Chart = () => {
  return (
    <Container>
      <VictoryChart
        theme={VictoryTheme.material}
        height={175}
        padding={{ top: 20, right: 0, bottom: 43, left: 18 }}
      >
        <VictoryAxis
          scale="time"
          label="Time"
          style={{
            grid: { stroke: "none" },
            tickLabels: {
              fontSize: 8,
              fill: "#575B6A",
              textAnchor: ({ index, ticks }) =>
                index === 0 ? "left" : "middle",
            },
            ticks: { stroke: "#BF97E8" },
            axis: { stroke: "#BF97E8" },
            axisLabel: { padding: 32, fill: "#FFFFFF", fontSize: 10 },
          }}
          domain={[2022, 2028.2]}
          tickValues={[2022, 2023, 2024, 2025, 2026, 2027, 2028]}
          tickFormat={(t) => (t === 2022 ? 0 : t)}
        />
        <VictoryAxis
          dependentAxis
          label="Debt"
          style={{
            ticks: { stroke: "transparent" },
            axis: { stroke: "#BF97E8" },
            axisLabel: { fill: "#FFFFFF", fontSize: 10 },
            grid: { stroke: "none" },
            tickLabels: { angle: -90, fontSize: 8, fill: "#575B6A" },
          }}
          tickValues={[10000]}
          tickFormat={(t) => "10K"}
        />
        <VictoryLine
          style={{
            data: { stroke: "#FFFFFF", strokeWidth: 1 },
          }}
          data={[
            { x: 2022, y: 10000 },
            { x: 2022.6, y: 5000 },
            { x: 2023.8, y: 1000 },
            { x: 2025, y: 0 },
          ]}
          interpolation="basis"
        />
        <VictoryLine
          style={{
            data: { stroke: "#DCC0F9", strokeWidth: 1, strokeDasharray: "8" },
          }}
          data={[
            { x: 2022, y: 10000 },
            { x: 2023.6, y: 2500 },
            { x: 2026, y: 0 },
          ]}
          interpolation="basis"
        />
        <VictoryLine
          style={{
            data: { stroke: "#DCC0F9", strokeWidth: 1, strokeDasharray: "8" },
          }}
          data={[
            { x: 2022, y: 10000 },
            { x: 2022.6, y: 2500 },
            { x: 2023.9, y: 0 },
          ]}
          interpolation="basis"
        />
      </VictoryChart>
      <Legend>
        <LegendTitle>Loan estimated payed off</LegendTitle>
        <LegendRow>
          <LegendValue>4.38% APY</LegendValue>
          <LegendLabel>January 2026</LegendLabel>
        </LegendRow>
        <LegendRow>
          <LegendValue>12.14% APY</LegendValue>
          <LegendLabel>Dec 2023</LegendLabel>
        </LegendRow>
      </Legend>
    </Container>
  );
};
