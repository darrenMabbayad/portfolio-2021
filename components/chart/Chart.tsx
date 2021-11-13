import { ChartDataSet } from "@components/typing-game/typing-game.types";
import { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";
import cssVars from "@styles/components/typing-game/TypingGame.module.scss";
import { Chart as ChartJsType } from "chart.js";

interface Props {
  chartData: ChartDataSet;
}

const Chart: FunctionComponent<Props> = ({ chartData }) => {
  const data = {
    labels: chartData.timeSet,
    datasets: [
      {
        label: "raw",
        data: chartData.rawWpmSet,
        fill: false,
        backgroundColor: cssVars.textColor,
        borderColor: cssVars.textColor,
        tension: 0.5,
        yAxisID: "yWpm",
        pointRadius: 0,
      },
      {
        label: "net",
        data: chartData.netWpmSet,
        fill: false,
        backgroundColor: cssVars.subColor,
        borderColor: cssVars.subColor,
        tension: 0.5,
        yAxisID: "yWpm",
        pointRadius: 0,
      },
      {
        label: "errors",
        data: chartData.errorSet,
        fill: false,
        backgroundColor: cssVars.accentColor,
        borderColor: "rgba(0,0,0,0)",
        yAxisID: "yErrors",
      },
    ],
  };

  const options = {
    scales: {
      xTime: {
        title: {
          display: true,
          text: "Time",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
        min: 0,
      },
      yWpm: {
        title: {
          display: true,
          text: "Words per minute",
        },
        ticks: {
          display: true,
        },
        min: 0,
      },
      yErrors: {
        title: {
          display: true,
          text: "Errors",
        },
        position: "right",
        min: 0.5,
        ticks: {
          display: false,
          stepSize: 1,
        },
      },
    },
  };

  // @ts-expect-error
  ChartJsType.defaults.font.family = "'Roboto Mono', sans-serif";
  // @ts-expect-error
  ChartJsType.defaults.font.weight = 400;
  ChartJsType.defaults.color = cssVars.whiteColor;

  return (
    <div>
      {/* @ts-expect-error */}
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
