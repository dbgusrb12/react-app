import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
export default function (SpecificComponent, option, adminRoute = null) {

  // option 설정값
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입이 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response);

        if(!response.payload.auth) {
          // 로그인 하지 않은 상태
          if(option) {
            props.history.push('/login');
          }
        } else {
          // 로그인 한 상태
          if(adminRoute && !response.payload.admin) {
            props.history.push('/');
          } else {
            if(!option) {
              props.history.push('/');
            }
          }

        }

      });

    }, []);

    return (
      <SpecificComponent></SpecificComponent>
    );
  }
  
  return AuthenticationCheck;
}