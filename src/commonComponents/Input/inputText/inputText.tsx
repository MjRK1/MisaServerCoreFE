import React from 'react';
import { Input as InputTextAntd, ConfigProvider } from 'antd';
import { IInputText } from 'types/commonComponents';


export const InputText = (props: IInputText) => {
  const { style = { width: '100%' } } = props;
  return (
    <ConfigProvider
      theme={
        {
          token: {
            colorPrimary: 'var(--color-black4)',
            colorErrorHover: '#FF7474',
            colorPrimaryHover: 'var(--color-black4)',
            colorText: 'var(--color-white)',
            colorTextQuaternary: 'var(--color-white)',
            fontSize: 16,
            fontFamily: 'Montserrat, sans-serif',
            colorBgContainer: 'var(--color-black4)',
            controlHeight: 36,
            colorBgElevated: 'var(--color-black4)',
            colorBorder: 'var(--color-black4)',
            colorBorderSecondary: 'var(--color-black4)',
            colorIcon: 'var(--color-white)',
          }
        }
      }
    >
      <InputTextAntd
        {...props}
        style={{...style, fontSize: 15}}
      />
    </ConfigProvider>
  );
};
