import React from 'react';
import { Input as InputTextAntd, ConfigProvider } from 'antd';
import { IInputText } from 'types/commonComponents';

const InputsPassword = InputTextAntd.Password;


export const InputText = (props: IInputText) => {
  const { style = { width: '100%' }, password = false } = props;
  return (
    <ConfigProvider
      theme={
        {
          token: {
            colorPrimary: 'var(--color-white)',
            colorErrorHover: '#FF7474',
            colorPrimaryHover: 'var(--color-white)',
            colorText: 'var(--color-white)',
            colorTextQuaternary: 'var(--color-grey0)',
            fontSize: 16,
            fontFamily: 'Montserrat, sans-serif',
            colorBgContainer: 'var(--color-white)',
            controlHeight: 36,
            colorBgElevated: 'var(--color-white)',
            colorBorder: 'var(--color-ecru)',
            colorBorderSecondary: 'var(--color-ecru)',
            colorIcon: 'var(--color-white)',
          }
        }
      }
    >
      {password ? (
        <InputsPassword
          {...props}
          style={{...style, fontSize: 15}}
        />
      ) : (
        <InputTextAntd
          {...props}
          style={{...style, fontSize: 15}}
        />
      )}
    </ConfigProvider>
  );
};
