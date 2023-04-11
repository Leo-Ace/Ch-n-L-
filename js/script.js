const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const log = console.log.bind(document);

const handleClickUser = (elem)=> {
  const formSetting = $('.formSetting');
  const ulForm = $('.formSetting>ul');
  const divIcon = $('.logo');
  const iconExit = $('.iconexit');
  let formAvatar = $('.evenClickAvatar');
  if(formAvatar) {
    formAvatar.style.animation = 'none';
  }
  divIcon.style = 'transform: scale(0); transform-origin: center;';
  ulForm.style.animation = 'onlyMenu1 0.3s linear forwards';
  iconExit.style.opacity = '1';
  formSetting.style.display = "block";
  document.addEventListener('click', (e)=> {
    if(!ulForm.contains(e.target) && !divIcon.contains(e.target) || iconExit.contains(e.target)) {
      ulForm.style.animation = 'onlyMenu2 0.3s linear forwards';
      divIcon.style = 'transform: scale(1); transform-origin: left top;';
      iconExit.style.opacity = '0';
      setTimeout(()=> {
        formSetting.style.display = "none";
      }, 300)
    }
  });
  handleClickForForm();
  guidePlay();
}

const validationForm = (option)=> {
  const formElement = $(option.form);
  var check = true;
  if(formElement) {
    option.rules.forEach((rule)=> {
      var inputElement = $(rule.selecter);
      inputElement.onblur = ()=> {
        var message = rule.test(inputElement.value);
        if(message) {
          inputElement.parentElement.querySelector('p').innerHTML = message;
          inputElement.style.border = '1px solid red';
        } else {
          inputElement.parentElement.querySelector('p').innerHTML = '';
          inputElement.style.border = '1px solid black';
        }
        inputElement.addEventListener('input', ()=> {
          inputElement.parentElement.querySelector('p').innerHTML = '';
          inputElement.style.border = '1px solid black';
        })
      }
      if(rule.test(inputElement.value)) {
        check = false;
      }
    })
    if(option.button) {
      const btnForm = $(option.button);
      btnForm.addEventListener('mouseup', ()=> {
        option.rules.forEach((rule)=> {
          var inputElement = $(rule.selecter);
          var message = rule.test(inputElement.value);
          var message = rule.test(inputElement.value);
          if(message) {
            inputElement.parentElement.querySelector('p').innerHTML = message;
            inputElement.style.border = '1px solid red';
          } else {
            inputElement.parentElement.querySelector('p').innerHTML = '';
            inputElement.style.border = '1px solid black';
          }
          inputElement.addEventListener('input', ()=> {
            inputElement.parentElement.querySelector('p').innerHTML = '';
            inputElement.style.border = '1px solid black';
          })
        })
      })
    }
  }
  return check;
}

validationForm.isRequired = (selecter, message)=> {
  return {
    selecter: selecter,
    test: function(value) {
      return value.trim() ? undefined : message || 'Phải nhập trường này!';
    }
  };
}

validationForm.isPassword = (selecter, min, message)=> {
  return {
    selecter: selecter,
    test: function(value) {
      return value.length >= min ? undefined : message || `Độ dài tối thiểu ${min} ký tự`;
    }
  };
}

validationForm({
  form: '#form-Login-Signup',
  rules: [
    validationForm.isRequired('#name', 'Phải nhập họ và tên!'),
    validationForm.isPassword('#pass', 6),
  ],
  button: '#btn-form'
})

// handle and render form message

const formMessage = $('#formMessage');

const listMessages = {
  signUp:{
    error:{
      content: 'Tên đăng kí đã tồn tại!',
      icon: 'fa-solid fa-circle-exclamation',
      classDiv: 'error'
    },
    success:{
      content: 'Tạo tài khoản thành công!',
      icon: 'fa-solid fa-circle-check',
      classDiv: 'success'
    }
  },
  logIn:{
    error:{
      content: 'Tên đăng nhập hoặc mật khẩu không đúng!',
      icon: 'fa-solid fa-circle-exclamation',
      classDiv: 'error'
    },
    success:{
      content: 'Đăng nhập thành công!',
      icon: 'fa-solid fa-circle-check',
      classDiv: 'success'
    }
  },
  Lock:{
    error:{
      content: 'Bạn phải đăng nhập để chơi chế độ này',
      icon: 'fa-solid fa-circle-exclamation',
      classDiv: 'error'
    }
  },
  Recharge:{
    success: {
      content: 'Nạp thành công',
      icon: 'fa-solid fa-circle-check',
      classDiv: 'success'
    }
  },
  itemElement: {
    error1:{
      content: 'Chỉ được chọn một CỬA!',
      icon: 'fa-solid fa-exclamation',
      classDiv: 'error'
    },
    error2:{
      content: 'Bạn chưa chọn tiền cược!',
      icon: 'fa-solid fa-exclamation',
      classDiv: 'error'
    },
    error3:{
      content: 'Số tiền trong Tài Khoản của bạn không đủ!',
      icon: 'fa-solid fa-exclamation',
      classDiv: 'error'
    },
    error4:{
      content: 'Không thể thoát khi đang XÓC!',
      icon: 'fa-solid fa-exclamation',
      classDiv: 'error'
    },
    error5:{
      content: 'Thời gian cược đã kết thúc!',
      icon: 'fa-solid fa-exclamation',
      classDiv: 'error'
    }
  }
}

function Message({content, icon, classDiv}) {
  return (
    <div className={classDiv}>
      <span>{content}</span>
      <i className={icon}></i>
    </div>
  )
}

function renderMessage(results) {
  function RenderElement(){
    return (
      <Message 
        content= {results.content}
        icon= {results.icon}
        classDiv= {results.classDiv}
      />
    )
  }
  ReactDOM.render(<RenderElement />, formMessage);
}

// handle even click for form validation , get API


const ApiUsers = "http://localhost:3000/users";
let checkMoneyUser = false;

const handleClickForForm = ()=> {
  const elems = $$('.btnEventForm');
  elems.forEach(elem=> {
    elem.onclick = ()=> {

      const formLoginSignup = $('.form-Login-Signup');
      const formElem = $('#form-Login-Signup');
      const btnForm = $('#btn-form');
      const listInput = $$('.container>div>input');
      const contentBtn = elem.querySelector('span').innerHTML;
      var classBtn = contentBtn == 'LOG IN' ? 'logIn' : 'signUp';
      setTimeout(()=>{
        $('#name').focus();
      }, 200)
      btnForm.innerHTML = contentBtn;
      btnForm.classList.add(classBtn);
      formLoginSignup.style.visibility = 'visible';
      formLoginSignup.style.opacity = '1';
      formElem.style.animation = 'onlyroom 0.3s linear forwards';
      document.addEventListener('mousedown', (e)=> {
        if(!formElem.contains(e.target) && !$('#boxUl>li:nth-child(2)').contains(e.target)) {
          formLoginSignup.style.opacity = '0';
          formLoginSignup.style.visibility = 'hidden';
          formElem.style.animation = 'none';
          btnForm.classList.remove(classBtn);
          $('#name').value = '';
          $('#pass').value = '';
          listInput.forEach((item)=> {
            item.parentElement.querySelector('p').innerHTML = '';
            item.style.border = '1px solid black';
          })
        }
      })
    
      // code form Log in and sign up by API
      // Face API
    
      function startHandleFormUser() {
        createAccount();
        logInAccount();
      }
      
      startHandleFormUser();
      
      function postInApi(data, callback) {
        const option = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        fetch(ApiUsers, option)
          .then((response)=> {
            return response.json();
          })
          .then(callback)
      }
      
      function createAccount() {
        let btnForm = $('.signUp');
        if(btnForm) {
          btnForm.onclick = ()=> {
            let checkValidation = validationForm({
              form: '#form-Login-Signup',
              rules: [
                validationForm.isRequired('#name', 'Phải nhập họ và tên!'),
                validationForm.isPassword('#pass', 6),
              ]
            });
            if(checkValidation) {
              let inputName = $('#name').value;
              let inputPass = $('#pass').value;
              fetch(ApiUsers)
              .then((response)=> {
                return response.json();
              })
              .then((listUsers)=>{
                const checkInputName = listUsers.find((item)=> {
                  return item.nameUser == inputName;
                })
                if(!checkInputName) {
                  var data = {
                    nameUser: inputName,
                    password: inputPass,
                    prices: 0,
                    image: "./img/user2.png",
                    alt: inputName,
                    title: inputName,
                    history: {}
                  }
                  postInApi(data, ()=>{
                    renderMessage(listMessages.signUp.success);
                    setTimeout(()=> {
                      $('#name').value = '';
                      $('#pass').value = '';
                      formLoginSignup.style.opacity = '0';
                      setTimeout(()=> {
                        formLoginSignup.style.visibility = 'hidden';
                        setTimeout(()=> {
                          formLoginSignup.style.opacity = '1';
                        }, 1000);
                      }, 1000);
                    }, 1000);
                  })
                } else {
                  renderMessage(listMessages.signUp.error);
                }
              })
            }
          }
        }
      }
    
      // log in
      function updateHistory(inforUser) {
        const boxHistorys = $('#history>ul');
        for(let key in inforUser.history) {
          const li = document.createElement('li');
          li.innerHTML = inforUser.history[key];
          boxHistorys.appendChild(li);
        }
      }
    
      function handleEvenLogIn(inforUser) {
        $('.lock').removeEventListener('click', (messageLock));
        $('.lock').classList.remove('lock');

        updateHistory(inforUser)
    
        function editavatar() {
          let formAvatar = $('.evenClickAvatar');
          const boxNameUser =  $('#nameUser');
          formAvatar.style.animation = "onlyFormdowmavt 0.3s linear forwards";
          document.addEventListener('click', (e)=> {
            if(!boxNameUser.contains(e.target)) {
              formAvatar.style.animation = "onlyFormdowmavt2 0.3s linear forwards";
            }
          }) 
        }
    
        function lookAtAPhoto() {
          fetch(ApiUsers + '/' + inforUser.id)
            .then((response)=> {
              return response.json();
            })
            .then((data)=> {
              const url = data.image;
              $('#hrefPhoto').href = url;
            })
          setTimeout(()=> {
            $('.evenClickAvatar').style.animation = "onlyFormdowmavt2 0.3s linear forwards";
          }, 300)
        }
    
        function PutApi(data, id, callback) {
          const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
          fetch(ApiUsers + '/' + id, options)
            .then((response)=> {
              return response.json();
            })
            .then(callback)
        }
        
        function downloadAvatar() {
          const inputUpFile = $('#upfile');
          inputUpFile.onchange = (e)=> {
            const files = e.target.files;
            const url = URL.createObjectURL(files[0]);
            let avaterUsers = $$('.avatarUser');
            avaterUsers.forEach((item)=> {
              item.src = url;
            })
            const data = {
              ...inforUser,
              image: url
            }
            PutApi(data, inforUser.id, ()=> {
              $('.evenClickAvatar').style.animation = "onlyFormdowmavt2 0.3s linear forwards";
            })
          }
        }
    
        function FormElement() {
          return (
            <form>
              <div className="form-group">
                <label htmlFor="typeCard">Loại thẻ</label>
                <select id="typeCard">
                  <option value="Viettel">Viettel</option>
                  <option value="Mobiphone">Mobiphone</option>
                  <option value="Vinaphone">Vinaphone</option>
                  <option value="...">...</option>
                  <option value="...">...</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="codeCard">Mã thẻ</label>
                <input type="number" name="codeCard" id="codeCard" placeholder="Mã thẻ"/>
              </div>
              <div className="form-group">
                <label htmlFor="seriCard">Mã số Seri</label>
                <input type="number" name="seriCard" id="seriCard" placeholder="Số Seri"/>
              </div>
              <div className="form-group">
                <label htmlFor="valuePrice">Mệnh giá</label>
                <select id="valuePrice">
                  <option value="0" defaultValue>Mệnh giá</option>
                  <option value="10000">10000 VND</option>
                  <option value="20000">20000 VND</option>
                  <option value="50000">50000 VND</option>
                  <option value="100000">100000 VND</option>
                  <option value="200000">200000 VND</option>
                  <option value="500000">500000 VND</option>
                </select>
              </div>
              <div className="form-group">
                <button type="button" id="btnRecharge" onClick={handlevenRechange}>Nạp Tiền</button>
              </div>
            </form>
          )
        }
    
        function handlevenRechange() {
          const selectElement = $('#valuePrice');
          const pricesElement = $('.prices>b');
          const formElem = $('#recharge>form');
          const formRecharge = $('#recharge');
          let valueNew = eval(parseInt(selectElement.value) + parseInt(changeMoney(pricesElement.innerHTML)));
          listMessages.Recharge.success.content = `${listMessages.Recharge.success.content} ${changeMoney(selectElement.value)} VND vào tài khoản!`;
          const data = {
            ...inforUser,
            prices: changeMoney(valueNew)
          }
          PutApi(data, inforUser.id, ()=> {
            if(checkMoneyUser) {
              const moneyUser = $('.moneyUser>span');
              const allInBtn = $("#all-in");
              allInBtn.value = valueNew;
              moneyUser.innerHTML = changeMoney(valueNew);
            }
            pricesElement.innerHTML = changeMoney(valueNew);
            formElem.style.animation = "onlyformRechargeIn 0.3s linear forwards";
            renderMessage(listMessages.Recharge.success);
            listMessages.Recharge.success.content = 'Nạp thành công';
            setTimeout(()=> {
              formRecharge.style.display = 'none';
            }, 350);
            $('#valuePrice>option').selected = true;
          })
        }
        
        function renderFormRecharge() {
          const formRecharge = $('#recharge');
          ReactDOM.render(<FormElement />, formRecharge);
          formRecharge.style.display = 'block';
          const boxFormRecharge = $('#box-formRecharge')
          const formElem = $('#recharge>form');
          formElem.style.animation = "onlyformRechargeOut 0.3s linear forwards";
          document.addEventListener('click', (e)=> {
            if(!formElem.contains(e.target) && !boxFormRecharge.contains(e.target)) {
              formElem.style.animation = "onlyformRechargeIn 0.3s linear forwards";
              setTimeout(()=> {
                formRecharge.style.display = 'none';
              }, 350);
            }
          })
        }
    
        const boxUlElement = $('#boxUl');
    
        function eventLogOut() {
          function ListLiWhenLogOut() {
            return (
              <React.Fragment>
                <li id="nameUser">
                  <span>
                    <img src="./img/user2.png" alt="user" className="avatarUser"/>
                  </span>
                </li>
                <li id="formValidation">
                  <div className="btnEventForm" onClick={handleClickForForm}>
                    <span>LOG IN</span>
                  </div>
                  <div className="btnEventForm" onClick={handleClickForForm}>
                    <span>SIGN UP</span>
                  </div>
                </li>
                <li id="guidePlayBtn" onClick={guidePlay}>
                  <span>Hướng dẫn chơi</span>
                </li>
              </React.Fragment>
            )
          }
          ReactDOM.render(<ListLiWhenLogOut />, boxUlElement);
          const regimeEnRich = $("#enRich");
          regimeEnRich.classList.add('lock');
          $('.lock').onclick = messageLock;

          let avaterUsers = $$('.avatarUser');
          setTimeout(()=> {
            avaterUsers.forEach((item)=>{
              item.src = './img/user2.png';
              item.alt = 'user';
            });
          }, 300);
        }
    
        function ListLi() {
          return (
            <React.Fragment>
              <li id="nameUser" onClick={editavatar}>
                <span>
                  <img src="./img/user2.png" alt="user" className="avatarUser"/>
                </span>
                <p>{inforUser.nameUser}</p>
                <div className="evenClickAvatar">
                  <div>
                    <a href="./img/user2.png" target="_blank" id="hrefPhoto" onClick={lookAtAPhoto}>Xem Avatar</a>
                  </div>
                  <div onClick={downloadAvatar}>
                    <input type="file" name="upfile" id="upfile"/>
                  </div>
                </div>
              </li>
              <li>
                <span className="prices">TK: <b>{inforUser.prices}</b> VND</span>
              </li>
              <li onClick={renderFormRecharge} id="box-formRecharge">
                <span>Nạp Thẻ</span>
              </li>
              <li className="btnHistory" onClick={handleHistoryPlays}>
                <span>Lịch sử chơi</span>
              </li>
              <li id="guidePlayBtn" onClick={guidePlay}>
                <span>Hướng dẫn chơi</span>
              </li>
              <li className="btnLogOut" onClick={eventLogOut}>
                <span>LOG OUT</span>
              </li>
            </React.Fragment>
          )
        }
        ReactDOM.render(<ListLi />, boxUlElement)
        
        let avaterUsers = $$('.avatarUser');
        setTimeout(()=> {
          avaterUsers.forEach((item)=>{
            item.src = inforUser.image;
            item.alt = inforUser.alt;
          });
        }, 300);
      }
    
      function getAPIUsers(callback) {
        fetch(ApiUsers)
          .then((response)=> {
            return response.json();
          })
          .then(callback)
      }
      
      function updateDataForGame(data) {
        const regimeEnRich = $('#enRich');
        regimeEnRich.onclick = ()=> {
          checkMoneyUser = true;
          getAPIUsers((user)=> {
            const dataUser = [...user].find(item=> {
              return item.id == data.id;
            })
            const pageGames = $('#pageGames');
            const boxGames = $('.box-games');
            pageGames.style.display = 'block';
            setTimeout(()=> {
              boxGames.style = "transform-origin: 85% 79%;animation: onlyboxgames 1s linear forwards;"
            }, 200);
            const moneyUser = $('.moneyUser>span');
            moneyUser.innerHTML = dataUser.prices;
            const allInBtn = $("#all-in");
            allInBtn.value = changeMoney(dataUser.prices);
            const btndongmo = $('.setTime>button');
            btndongmo.style.display = 'none';
            btndongmo.innerHTML = 'mở';
            btndongmo.setAttribute('id', 'mo');
            const batElem = $('.bat');
            batElem.style.animation = 'onlydongbat 1s linear forwards';
            ReactDOM.unmountComponentAtNode(formMessage);
            checkRenderMessage = false;
            function startGame(dataUser) {
              // desire (auto / autoWin / autoLose)
              const desire = 'auto';
              checkRuning = true;
              startXOC(desire, dataUser);
              getValueSelecter(dataUser);
              renderBetsMoney(dataUser);
            }
            const listItmes = $$('.betsMoney');
            [...listItmes].forEach(item=> {
              item.style.boxShadow = 'none';
              item.innerHTML = '';
            })
            const runningBtn = $('#running');
            runningBtn.onclick = ()=> {
              !checkRuning && startGame(dataUser);
            }
          })
        }
      }
    
      function logInAccount() {
        let btnForm = $('.logIn');
        if(btnForm) {
          btnForm.onclick = ()=> {
            let checkValidation = validationForm({
              form: '#form-Login-Signup',
              rules: [
                validationForm.isRequired('#name', 'Phải nhập họ và tên!'),
                validationForm.isPassword('#pass', 6),
              ]
            });
            if(checkValidation) {
              let inputName = $('#name').value;
              let inputPass = $('#pass').value;
              getAPIUsers((data)=> {
                let user = data.find((item)=> {
                  return item.nameUser === inputName;
                });
                if(user && user.password === inputPass) {
                  renderMessage(listMessages.logIn.success);
                  const pageGames = $('#pageGames');
                  if(pageGames) {
                    pageGames.style.display = 'none';
                  }
                  setTimeout(()=> {
                    $('#name').value = '';
                    $('#pass').value = '';
                    formLoginSignup.style.opacity = '0';
                    setTimeout(()=> {
                      formLoginSignup.style.visibility = 'hidden';
                      setTimeout(()=> {
                        formLoginSignup.style.opacity = '1';
                      }, 1000);
                    }, 1000);
                  }, 1000);
                  handleEvenLogIn(user);
                  updateDataForGame(user);
                } else {
                  renderMessage(listMessages.logIn.error);
                }
              })
            }
          }
        }
      }
    }
  })
}
function messageLock() {
  renderMessage(listMessages.Lock.error);
}

(()=> {
  if($('.lock')) {
    $('.lock').addEventListener('click', (messageLock));
  }
})()

function handleHistoryPlays() {
  const _history = $('#history');
  const btnExit = $('.exitFormHistory');
  const btnHistory = $('.btnHistory');
  _history.style.display = 'block';
  btnExit.style.display = 'block';
  document.addEventListener('click', (e)=> {
    if((!_history.contains(e.target) && !btnHistory.contains(e.target)) || btnExit.contains(e.target)) {
      _history.style.display = 'none';
      btnExit.style.display = 'none';
    }
  })
}

function guidePlay() {
  const guidePlayBtn = $('#guidePlayBtn');
  guidePlayBtn.onclick = ()=> {
    const guidePlay = $('#guidePlay');
    const btnExit = $('.exitFormHistory');
    guidePlay.style.display = 'block';
    btnExit.style.display = 'block';
    document.addEventListener('mouseup', (e)=> {
      if((!guidePlay.contains(e.target) && !guidePlayBtn.contains(e.target)) || btnExit.contains(e.target)) {
        guidePlay.style.display = 'none';
        btnExit.style.display = 'none';
      }
    })
  }
}

// code page game 


function btnExitPageGame() {
  checkRenderMessage = false;
  checkMoneyUser = false;
  const pageGames = $('#pageGames');
  const boxGames = $('.box-games');
  pageGames.style.display = 'none';
  boxGames.style = "transform-origin: center;animation: none;opacity: 0;"
}

function regimeEntertaiment() {
  checkRenderMessage = false;
  checkMoneyUser = false;
  const moneyUser = $('.moneyUser>span');
  moneyUser.innerHTML = '10.000.000';
  const allInBtn = $("#all-in");
  allInBtn.value = '10000000';
  const pageGames = $('#pageGames');
  const boxGames = $('.box-games');
  pageGames.style.display = 'block';
  setTimeout(()=> {
    boxGames.style = "transform-origin: 15% 79%;animation: onlyboxgames 1s linear forwards;"
  }, 200);
  
  const listItmes = $$('.betsMoney');
  [...listItmes].forEach(item=> {
    item.style.boxShadow = 'none';
    item.innerHTML = '';
  })
  const btndongmo = $('.setTime>button');
  btndongmo.style.display = 'none';
  btndongmo.innerHTML = 'mở';
  btndongmo.setAttribute('id', 'mo');
  const batElem = $('.bat');
  batElem.style.animation = 'onlydongbat 1s linear forwards';
  ReactDOM.unmountComponentAtNode(formMessage);
  function startGame() {
    // desire (auto / autoWin / autoLose)
    const desire = 'auto';
    checkRuning = true;
    startXOC(desire);
    getValueSelecter();
    renderBetsMoney();
  }
  
  const runningBtn = $('#running');
  runningBtn.onclick = ()=> {
    !checkRuning && startGame();
  }
}

// code act game

var checkRuning = false;
var checkRenderMessage = false;

function changeMoney(valueNb) {
  let valueNew = '';
  let valueSt = valueNb.toString();
  if(valueSt.indexOf('.') == -1) {
    while(valueSt.length > 3) {
      valueNew = `.${valueSt.slice(-3,)}` + valueNew;
      valueSt = valueSt.slice(0, -3);
    }
    return valueSt + valueNew;
  } else {
    valueNew = valueSt.replace(/\./g, '');
    return valueNew;
  }
}

function getValueSelecter() {
  const tatbleGame = $('.tatble-game');
  const _valueMoney = $$('.valueMoney');
  _valueMoney.forEach((item)=> {
    item.addEventListener('click', ()=> {
      item.style.border = '2px solid black';
      document.addEventListener('click', (e)=> {
        if(!item.contains(e.target) && !tatbleGame.contains(e.target)) {
          item.style.border = '2px solid transparent';
        }
      })
    })
  })
}

function PutApiUser(data, id, callback) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch(ApiUsers + '/' + id, options)
    .then((response)=> {
      return response.json();
    })
    .then(callback)
}

function renderBetsMoney(data) {
  const allInBtn = $('#all-in');
  const _valueMoney = $$('.valueMoney');
  const listItmes = $$('.item');
  const cancel = $('#cancel');
  let moneyUser = $('.moneyUser');
  let datanew;
  listItmes.forEach(item=> {
    item.onclick = ()=> {
      if(checkRuning) {
        const element = [..._valueMoney].find(elem=> {
          return elem.style.border == '2px solid black';
        });
        if(element != undefined) {
          let values = element.value;
          let moneyUserNow = changeMoney(moneyUser.querySelector('span').innerHTML);
          if(parseInt(moneyUserNow) >= parseInt(values)) {
            let checkItem = [...listItmes].find(elem=> {
              return elem.querySelector('.betsMoney').innerHTML !== '';
            })
            if(checkItem) {
              if(checkItem === item) {
                moneyUserNow = eval(parseInt(moneyUserNow) - parseInt(values));
                moneyUser.querySelector('span').innerHTML = changeMoney(moneyUserNow);
                allInBtn.value = moneyUserNow;
                checkItem.querySelector('.betsMoney').innerHTML = changeMoney(eval(parseInt(changeMoney(checkItem.querySelector('.betsMoney').innerHTML)) + parseInt(values)));
                // check data
                if(data) {
                  datanew = {
                    ...data,
                    prices: changeMoney(moneyUserNow)
                  }
                  PutApiUser(datanew, data.id, ()=> {
                    const pricesElement = $('.prices>b');
                    pricesElement.innerHTML = changeMoney(moneyUserNow);
                  })
                }
              } else renderMessage(listMessages.itemElement.error1);
            } else {
              moneyUserNow = eval(parseInt(moneyUserNow) - parseInt(values));
              moneyUser.querySelector('span').innerHTML = changeMoney(moneyUserNow);
              allInBtn.value = moneyUserNow;
              item.querySelector('.betsMoney').innerHTML = changeMoney(values);
              if(data) {
                datanew = {
                  ...data,
                  prices: changeMoney(moneyUserNow)
                }
                PutApiUser(datanew, data.id, ()=> {
                  const pricesElement = $('.prices>b');
                  pricesElement.innerHTML = changeMoney(moneyUserNow);
                })
              }
            }
          } else renderMessage(listMessages.itemElement.error3);
        } else renderMessage(listMessages.itemElement.error2);
      } else {
        if(checkRenderMessage) {
          renderMessage(listMessages.itemElement.error5)
        }
      }
    }
  })
  cancel.addEventListener("click", ()=> {
    if(checkRuning) {
      let checkItem = [...listItmes].find(elem=> {
        return elem.querySelector('.betsMoney').innerHTML !== '';
      });
      if(checkItem) {
        let values = eval(parseInt(changeMoney(checkItem.querySelector('.betsMoney').innerHTML)) + parseInt(changeMoney(moneyUser.querySelector('span').innerHTML)));
        moneyUser.querySelector('span').innerHTML = changeMoney(values);
        checkItem.querySelector('.betsMoney').innerHTML = '';
        if(data) {
          datanew = {
            ...data,
            prices: changeMoney(values)
          }
          PutApiUser(datanew, data.id, ()=> {
            const pricesElement = $('.prices>b');
            pricesElement.innerHTML = changeMoney(values);
          })
        }
      }
    } else {
      if(checkRenderMessage) {
        renderMessage(listMessages.itemElement.error5)
      }
    }
  })
}

// random
let ratio2Do2Trang = parseFloat(1/0.96);
let ratio4Do4Trang = parseFloat(1/14);
let ratioChan = eval(ratio4Do4Trang*2 + ratio2Do2Trang);

const listAndCenterItem = [
  {
    id: 1,
    valueItem: [
      './img/matDo.png',
      './img/matDo.png',
      './img/matDo.png',
      './img/matDo.png',
    ],
    percent: ratio4Do4Trang/ratioChan
  },
  {
    id: 2,
    valueItem: (()=> {
      let random = Math.random();
      const listResult = [
        {
          id: 1,
          valueItem: [
            './img/matDo.png',
            './img/matTrang.png',
            './img/matTrang.png',
            './img/matTrang.png',
          ],
          percent: 0.25
        },
        {
          id: 2,
          valueItem: [
            './img/matTrang.png',
            './img/matDo.png',
            './img/matTrang.png',
            './img/matTrang.png',
          ],
          percent: 0.25
        },
        {
          id: 3,
          valueItem: [
            './img/matTrang.png',
            './img/matTrang.png',
            './img/matDo.png',
            './img/matTrang.png',
          ],
          percent: 0.25
        },
        {
          id: 4,
          valueItem: [
            './img/matTrang.png',
            './img/matTrang.png',
            './img/matTrang.png',
            './img/matDo.png',
          ],
          percent: 0.25
        },
      ];
      const result = randomItem(random, listResult);
      return result.valueItem;
    })(),
    percent: 0.25
  },
  {
    id: 3,
    valueItem: [
      './img/matTrang.png',
      './img/matTrang.png',
      './img/matTrang.png',
      './img/matTrang.png',
    ],
    percent: ratio4Do4Trang/ratioChan
  },
  {
    id: 4,
    valueItem: (()=> {
      let random = Math.random();
      const listResult = [
        {
          id: 1,
          valueItem: [
            './img/matTrang.png',
            './img/matDo.png',
            './img/matDo.png',
            './img/matDo.png',
          ],
          percent: 0.25
        },
        {
          id: 2,
          valueItem: [
            './img/matDo.png',
            './img/matTrang.png',
            './img/matDo.png',
            './img/matDo.png',
          ],
          percent: 0.25
        },
        {
          id: 3,
          valueItem: [
            './img/matDo.png',
            './img/matDo.png',
            './img/matTrang.png',
            './img/matDo.png',
          ],
          percent: 0.25
        },
        {
          id: 4,
          valueItem: [
            './img/matDo.png',
            './img/matDo.png',
            './img/matDo.png',
            './img/matTrang.png',
          ],
          percent: 0.25
        },
      ];
      const result = randomItem(random, listResult);
      return result.valueItem;
    })(),
    percent: 0.25
  },
  {
    id: 5,
    valueItem: (()=> {
      let random = Math.random();
      const listResult = [
        {
          id: 1,
          valueItem: [
            './img/matDo.png',
            './img/matDo.png',
            './img/matTrang.png',
            './img/matTrang.png',
          ],
          percent: 1/6
        },
        {
          id: 2,
          valueItem: [
            './img/matDo.png',
            './img/matTrang.png',
            './img/matDo.png',
            './img/matTrang.png',
          ],
          percent: 1/6
        },
        {
          id: 3,
          valueItem: [
            './img/matDo.png',
            './img/matTrang.png',
            './img/matTrang.png',
            './img/matDo.png',
          ],
          percent: 1/6
        },
        {
          id: 4,
          valueItem: [
            './img/matTrang.png',
            './img/matTrang.png',
            './img/matDo.png',
            './img/matDo.png',
          ],
          percent: 1/6
        },
        {
          id: 5,
          valueItem: [
            './img/matTrang.png',
            './img/matDo.png',
            './img/matTrang.png',
            './img/matDo.png',
          ],
          percent: 1/6
        },
        {
          id: 6,
          valueItem: [
            './img/matTrang.png',
            './img/matDo.png',
            './img/matDo.png',
            './img/matTrang.png',
          ],
          percent: 1/6
        },
        
      ];
      const result = randomItem(random, listResult);
      return result.valueItem;
    })(),
    percent: ratio2Do2Trang/ratioChan
  },
];

function randomItem(numberRandom, listAndCenterItem) {
  let percentNow = 0;
  let list = [];
  listAndCenterItem.forEach((item, index)=> {
    percentNow += item.percent;
    numberRandom <= percentNow && 
    list.push({
      ...item,
      index
    })
  })
  return list[0];
}

function EventMoBat(btndongmo, result, data) {
  const batElem = $('.bat');
  let check = true;
  btndongmo.onclick = ()=> {
    if($('#mo')) {
      const open = $('#mo');
      // const id = result.id;
      batElem.style.animation = 'onlymobat 1s linear forwards';
      open.innerHTML = 'đóng';
      open.setAttribute('id', 'dong');
      if(check) renderResultGame(result, data);
    } else {
      check = false;
      const close = $('#dong');
      batElem.style.animation = 'onlydongbat 1s linear forwards';
      close.innerHTML = 'mở';
      close.setAttribute('id', 'mo');
    }
  }
}


function getGift(desire) {
  const listItmes = $$('.item');
  const coins = $$('.coin');
  let random;
  let result, listNb, item, iditem;
  let checkItem = [...listItmes].find(elem=> {
    return elem.querySelector('.betsMoney').innerHTML !== '';
  });
  if(checkItem) {
    if(desire.toString() === 'auto') {
      random = Math.random();
      result = randomItem(random, listAndCenterItem);
      coins.forEach((item, index)=> {
        item.querySelector('img').src = result.valueItem[index];
      })
    } 
    else if(desire.toString() === 'autoWin') {
      if(isNaN(Number(checkItem.id))) {
        if(checkItem.id.toString() == 'cuachan') {
          listNb = [
            {
              id: 1,
              percent: 1/3
            },
            {
              id: 3,
              percent: 1/3
            },
            {
              id: 5,
              percent: 1/3
            }
          ]
          random = Math.random();
          item = randomItem(random, listNb);
          iditem = item.id;
          result = listAndCenterItem[eval(parseInt(iditem) - 1)];
          coins.forEach((item, index)=> {
            item.querySelector('img').src = result.valueItem[index];
          })
        } else {
          listNb = [
            {
              id: 2,
              percent: 1/2
            },
            {
              id: 4,
              percent: 1/2
            }
          ]
          random = Math.random();
          item = randomItem(random, listNb);
          iditem = item.id;
          result = listAndCenterItem[eval(parseInt(iditem) - 1)];
          coins.forEach((item, index)=> {
            item.querySelector('img').src = result.valueItem[index];
          })
        }
      } else {
        result = listAndCenterItem[eval(Number(checkItem.id) - 1)];
        coins.forEach((item, index)=> {
          item.querySelector('img').src = result.valueItem[index];
        })
      }
    } else if(desire.toString() === 'autoLose') {
      if(isNaN(Number(checkItem.id))) {
        if(checkItem.id.toString() == 'cuale') {
          listNb = [
            {
              id: 1,
              percent: 1/3
            },
            {
              id: 3,
              percent: 1/3
            },
            {
              id: 5,
              percent: 1/3
            }
          ]
          random = Math.random();
          item = randomItem(random, listNb);
          iditem = item.id;
          result = listAndCenterItem[eval(parseInt(iditem) - 1)];
          coins.forEach((item, index)=> {
            item.querySelector('img').src = result.valueItem[index];
          })
        } else {
          listNb = [
            {
              id: 2,
              percent: 1/2
            },
            {
              id: 4,
              percent: 1/2
            }
          ]
          random = Math.random();
          item = randomItem(random, listNb);
          iditem = item.id;
          result = listAndCenterItem[eval(parseInt(iditem) - 1)];
          coins.forEach((item, index)=> {
            item.querySelector('img').src = result.valueItem[index];
          })
        }
      } else {
        const arrlist = [...listAndCenterItem];
        arrlist.splice(eval(Number(checkItem.id) - 1), 1)
        result = randomItem(random, arrlist);
        coins.forEach((item, index)=> {
          item.querySelector('img').src = result.valueItem[index];
        })
      }
    } else {
      random = Math.random();
      result = randomItem(random, listAndCenterItem);
      coins.forEach((item, index)=> {
        item.querySelector('img').src = result.valueItem[index];
      })
    }
  } else {
    random = Math.random();
    result = randomItem(random, listAndCenterItem);
    coins.forEach((item, index)=> {
      item.querySelector('img').src = result.valueItem[index];
    })
  }
  return result;
}

function handleData(data, moneyNew, result, checkWinLose, moneybets) {

  if(!checkWinLose) {
    moneyNew = changeMoney(eval(parseFloat(changeMoney(data.prices)) - parseFloat(changeMoney(moneybets))));
  }

  const listSpan = result.valueItem.map(item=> {
    return `
      <span class="coins">
        <img src="${item}" alt="xu">
      </span>
      `
  });
  const itemElements = `
  <div class="resultXoc">
    ${listSpan.join('')}
  </div>
  <div class="resultWinOrLose">
    <p>-> <b>${Number(result.id)%2 !==0 ? 'Cầu CHẴN' : 'Cầu LẺ'}</b> : <b class="${checkWinLose ? 'win' : 'lose'}">${checkWinLose ? `THẮNG +${changeMoney(eval(parseFloat(changeMoney(moneyNew)) - parseFloat(changeMoney(data.prices))))}` : `THUA -${moneybets}`}</b></p>
  </div>
  `
  const li = document.createElement('li');
  li.innerHTML = itemElements;
  const boxHistorys = $('#history>ul');
  boxHistorys.appendChild(li);

  const date = new Date();
  const randomnb = Math.random();
  let key = eval(parseFloat(date.getSeconds()) + parseFloat(randomnb))
  
  data.history[key] = itemElements;

  let datanew = {
    ...data,
    prices: moneyNew,
    history: {...data.history}
  }
  PutApiUser(datanew, data.id, ()=> {
    const pricesElement = $('.prices>b');
    pricesElement.innerHTML = moneyNew;
  })
}

function renderResultGame(result, data) {
  const allInBtn = $('#all-in');
  const moneyUser = $('.moneyUser>span');
  const listItmes = $$('.item');
  const id = result.id;
  var checkWinLose;
  let idElem, valueMoney, moneybets, moneyWins, moneyNew = 0;
  let checkItem = [...listItmes].find(elem=> {
    return elem.querySelector('.betsMoney').innerHTML !== '';
  });
  if(checkItem) {
    if(Number(id)%2 !== 0) {
      idElem = checkItem.id;
      moneybets = checkItem.querySelector('.betsMoney').innerHTML;
      if(checkItem.id.toString() == 'cuachan') {
        checkWinLose = true;
        valueMoney = parseFloat(changeMoney(checkItem.querySelector('.betsMoney').innerHTML));
        moneyWins = eval(valueMoney + eval(valueMoney * 0.96));
        moneyNew = eval(parseFloat(changeMoney(moneyUser.innerHTML)) + moneyWins);
        moneyUser.innerHTML = changeMoney(moneyNew);
        allInBtn.value = moneyNew;
      } else if(idElem.toString() == id.toString()) {
        checkWinLose = true;
        valueMoney = parseFloat(changeMoney(checkItem.querySelector('.betsMoney').innerHTML));
        moneyWins = eval(valueMoney + eval(valueMoney * 14));
        moneyNew = eval(parseFloat(changeMoney(moneyUser.innerHTML)) + moneyWins);
        moneyUser.innerHTML = changeMoney(moneyNew);
        allInBtn.value = moneyNew;
      } else checkWinLose = false;
      
      // handle data
      if(data) {
        handleData(data, changeMoney(moneyNew), result, checkWinLose, moneybets)
      }
    } else {
      idElem = checkItem.id;
      moneybets = checkItem.querySelector('.betsMoney').innerHTML;
      if(checkItem.id.toString() == 'cuale') {
        checkWinLose = true;
        valueMoney = parseFloat(changeMoney(checkItem.querySelector('.betsMoney').innerHTML));
        moneyWins = eval(valueMoney + eval(valueMoney * 0.96));
        moneyNew = eval(parseFloat(changeMoney(moneyUser.innerHTML)) + moneyWins);
        moneyUser.innerHTML = changeMoney(moneyNew);
        allInBtn.value = moneyNew;
      } else if(idElem.toString() == id.toString()) {
        checkWinLose = true;
        valueMoney = parseFloat(changeMoney(checkItem.querySelector('.betsMoney').innerHTML));
        moneyWins = eval(valueMoney + eval(valueMoney * 2.9));
        moneyNew = eval(parseFloat(changeMoney(moneyUser.innerHTML)) + moneyWins);
        moneyUser.innerHTML = changeMoney(moneyNew);
        allInBtn.value = moneyNew;
      } else checkWinLose = false;

      // handle data
      if(data) {
        handleData(data, changeMoney(moneyNew), result, checkWinLose, moneybets)
      }
    }
  }

  const resultItem = [...listItmes].find(item=> {
    return item.id.toString() == id.toString();
  })
  if(resultItem) {
    resultItem.querySelector('.betsMoney').style.boxShadow = '0 0 20px 2px red';
    if(Number(id)%2 !== 0) {
      $('.cuachan').querySelector('.betsMoney').style.boxShadow = '0 0 20px 2px red';
    } else {
      $('.cuale').querySelector('.betsMoney').style.boxShadow = '0 0 20px 2px red';
    }
  } else {
    if(id == 5) {
      $('.cuachan').querySelector('.betsMoney').style.boxShadow = '0 0 20px 2px red';
    } else {
      $('.cuale').querySelector('.betsMoney').style.boxShadow = '0 0 20px 2px red';
    }
  }
}

function countDown(seconds, elem, btndongmo, unexitgame, desire, data) {
  var intervalId = setInterval(function() {
    if (seconds <= -1) {
      checkRuning = false;
      const result = getGift(desire);
      unexitgame.style.display = "none";
      elem.innerHTML = '';
      btndongmo.style.display = 'block';
      EventMoBat(btndongmo, result, data);
      clearInterval(intervalId);
    } else {
      checkRuning = true;
      elem.innerHTML = seconds;
      seconds--;
    }
  }, 1000);
}

function startXOC(desire, data) {
  if(data) {
    fetch(ApiUsers)
      .then(response=> {
        return response.json();
      })
      .then((datas)=> {
        data = [...datas].find(item=> {
          return item.id == data.id;
        })
      })
  }
  checkRuning = true;
  checkRenderMessage = true; 
  const setTimeElem = $('.setTime>span');
  const btndongmo = $('.setTime>button');
  const unexitgame = $('.unexitgame');
  const _batdia = $$('.batdia');
  const listItmes = $$('.betsMoney');
  [...listItmes].forEach(item=> {
    item.style.boxShadow = 'none';
    item.innerHTML = '';
  })
  btndongmo.style.display = 'none';
  btndongmo.innerHTML = 'mở';
  btndongmo.setAttribute('id', 'mo');
  _batdia.forEach(item=> {
    item.style.animation = 'onlyxocdia 0.4s linear 10 forwards';
    unexitgame.style.display = "block";
    setTimeout(()=> {
      item.style.animation = 'none';
    }, 4000);
  })
  setTimeout(()=> {
    countDown(5, setTimeElem, btndongmo, unexitgame, desire, data);
  }, 3900);

}

function unExitGame() {
  renderMessage(listMessages.itemElement.error4)
}