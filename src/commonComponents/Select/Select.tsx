import React, { Key, ReactNode, useState } from 'react';
import { Select as SelectAntd, ConfigProvider } from 'antd';
import { motion } from "motion/react";
import { ISelect, ISelectOption } from 'types/commonComponents';

const { Option } = SelectAntd;


const optionDefaultRender = (title: string) => {
  return title;
};

const variants = {
  opened: {
    rotate: 180,
    transition: {duration: 0.2, delay: 0.2}
  },
  closed: {
    rotate: 0,
    transition: {duration: 0.2}
  }
};


export const Select = (props: ISelect) => {
  const {
    onSelect,
    onChange,
    value,
    options,
    style = { width: '100%' },
    withoutSuffixIcon = false,
    designStyle = {
      fontSize: 16,
      fontFamily: 'Montserrat, sans-serif',
      colorText: '#FFFFFF'
    },
    optionRender = optionDefaultRender
  } = props;
  const [isOpen, setOpen] = useState<boolean>(false);

  // @ts-ignore
  // @ts-ignore
  return (
    <ConfigProvider
      theme={
        {
          //@ts-ignore
          token: {
            colorPrimary: 'var(--color-black4)',
            colorErrorHover: '#FF7474',
            colorPrimaryHover: 'var(--color-black4)',
            colorText: 'var(--color-white)',
            colorTextQuaternary: 'var(--color-white)',
            fontFamily: designStyle?.fontFamily,
            fontSize: designStyle?.fontSize,
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
      {/*@ts-ignore*/}
      <SelectAntd
        {...props}
        style={style}
        onDropdownVisibleChange={(open) => setOpen(open)}
        value={value}
        onChange={onSelect || onChange}
        suffixIcon={!withoutSuffixIcon && (
          <motion.div
            variants={variants}
            animate={isOpen ? "opened" : "closed"}
            style={{fontSize: 10, width: 10, height: 10, color: "#fff"}}
          >
            <i className='moon-cx moon-cx-arrow-down' />
          </motion.div>
        )}
      >
        {
          (options || []).map((item: ISelectOption) => {
            if (item?.hidden) {
              return null;
            }
            return (
              <Option
                key={item?.value as Key}
                value={item?.value}
                className={item.className}
                disabled={item.disabled}
                source={item}
              >
                {optionRender(item?.title) as ReactNode}
              </Option>
            );
          })
        }
      </SelectAntd>
    </ConfigProvider>
  );
};
