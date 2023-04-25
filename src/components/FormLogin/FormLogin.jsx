import React from 'react';
import { useForm } from 'react-hook-form';
import style from './FormLogin.module.css';

//сначла буду вызывать метод handlesubmit который идкт из коробки хука useform 
//уже в нём буду использовать свой кастомный хэндлер onsubmit рписаный выше  

function FormLogin() {

  //создаю обьект используя хук useform для валидацию формы
  //метод register для регистрации полей формы
  //formstate обьект со свойствами я использую свойство errors для вывода ошибок
  //handleSubmit функция которая будет вызываться при нажатии на кнопку submit
  const  {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,                          //метод для очистки формы после отправки
  } = useForm({                     //в хук передаю обьект с настройками проверки
    mode: 'onBlur'                  //mode-режим выбрал при изменении данных
  })
  

//кастомный способ обработки формы
  //дефолтный handlesubmit будет передавать данные полей формы в мою data
  //если в handlesubmit есть какие-то ошибки то кастомный onsubmit вызываться не будет
  //onsubmit будет срабатывать тольео если нет ошибок
  //для проверки создаю алерт что бы сотреть что вообще передаётся
const onSubmit = (data) => {
  alert(JSON.stringify(data));
  reset();                         //очищаю форму после отправки
}

  return (
  <form onSubmit={handleSubmit(onSubmit)} className={style['form-login']}>
      <div className={style['form-login__name-wrapper']}>
        <label class={style['form-login__name-label']}>log in</label>
        <input className={style['form-login__name-input']}                                             //'firstname'=name'firstname' уникальный ключ
          {...register('firstname', {                      //метод импортированный из коробки хука useform-вохвращает обьект и для работы использую деструктуризацию
            required: 'обязательно заполнить',             //задаю правила для input вывожу сообщение если requirde не заполнен
            minLength: {
              value: 5,                                    //задаю минимальное еоличество символов 5
              message: 'минимум 5 символов'                //передаю сообщение об ошибке 
            }
          })}
        />
        <div style={{ height: 20 }}>
          {errors?.firstname && <p>{errors?.firstname?.message || 'ошибка firstname'}</p>}
        </div>
      </div>
      <div className={style['form-login__password-wrapper']}>
          <label className={style['form-login__password-label']} for="form-login-password">password</label>
          <input className={style['form-login__password-input']} id="form-login-password" name="form-login-password" type="password" placeholder="password"></input>
      </div>
      <div className={style['form-login__remember-wrapper']}>
          <label className={style['form-login__remember-label']} for="form-login-remember">remeber me</label>
          <input className={style['form-login__remember-input']} id="form-login-remember" type="checkbox"></input>
      </div>
      <div className={style['form-login__forgot-password__wrapper']}>
          <a className={style['form-login__forgot-password']}>forgot password ?</a>
      </div>
      <div className={style['form-login__submit-btn__wrapper']}>
          <button className={style['form-login__submit-btn']} type="submit" disabled={!isValid}>enter</button>
      </div>
    </form>
  )
}

export default FormLogin