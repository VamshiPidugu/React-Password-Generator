import { FC, useEffect, useState } from 'react';

import './style.css';
// Importing toastify module
import { ToastContainer, toast } from 'react-toastify';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

export const App: FC<{ name: string }> = ({ name }) => {
  const [password, setPassword] = useState('');
  const [upCharsCheck, setupCharsCheck] = useState(false);
  const [lowCharsCheck, setlowCharsCheck] = useState(false);
  const [numCharsCheck, setnumCharsCheck] = useState(false);
  const [symCharsCheck, setsymCharsCheck] = useState(false);
  const [progress, setProgress] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const onTextChange = (e) => {
    setPassword(e.target.value);

    setupCharsCheck(checkUpperChars());
    setlowCharsCheck(checkLowerChars());
    setnumCharsCheck(checkNumChars());
    setsymCharsCheck(checkSymChars());
    updateProgressBar();
    console.log(password);
  };

  useEffect(() => {
    setupCharsCheck(checkUpperChars());
    setlowCharsCheck(checkLowerChars());
    setnumCharsCheck(checkNumChars());
    setsymCharsCheck(checkSymChars());
    updateProgressBar();
  }, [password]);

  const generatePassword = () => {
    let charset = '';
    let newPassword = '';

    if (symCharsCheck) charset += '!@#$%^&*()';
    if (numCharsCheck) charset += '0123456789';
    if (lowCharsCheck) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (upCharsCheck) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const updateProgressBar = () => {
    const passwordLength = password.length;
    const progress = document.getElementById('progress');
    progress.style.width = (passwordLength / 12) * 100 + '%';
    setProgress(Math.ceil((passwordLength / 12) * 100).toString() + '%');
    const percentageText = document.getElementById('count');
    percentageText.style.position = 'relative';
    percentageText.style.left = Math.ceil((passwordLength / 12) * 100) + '%';
  };

  const checkPassword = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=]).{8,}$/;
    return regex.test(password);
  };

  const minchars = () => {
    const regex = /^.{8,}/;
    return regex.test(password);
  };
  const checkUpperChars = () => {
    const reg = /^(?=.*[A-Z])/;
    return reg.test(password);
  };

  const checkLowerChars = () => {
    const reg = /^(?=.*[a-z])/;
    return reg.test(password);
  };

  const checkNumChars = () => {
    const reg = /^(?=.*[0-9])/;
    return reg.test(password);
  };

  const checkSymChars = () => {
    // const reg = /^(?=.*[!@#$%^&*()_+-=])/;
    // return reg.test(password);
    // const reg = /[!@#$%^&*()_+-=]/;
    // return reg.test(password);
    const reg = /[!@#$%^&*()_+\-=]/;
    return reg.test(password);
  };

  const copyContent = () => {
    // console.log(password);
    // document.execCommand('paste', false, password);
    if (password.length > 0) {
      const textField = document.createElement('textarea');
      textField.innerText = password;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
      toast('Text Copied -- ' + password);
    } else {
      toast('Please Fill the text box to Copy');
    }
  };

  const onUpCharSValid = (value) => {
    setupCharsCheck(!value);
  };

  const onlowCharSValid = (value) => {
    setlowCharsCheck(!value);
  };
  const onnumCharSValid = (value) => {
    setnumCharsCheck(!value);
  };
  const onSymCharSValid = (value) => {
    setsymCharsCheck(!value);
  };

  const resetFeilds = () => {
    setPassword('');
    setupCharsCheck(false);
    setlowCharsCheck(false);
    setnumCharsCheck(false);
    setsymCharsCheck(false);
  };
  const inputStyle = {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '1.15rem',
  };
  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };
  const resetbuttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#34ebd2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  };
  const copyButtonStyle = {
    marginLeft: '10px',
  };

  return (
    <div>
      <ToastContainer />
      <h1>
        Hello
        <span
          className={
            password.length > 0
              ? password.length > 4
                ? 'strong'
                : 'medium'
              : 'weak'
          }
        >
          {password + (password.length > 0 ? '!' : '')}
        </span>
      </h1>
      <input
        type="text"
        className={
          password.length > 0
            ? password.length > 4
              ? 'strong'
              : 'medium'
            : 'weak'
        }
        style={{ ...inputStyle }}
        value={password}
        onChange={(e) => onTextChange(e)}
        maxLength={12}
      />
      <br />
      <div style={{ 'margin-top': '20px' }}>
        <button style={buttonStyle} onClick={generatePassword}>
          Generate Password
        </button>
        <input
          type="reset"
          style={{
            ...resetbuttonStyle,
            ...copyButtonStyle,
          }}
          onClick={resetFeilds}
        />
        <button
          style={{
            ...buttonStyle,
            ...copyButtonStyle,
          }}
          onClick={copyContent}
        >
          copy
        </button>
      </div>
      <br />
      <div>
        <div className="progress-bar">
          <div id="progress" className="progress">
            <span id="count" className="count">
              {progress}
            </span>
          </div>
        </div>
      </div>
      <div style={{ 'margin-top': '20px' }}>
        <div>
          <input
            type="checkbox"
            checked={upCharsCheck}
            onChange={(e) => onUpCharSValid(upCharsCheck)}
          />
          <label> Upper</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={lowCharsCheck}
            onChange={() => onlowCharSValid(lowCharsCheck)}
          />
          <label> Lower</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={numCharsCheck}
            onChange={() => onnumCharSValid(numCharsCheck)}
          />
          <label> Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={symCharsCheck}
            onChange={() => onSymCharSValid(symCharsCheck)}
          />
          <label> Special Chars</label>
        </div>
      </div>
    </div>
  );
};
