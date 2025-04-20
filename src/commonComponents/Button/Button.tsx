import React from 'react';
import { IButton } from 'types/commonComponents';
import cn from 'classnames';


export const Button = (props: IButton) => {
  const {
    id,
    disabled = false,
    name,
    size = 's',
    theme = 'default',
    stretched = false,
    form,
    children,
    style,
    className,
    loading,
    onClick,
  } = props;


  const getOnClickFunc = () => {
    if (loading) return undefined;
    return onClick;
  };

  return (
    <button
      id={id}
      type="button"
      name={name}
      onClick={getOnClickFunc()}
      form={form}
      className={cn(
        className,
        'c-button',
        `c-button--theme-${loading ? 'loading' : theme}`,
        `c-button--size-${size}`, {
          'c-button--disabled': disabled,
          'c-button--stretched': stretched
        }
      )}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
