import * as Props from '@/prop-types';

import {
  Label,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import PropTypes from 'prop-types';

LineChart.propTypes = {
  /**
   * The x/y config properties used to draw the X and/or Y axis.
   * @type {PropTypes.Requireable<{x: Props.axis; y: Props.axis; }>}
   */
  axis: PropTypes.exact({
    x: Props.axis,
    y: Props.axis
  }),

  /**
   * A list of data used to draw the chart line.
   * @type {object[]}
   */
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Enable/Disable dots in the chart line.
   * @type {boolean}
   */
  dot: PropTypes.bool,

  /**
   * Set the height for the chart container.
   * @type {number}
   */
  height: PropTypes.number.isRequired,

  /**
   * The key or getter of a group of data which should be unique.
   * @type {string}
   */
  lineKey: PropTypes.string.isRequired,

  /**
   * The sizes of whitespace around the chart container.
   * @type {PropTypes.Requireable<Props.position>}
   */
  margin: Props.position,

  /**
   * The line stroke color value.
   * @type {string}
   */
  stroke: PropTypes.string,

  /**
   * The config values for the chart tooltip.
   * @type {Object}
   */
  tooltip: PropTypes.exact({
    formatter: PropTypes.func,
    wrapper: PropTypes.object,
    content: PropTypes.object,
    label: PropTypes.object
  }),

  /**
   * The percentage value of the chart's width or a fixed width.
   * @type {number | string}
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

LineChart.defaultProps = {
  data: [],
  dot: false,
  height: 300,
  width: '100%'
};

function LineChart({ axis, data, dot, height, lineKey, margin, stroke, tooltip, width }) {
  const { x, y } = axis;
  return (
    <ResponsiveContainer height={height} width={width}>
      <ReLineChart data={data} margin={margin}>
        {x && (
          <XAxis dataKey={x.key} padding={x.padding}>
            {x.label && (
              <Label
                angle={x.label.angle}
                value={x.label.value}
                position={x.label.position}
                offset={x.label.offset}
              />
            )}
          </XAxis>
        )}
        {y && (
          <YAxis dataKey={y.key} domain={y.domain} padding={y.padding}>
            {y.label && (
              <Label
                angle={y.label.angle}
                value={y.label.value}
                position={y.label.position}
                offset={y.label.offset}
              />
            )}
          </YAxis>
        )}
        {tooltip && (
          <Tooltip
            wrapperStyle={tooltip.wrapper}
            contentStyle={tooltip.content}
            labelStyle={tooltip.label}
            formatter={tooltip.formatter}
          />
        )}
        <Line dataKey={lineKey} stroke={stroke} dot={dot} />
      </ReLineChart>
    </ResponsiveContainer>
  );
}

export default LineChart;
