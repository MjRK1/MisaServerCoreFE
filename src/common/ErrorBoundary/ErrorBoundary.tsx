import React, { PropsWithChildren } from 'react';


export class ErrorBoundary extends React.Component<any, any> {
  private state = {
    hasError: false,
    error: '',
  };

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      error: ''
    };
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error: error.toString()
    });
  }

  render() {
    if (this.state.hasError) {
      return "⚠️ Вупси-дупси! Что-то пошло не так";
    }

    return this.props.children;
  }
}
