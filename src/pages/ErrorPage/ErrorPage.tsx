import React from 'react';

export const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-page__image">
        <img src="/core/images/MisaError.png" alt="Ошибочка..."/>
      </div>
      <div className="error-page__info">
        ⚠️ Вупси-дупси! Что-то пошло не так
      </div>
    </div>
  );
};
