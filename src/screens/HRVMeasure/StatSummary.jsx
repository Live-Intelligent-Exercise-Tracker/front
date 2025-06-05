import { View, Text, StyleSheet } from 'react-native'

// 운동 통계 요약 컴포넌트
export default function StatSummary() {
  // 화면에 표시할 통계 항목 목록
  const stats = [
    { label: '총 시간', value: '01:12:03' },
    { label: '걸음 수', value: '2072' },
    { label: '평균 페이스', value: `5'19"` },
    { label: '소모 칼로리', value: '480 kcal' },
  ]

  return (
    <View style={styles.container}>
      {/* 각 항목을 반복 렌더링 */}
      {stats.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  )
}

// 스타일 정의
const styles = StyleSheet.create({
  // 전체 통계 블록 레이아웃
  container: {
    marginTop: 20,                  // 상단 여백
    flexDirection: 'row',           // 가로 정렬
    justifyContent: 'space-between',// 항목 간 간격을 균등하게
    flexWrap: 'wrap',               // 화면 너비를 넘으면 자동 줄바꿈
  },
  // 각 항목 박스
  item: {
    width: '25%',                   // 4개 항목이 1줄에 꽉 차게 배치
    marginBottom: 16,              // 아래쪽 간격
  },
  // 항목 이름 (ex. 총 시간)
  label: {
    color: '#888',                 // 흐린 회색
    fontSize: 12,                  // 작은 글씨
  },
  // 항목 값 (ex. 01:12:03)
  value: {
    color: '#fff',                 // 흰색 글자
    fontSize: 17,                  // 강조된 큰 숫자
    fontWeight: 'lighter'          // 얇은 두께 (iOS만 적용됨, Android는 무시됨)
  },
})
