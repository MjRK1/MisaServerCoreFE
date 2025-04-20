import React from 'react';
import cn from 'classnames';
import { Input, ConfigProvider } from 'antd';
import { ITextarea } from 'types/commonComponents';

const TextAreaAntd = Input.TextArea;


export const Textarea = (props: ITextarea) => {
  const {
    autosize = true,
    className: additionalClassName,
    style = {width: '100%'}
  } = props;

  // const callbackRef = React.useCallback(inputElement => {
  //   if (autoFocus && inputElement) {
  //     inputElement.focus({ preventScroll: true, cursor: 'end' });
  //   }
  // }, [autoFocus]);

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
            lineHeight: 18,
          }
        }
      }
    >
      <TextAreaAntd
        {...props}
        autoSize={autosize}
        className={cn("c-textarea", additionalClassName)}
        style={{...style, padding: 10, fontSize: 16}}
      />
    </ConfigProvider>
  );
};

export default Textarea;
