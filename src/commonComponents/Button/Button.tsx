import React from 'react';
import { Button as ButtonAntd } from 'antd';
import { IButton } from 'types/commonComponents';


export const Button = (props: IButton) => {
  const {
    children,
  } = props;


  return (
      <ButtonAntd
        {...props}
      >
        {children}
      </ButtonAntd>
  );
};
