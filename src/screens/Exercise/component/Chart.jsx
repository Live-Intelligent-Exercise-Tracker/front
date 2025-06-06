import React, { useState, useRef } from 'react'
import { View, Dimensions, StyleSheet, PanResponder } from 'react-native'
import Svg, { Path, Circle, Text as SvgText, Line, Defs, ClipPath, Rect } from 'react-native-svg'
import * as shape from 'd3-shape'

const screenWidth = Dimensions.get('window').width
const chartWidth = screenWidth - 20
const chartHeight = 190
const paddingX = 45
const paddingY = 25

export default function ChartView({ data, color, suffix }) {
    const [activeIndex, setActiveIndex] = useState(null)
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                const touchX = gestureState.moveX - 20
                const index = Math.round((touchX - paddingX) / getStepX())
                if (index >= 0 && index < data.length) {
                    setActiveIndex(index)
                }
            },
        })
    ).current

    const min = Math.min(...data, 0)
    const max = Math.max(...data)
    const getStepX = () => (chartWidth - paddingX * 2) / (data.length - 1)
    const stepX = getStepX()
    const scaleY = (chartHeight - paddingY * 2) / (max - min)
    const points = data.map((value, index) => {
        const x = paddingX + index * stepX
        const y = chartHeight - paddingY - (value - min) * scaleY
        return { x, y, value }
    })
    const path = shape
        .line()
        .x((_, i) => points[i].x)
        .y((_, i) => points[i].y)
        .curve(shape.curveMonotoneX)(data)

    return (
        <View {...panResponder.panHandlers} style={{ borderRadius: 12, paddingTop: 10, marginLeft: -20 }}>
            <Svg width={chartWidth} height={chartHeight}>
                <Defs>
                    <ClipPath id="chartClip">
                        <Rect x={paddingX} y={0} width={chartWidth - paddingX * 2} height={chartHeight} />
                    </ClipPath>
                </Defs>
                {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                    const value = Math.round(min + (max - min) * (1 - t))
                    const y = paddingY + (chartHeight - 2 * paddingY) * t
                    return (
                        <React.Fragment key={`y-${i}`}>
                            <Line x1={paddingX} y1={y} x2={chartWidth - paddingX} y2={y} stroke="#333" strokeWidth={1} />
                            <SvgText x={chartWidth} y={y + 4} fontSize="11" fill="#CCCCCC" textAnchor="end">
                                {value + suffix}
                            </SvgText>
                        </React.Fragment>
                    )
                })}
                <Line
                    x1={paddingX}
                    y1={chartHeight - paddingY}
                    x2={chartWidth - paddingX}
                    y2={chartHeight - paddingY}
                    stroke="#CCCCCC"
                    strokeWidth={1}
                />
                {['1', '8', '15', '22', '30'].map((label, i) => {
                    const step = Math.floor((points.length - 1) / 4)
                    const point = points[i * step]
                    return (
                        <SvgText
                            key={`xlabel-${i}`}
                            x={point?.x}
                            y={chartHeight - paddingY + 16}
                            fontSize="11"
                            fill="#CCCCCC"
                            textAnchor="middle"
                        >
                            {label}
                        </SvgText>
                    )
                })}
                <Path d={path} stroke={color} strokeWidth={3} fill="none" clipPath="url(#chartClip)" />
                {activeIndex !== null && (() => {
                    const { x, y, value } = points[activeIndex]
                    return (
                        <>
                            <SvgText x={x} y={y - 10} fontSize="13" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">
                                {value}
                            </SvgText>
                            <Circle cx={x} cy={y} r="6" fill={color} stroke="#fff" strokeWidth="2" />
                        </>
                    )
                })()}
            </Svg>
        </View>
    )
}