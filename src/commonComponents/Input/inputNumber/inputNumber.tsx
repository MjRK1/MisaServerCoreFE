import React from 'react';
import { ConfigProvider, InputNumber as InputNumberAntd } from 'antd';
import { IInputNumber } from 'types/commonComponents';


export const InputNumber = (props: IInputNumber) => {
  const {
    style = {width: '100%'},
    isOutlined = true,
  } = props;
  return (
    <ConfigProvider
      theme={
        {
          components: {
            InputNumber: {
              activeShadow: 'none',
              activeBorderColor: isOutlined ? 'var(--color-black2)' : 'transparent'
            }
          },
          token: {
            colorPrimary: isOutlined ? 'var(--color-black4)' : 'transparent',
            colorErrorHover: '#FF7474',
            colorPrimaryHover: isOutlined ? 'var(--color-black2)' : 'transparent',
            colorText: 'var(--color-white)',
            colorTextQuaternary: 'var(--color-white)',
            fontSize: 16,
            fontFamily: 'Montserrat, sans-serif',
            colorBgContainer: 'var(--color-black3)',
            controlHeight: 36,
            colorBgElevated: 'var(--color-black2)',
            colorBorder: isOutlined ? 'var(--color-black2)' : 'transparent',
            colorBorderSecondary: isOutlined ? 'var(--color-black2)' : 'transparent',
            colorIcon: 'var(--color-white)',
          }
        }
      }
    >
      {/*@ts-ignore*/}
      <InputNumberAntd
        {...props}
        style={{...style}}
      />
    </ConfigProvider>
  );
};
