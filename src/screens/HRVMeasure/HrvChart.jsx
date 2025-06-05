import React, { useState, useRef } from 'react'
import { View, Dimensions, StyleSheet, PanResponder } from 'react-native'
import Svg, {
  Path,
  Circle,
  Text as SvgText,
  Line,
  Defs,
  ClipPath,
  Rect,
} from 'react-native-svg'
import * as shape from 'd3-shape'
import HrvDropdown from './HrvDropdown'

// 화면 너비 기준 차트 폭 설정
const screenWidth = Dimensions.get('window').width
const chartWidth = screenWidth - 20
const chartHeight = 190
const paddingX = 45  // 좌우 여백
const paddingY = 25  // 상하 여백

// 드롭다운 옵션
const dropdownData = [
  { label: '페이스', value: '페이스' },
  { label: '심박수', value: '심박수' },
]

// 데이터: 페이스(km) / 심박수(bpm)
const chartData = {
  페이스: [3, 9, 15, 20, 35, 45, 40, 38, 36],
  심박수: [70, 82, 95, 110, 125, 139, 157, 145, 130],
}

export default function HrvChart() {
  const [selected, setSelected] = useState('페이스')     // 선택된 지표
  const [activeIndex, setActiveIndex] = useState(null)   // 강조 표시할 데이터 인덱스

  // 드래그 시 강조 점 이동을 위한 PanResponder 설정
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const touchX = gestureState.moveX - 20  // 좌우 margin 보정
        const index = Math.round((touchX - paddingX) / getStepX())
        if (index >= 0 && index < currentData.length) {
          setActiveIndex(index)
        }
      },
    })
  ).current

  const currentData = chartData[selected]
  const color = selected === '페이스' ? '#507DFA' : '#FF5F5F'
  const suffix = selected === '페이스' ? 'km' : 'bpm'
  const min = Math.min(...currentData, 0)
  const max = Math.max(...currentData)

  // X축 간격 계산
  const getStepX = () => (chartWidth - paddingX * 2) / (currentData.length - 1)
  const stepX = getStepX()

  // Y축 비율 계산
  const scaleY = (chartHeight - paddingY * 2) / (max - min)

  // 각 데이터의 실제 좌표 계산
  const points = currentData.map((value, index) => {
    const x = paddingX + index * stepX
    const y = chartHeight - paddingY - (value - min) * scaleY
    return { x, y, value }
  })

  // 곡선 경로 생성 (bezier 곡선)
  const path = shape
    .line()
    .x((_, i) => points[i].x)
    .y((_, i) => points[i].y)
    .curve(shape.curveMonotoneX)(currentData)

  return (
    <View style={styles.wrapper}>
      {/* 드롭다운 위치 */}
      <View style={styles.dropdownContainer}>
        <HrvDropdown
          value={selected}
          onChange={(item) => {
            setSelected(item.value)
            setActiveIndex(null)
          }}
          data={dropdownData}
        />
      </View>

      {/* 차트 영역 */}
      <View {...panResponder.panHandlers} style={styles.chartArea}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* 선이 padding을 넘지 않도록 클리핑 설정 */}
          <Defs>
            <ClipPath id="chartClip">
              <Rect
                x={paddingX}
                y={0}
                width={chartWidth - paddingX * 2}
                height={chartHeight}
              />
            </ClipPath>
          </Defs>

          {/* Y축 실선 + 라벨 */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const value = Math.round(min + (max - min) * (1 - t))  // 값은 위에서 아래로 배치
            const y = paddingY + (chartHeight - 2 * paddingY) * t
            return (
              <React.Fragment key={`y-${i}`}>
                <Line
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#333"
                  strokeWidth={1}
                />
                <SvgText
                  x={chartWidth}         // 오른쪽 끝 라벨
                  y={y + 4}
                  fontSize="11"
                  fill="#CCCCCC"
                  textAnchor="end"       // 오른쪽 정렬
                >
                  {value + suffix}
                </SvgText>
              </React.Fragment>
            )
          })}

          {/* X축 실선 */}
          <Line
            x1={paddingX}
            y1={chartHeight - paddingY}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY}
            stroke="#CCCCCC"
            strokeWidth={1}
          />

          {/* X축 라벨 */}
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

          {/* 곡선 라인 */}
          <Path
            d={path}
            stroke={color}
            strokeWidth={3}
            fill="none"
            clipPath="url(#chartClip)" // clipPath 적용
          />

          {/* 강조 점 + 숫자 라벨 */}
          {activeIndex !== null && (() => {
            const { x, y, value } = points[activeIndex]
            return (
              <>
                <SvgText
                  x={x}
                  y={y - 10}
                  fontSize="13"
                  fill="#FFFFFF"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {value}
                </SvgText>
                <Circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={color}
                  stroke="#fff"
                  strokeWidth="2"
                />
              </>
            )
          })()}
        </Svg>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0A0A0A',
    paddingVertical: 5,
    alignSelf: 'center',
  },
  chartArea: {
    marginTop: 8,
    marginRight: 15,
  },
  dropdownContainer: {
    marginLeft: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
    zIndex: 10,
  },
})
