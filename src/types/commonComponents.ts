import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { InputNumberProps } from 'antd';

export interface IButton {
  htmlType?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  children?: React.ReactNode;
  loading?: boolean;
}

export type FormatterType = 'number' | 'percentage' | 'text';

export interface IInputText {
  style?: CSSProperties,
  value?: string | number,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  suffix?: ReactNode,
  placeholder?: string,
  password?: boolean,
  prefix?: ReactNode
}
export interface IInputNumber extends InputNumberProps {
  ref?: React.Ref<HTMLInputElement>;
  style?: CSSProperties,
  value?: number | null,
  isOutlined?: boolean
  onChange: (value: number | string | null) => void,
  placeholder?: string
}

export interface ITextarea {
  autosize?: boolean,
  className?: string | string[],
  style?: CSSProperties,
}

export interface ISelectOption {
  title: string,
  description: string,
  tooltip?: string,
  hidden: boolean,
  value: string | number | null,
  className: string,
  disabled: boolean
}

export type SelectOptionType = {
  value: string | number | undefined,
  label: string | undefined
}

export interface ISelect {
  options?: SelectOptionType[],
  onSelect?: <ValueType, OptionType>(value: ValueType, option: OptionType[] | OptionType) => void,
  onChange?: <ValueType, OptionType>(value: ValueType, option: OptionType[] | OptionType ) => void,
  value: string | number | Record<string, string | number>,
  isOutlined?: boolean,
  style?: CSSProperties,
  optionRender?: (item?: ISelectOption) => string | unknown,
  designStyle?: {
    fontFamily?: string,
    fontSize?: number,
    colorText?: string
  }
  withoutSuffixIcon?: boolean
}

export interface ISwitch {
  isOn: boolean,
  onClick: () => void,
  size?: 's' | 'm' | 'l',
  style?: CSSProperties,
}

export interface IModal {
  isOpen: boolean,
  title: string,
  withCross: boolean,
  withSuccess: boolean,
  successText?: string,
  width?: number,
  onClose: () => void,
  onSuccess?: MouseEventHandler<HTMLElement> | undefined,
  children: ReactNode
}

export type Tab = {
  id: string | number,
  content: ReactNode,
  title: string,
  name: string,
  additionalTabContent?: ReactNode,
}

export interface ITabs {
  tabs: Tab[],
  onTabChange: (tab: Tab) => void,
  currentTab: Tab,
}

export interface ICollapseProps {
  isOpen: boolean,
  children: ReactNode,
  header: ReactNode,
}

export type UrlParams = {
  type: string
}
