const $inputUsername = document.querySelector('#input-username');
const $inputPassword = document.querySelector('#input-password');

const helpers = {
  checkEmptyInputs: () => {
    return !$inputUsername.value || !$inputPassword.value ? false : true;
  },
  clearInputs: () => {
    $inputUsername.value = '';
    $inputPassword.value = '';
  },
};

const submitLogin = () => {
  if (helpers.checkEmptyInputs()) {
    makeLogin($inputUsername.value, $inputPassword.value);
  } else {
    alert('Os inputs são obrigatorios');
  }
};

const makeLogin = async (username, password) => {

  const ApiUrl =
    'https://login.microsoftonline.com/be87ed09-e753-468f-8244-e2f3811ceacc/oauth2/v2.0/token';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    SdkVersion: 'postman-graph/v1.0',
  };

  const body = new URLSearchParams();

  body.append('grant_type', 'password');
  body.append('client_id', '682aac27-6b4b-4f13-a4f9-21f8b0f30f08');
  body.append('client_secret', '.C=T8S7[XpPu0qY-HTPcUgVObr4=bHUF');
  body.append('scope', 'https://graph.microsoft.com/.default');
  body.append('userName', username);
  body.append('password', password);

  console.log(body);

  const config = { method: 'post', mode: 'no-cors', body, headers };

  fetch(ApiUrl, config)
    .then(response => response.text())
    .then(response => {
      saveAcessToken(acessToken);
    })
    .catch(err => console.error('Houve um erro:', err));

  helpers.clearInputs();
};

const saveAcessToken = acessToken => {
  localStorage.setItem('acessToken', acessToken);
  //Redirecionando para dashboard
  window.location.href = 'src/pages/dashboard.html';
};

const logOut = () => {
  localStorage.removeItem('acessToken');
  window.location.href = '/';
};
