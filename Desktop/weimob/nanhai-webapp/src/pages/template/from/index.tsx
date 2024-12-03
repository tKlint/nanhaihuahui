import { Input, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { FC, memo, useRef, useState } from 'react'
import MMButton from '~/modules/@wmeimob/taro-design/src/components/button'
import MMFrom from '~/modules/@wmeimob/taro-design/src/components/from'
import MMFromItem from '~/modules/@wmeimob/taro-design/src/components/from/MMFromItem'
import useFromContext from '~/modules/@wmeimob/taro-design/src/components/from/useFromContext'
import MMInput from '~/modules/@wmeimob/taro-design/src/components/Input'
const Component: FC<any> = (props) => {
  const fromRef = useRef<ReturnType<typeof useFromContext>>()

  return (
    <View style={{ flex: 1 }}>
      <MMFrom ref={fromRef as any} defaultValue={{ name: [{ key: 1 }] }}>
        <MMFromItem
          dataIndex={['required']}
          name="姓名"
          rule={[
            {
              required: true
            }
          ]}
        >
          <MMInput />
        </MMFromItem>
        <MMFromItem
          dataIndex={['min']}
          name="min"
          rule={[
            {
              min: 3,
              max: 5
            }
          ]}
        >
          <MMInput />
        </MMFromItem>

        <MMFromItem
          dataIndex="pattern"
          rule={[
            {
              required: true,
              message: '请输入1',
              pattern: /1/
            }
          ]}
        >
          <MMInput />
        </MMFromItem>
        <MMFromItem
          dataIndex="number"
          rule={[
            {
              type: 'number'
            }
          ]}
        >
          <MMInput />
        </MMFromItem>
        <MMFromItem
          dataIndex="integer"
          rule={[
            {
              type: 'integer'
            }
          ]}
        >
          <MMInput />
        </MMFromItem>
        <MMFromItem
          dataIndex="positiveInteger"
          rule={[
            {
              type: 'positiveInteger'
            }
          ]}
        >
          <MMInput />
        </MMFromItem>
        <MMFromItem
          dataIndex="phone"
          rule={[
            {
              type: 'phone'
            }
          ]}
        >
          <MMInput />
        </MMFromItem>
        <MMFromItem
          dataIndex="transform"
          rule={[
            {
              message: '请输入1',
              pattern: /13/,
              transform: (value) => value + 3
            }
          ]}
        >
          <MMInput />
        </MMFromItem>
      </MMFrom>
      <MMButton onClick={() => fromRef.current?.handleSubmit()} text="提交" />
    </View>
  )
}

const PHFrom: FC<any> = memo(Component)
export default PHFrom
