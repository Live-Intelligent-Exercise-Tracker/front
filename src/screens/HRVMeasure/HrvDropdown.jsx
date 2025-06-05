// DropdownSelector.jsx
// -----------------------------
// 이 컴포넌트는 선택 가능한 드롭다운 UI입니다.
// 외부에서 데이터를 전달받아 선택 항목을 보여주고 선택 이벤트를 처리합니다.
// 스타일은 내부에 정의되어 있으며 Chart 외에도 다양한 화면에서 재사용 가능합니다.
// -----------------------------

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

const HrvDropdown = ({ value, onChange, data }) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.dropdownContainer}
      dropdownPosition="bottom"
      data={data}
      zIndex={3000}
      labelField="label"
      valueField="value"
      placeholder="지표 선택"
      value={value}
      onChange={onChange}
      renderItem={(item, isSelected) => (
        <View
          style={[
            styles.item,
            { backgroundColor: isSelected ? '#507DFA' : '#2C2C2E' },
          ]}
        >
          <Text style={styles.itemText}>{item.label}</Text>
        </View>
      )}
    />
  )
}

// 드롭다운 스타일 정의
const styles = StyleSheet.create({
  dropdown: {
    height: 33,
    width: 93,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff63',
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderStyle: {
    fontSize: 13,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#dddddd',
    flex: 1,
    marginBottom: 2,
    marginLeft: 2,
  },
  iconStyle: {
    width: 25,
    height: 25,
    tintColor: '#dddddd',
    marginRight: -8,
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    borderRadius: 5,
    overflow: 'hidden',
    width: 93,
    paddingVertical: 0,
  },
  item: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    height: 32,
    justifyContent: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
})

export default HrvDropdown
