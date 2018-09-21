import React from 'react';
import { Group } from '@vx/group';
import { Grid } from '@vx/grid';
import { timeFormat } from 'd3-time-format';
import { AxisLeft, AxisBottom, AxisTop, AxisRight } from '@vx/axis';
import { LinePath } from '@vx/shape';
import classes from './main.css';

const MainSvg = (props) => {
    const defaultTickLabelStyle = {
        fill: 'black',
        fontSize: 15,
        fontFamily: 'Arial',
        textAnchor: 'middle',
        dx: '0.25em',
        color: '#470000'
    };

    const defaultTickLabelStyleTop = {
        fill: 'transparent'
    };

    const parseTime = (value, index) => {
        if (index % 2 === 0) {
            return timeFormat('%m/%d :%H')(value);
        }
        else {
            return null;
        }
    };

    const datum= props.data.map((data,i)=>{
        return data
    });
    console.log(datum);


    return (
        <div>
            <svg width={props.width} height={props.height-(1 * props.top)}>
                <Grid
                    top={props.top}
                    xScale={props.xScale}
                    yScale={props.yScale}
                    stroke={'#f9d7ac'}
                    width={props.width-(4 * props.top)}
                    height={props.height-(4 * props.top)}
                    numTicksRows={30}
                    numTicksColumns={50}
                />
                <AxisRight
                    top={props.top}
                    scale={props.yScale}
                    tickStroke={props.gridColor}
                    tickLength={props.xMax-(4 * props.top)}
                />
                <AxisLeft
                    top={props.top}
                    left={props.width-(4 * props.top)}
                    scale={props.yScale}
                    label={'BPM'}
                    tickStroke={props.gridColor}
                    tickLength={props.xMax-(4 * props.top)}
                />
                <AxisBottom
                    top={props.height-(4 * props.top)}
                    bottom={props.bottom}
                    scale={props.xScale}
                    tickStroke={props.gridColor}
                    tickLength={0}
                    tickLabelProps={() => defaultTickLabelStyle}
                    // tickFormat={(value, index) => parseTime(value, index)}
                />
                <AxisTop
                    top={props.height-(4 * props.top)}
                    scale={props.xScale}
                    tickStroke={props.gridColor}
                    tickLength={props.height- (5 * props.top)}
                    numTicks={50}
                    // tickLabelProps={() => defaultTickLabelStyleTop}
                />
                <Group top={props.top}>
                    <LinePath
                        data={datum}
                        xScale={props.yScale}
                        yScale={props.yScale}
                        x={props.x}
                        y={props.y}
                        stroke={'##ff0000'}
                        strokeWidth={2}
                    />
                </Group>
            </svg>
        </div>
    );
}

export default MainSvg;