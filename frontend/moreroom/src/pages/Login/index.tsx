/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { formStyles, buttonStyles, imgCss, loginpagecontainer, iconcolors, textcolors } from "./styles";
import { Button } from "../../components/Button"; 
import { useLoginStore } from "../../stores/loginStore";
import { UserLogin } from "../../apis/loginApi";  // 로그인 API 호출 함수
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { email, password, emailError, passwordError, setEmail, setPassword, validateEmail, validatePassword, resetFields } = useLoginStore();
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보기/숨기기 상태
  const [loginError, setLoginError] = useState<string>(''); // 로그인 실패 메시지 상태
  const navigate = useNavigate();

  // 비밀번호 보기/숨기기 토글
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // 이메일 입력 필드 초기화
  const handleClearEmail = () => setEmail('');

  // 로그인 처리
  const handleLogin = async () => {
    // 이메일 및 비밀번호 형식 검사
    validateEmail();
    validatePassword();

    if (!emailError && !passwordError && email && password) {
      try {
        console.log("API 호출 시작");
        // 로그인 API 호출
        const response = await UserLogin(email, password);
        console.log("API 응답:", response);

        if (response.status === 200) {
          // 세션 스토리지에 토큰 저장
          sessionStorage.setItem('sessionToken', response.data.token);

          // 로그인 성공 후 홈으로 리다이렉트
          navigate('/');
          resetFields();  // 로그인 후 필드 초기화
        } else {
          throw new Error("로그인 실패");
        }
      } catch (err) {
        console.log("로그인 오류:", err);
        setLoginError('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } else {
      setLoginError('이메일 또는 비밀번호 형식 오류');
    }
  };

  return (
    <div css={loginpagecontainer}>
      <div css={imgCss}>
        <img src="/logo.png" alt="" />
      </div>
      <div css={formStyles}>
        {/* 이메일 입력 필드 */}
        <TextField
          // required
          id="outlined-basic"
          label="email"
          className="custom-textfield"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);  
            validateEmail();  // 실시간 유효성 검사
          }}
          error={emailError}  // 이메일 오류 상태에 따라 빨간 테두리 표시
          helperText={emailError ? "잘못된 e-mail 유형입니다." : ""}
          InputLabelProps={{
            style: { color:'grey' }  // placeholder 색상 변경
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {email && (
                  <IconButton css={iconcolors} onClick={handleClearEmail}>
                    <CloseIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
            // style: { color: 'grey'}
          }}
          fullWidth
        />

        {/* 비밀번호 입력 필드 */}
        <TextField
          id="outlined-password-input"
          label="password"
          type={showPassword ? "text" : "password"} // 비밀번호 보이기/숨기기 상태
          className="custom-textfield"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value); 
            validatePassword();  // 실시간 유효성 검사
          }}
          error={passwordError}  // 비밀번호 오류 상태에 따라 빨간 테두리 표시
          helperText={passwordError ? "영문 소문자, 숫자 포함 8글자 이상 작성해주세요." : ""}
          InputLabelProps={{
            style: { color:'grey' }  // placeholder 색상 변경
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton css={iconcolors} onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>

      {/* 로그인 실패 메시지 */}
      {loginError && (
        <div>
          <p css={{ color: 'red' }}>{loginError}</p>
        </div>
      )}

      <div css={buttonStyles}>
        <Button
          variant='contained' 
          color='primary'
          scale="500"
          fullwidth={true}
          rounded={0.2}
          handler={handleLogin}
        >
          로그인
        </Button>
      </div>

      <p css={textcolors}>
        <a  href="/" css={iconcolors} >비밀번호</a>&nbsp;찾기
      </p>

      <p css={textcolors}>
        아직 계정이 없으신가요?-&nbsp;
          <a href="/" css={iconcolors}>회원가입</a>
        &nbsp;하러가기
      </p>

    </div>
  );
};
