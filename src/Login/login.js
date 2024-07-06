import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import loginIcon from '../assets/images/loginIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import pasLogin from '../assets/images/pasLogin.png';
import { Link } from 'react-router-dom';
import validator from "validator";
import { useForm ,Controller} from "react-hook-form";
 
function Login(){
    const [email, setEmail] = useState('');
    const [type, setType] = useState('password');
    const [password, setPassword] = useState('');
    const [Fonticon, setIcon] = useState(faEyeSlash);
    const [language,setlistLanguage] = useState([]);
    const [languageCodes,setlanguageCodes] = useState([]);
    const [message, setMessage] = useState(" ");
    const [lang,setlistlang] = useState('');
    const { register,control, handleSubmit, errors,setValue,getValues  } = useForm();
    const [formData, setFormData] = useState({
        rememberCheck:false,
        rememberme:"Remember me",
        email: "",
        password: "",
        errorMessage:"",
      });
      const [error, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false);
    useEffect(() =>{
        let userLang = navigator.language || navigator.userLanguage;
        const userLanguages = navigator.languages || [userLang];
        // console.log("userLanguages",userLanguages);
        setlanguageCodes([...userLanguages]);
            userLang = userLang.split('-')[0];
        const languageDisplayNames = getLanguageDisplayNames(userLanguages);
        setlistLanguage([...languageDisplayNames]);
        // console.log("userLang",userLang);
        if(userLang!='en'){
            setlistlang('en');
        }
        else{
            setlistlang(userLang);
        }
        function getLanguageDisplayNames (languageCodes, locale = 'en'){
            const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
            return languageCodes.map(code => {
              return {
                code,
                name: displayNames.of(code)
              };
            });
          }
     },[]) 
     
const handleToggle = (event,name) => {
    if (type==='password'){
       setIcon(faEye);
       setType('text');
    } else {
      setIcon(faEyeSlash);
       setType('password');
    }
}
const handleChange = (event,name)=>{
    if(name=='rememberme'){
     if (event.target.checked) {
       formData.rememberCheck = false;
     } else {
       formData.rememberCheck = true;        
     }
     setFormData({...formData});
    }
}
function handleEmail(event) {
    let email = event.target.value;
    setEmail(email);
    if (!validator.isEmail(email)) {
      setMessage("Please, enter a valid email!");
    } else {
      setMessage("");
    }
  }
const onChangeOption = (event)=>{
    setlistlang(event.target.value);
    console.log(
        "event.target.value - ",
        event.target.value
    );
}


  const formSubmit = (data,event) => {
    event.preventDefault();
    // setSubmitted(true);
    console.log("Form data:", data);
    var datapost ={};
        datapost['email'] =  data['email'];
        datapost['password'] =  data['password'];
        datapost['language'] =  lang;
        console.log("data",datapost);
     if(datapost['email']==null || datapost['email'] == "" || datapost['email']==undefined){
        formData.errorMessage  = "Please enter Valid Email!";
        setFormData({...formData});
        return false;
      }
      else if(datapost['password']==null || datapost['password'] == "" || datapost['password']==undefined){
        formData.errorMessage  = "Please enter valid password";
        setFormData({...formData});
        return false;
      }
   else {
    alert("Success",datapost);
      console.log("Datapost",datapost);
   }
   
  };



    return (
        <section className='container'>
             <form onSubmit={handleSubmit(formSubmit)}>
            <div className='row'>
                 <div className='col-sm-3'></div>
                 <div className='col-sm-6'>
                     <div className={styles.login}>
                     <div style = {{ color: "red" }}> {message} </div>
                         <div className={styles.marginBottom + ' row'}>
                             <div className='col-sm-1'></div>
                             <div className='col-sm-4 text-start'>
                                 <label className={styles.label}>Email:</label>
                             </div>
                             <div className='col-sm-6'>
                                <div className={styles.emailLogin}>
                                 <input onChange={handleEmail} type="email" name="email"
              maxLength={64}  {...register("email")} autoComplete='off' className={'form-control ' +styles.loginControl} id="email" placeholder="me@example.com" required />
                                 <span className={styles.emailloginIcon}><img src={loginIcon} alt="login icon" /></span>
                                </div>
                                {error.errorMessage && <div className={styles.error}>{error.errorMessage}</div>}
                             </div>
                             <div className='col-sm-1'></div>
                          </div>
                          <div className={styles.marginBottom + ' row'}>
                             <div className='col-sm-1'></div>
                             <div className='col-sm-4 text-start'>
                                 <label className={styles.label}>Password:</label>
                             </div>
                             <div className='col-sm-6'>
                               <div className={styles.emailLogin}>
                               <input type={type} onChange={(e) => setPassword(e.target.value)}  name="password"maxLength={64} {...register("password")}
 autoComplete='off' className={'form-control ' +styles.loginControl} id="password" placeholder="Enter password" required />
                                <span className={styles.emailloginIcon}><img src={pasLogin} alt="Password icon" /></span>
                                <span className={styles.eyeIcon} onClick={(event) => handleToggle(event, "currentPassowrd")}>
                                  <FontAwesomeIcon  icon={Fonticon} size="1x"/>
                                </span>
                                {error.errorMessage && <div className={styles.error}>{error.errorMessage}</div>}
                              </div>
                              <div className={styles.forgotPassword}>
                                <Link to="/forgot-password" className={styles.forgotPasswordLink}> Forgot Password? </Link> 
                                </div>
                             </div>
                             <div className='col-sm-1'></div>
                          </div>
                          <div className={styles.marginBottom + ' row'}>
                             <div className='col-sm-1'></div>
                             <div className='col-sm-4 text-start'>
                                 <label className={styles.label}>Language:</label>
                             </div>
                             <div className='col-sm-6'>
                               {lang &&  <select className='form-control'value={lang} name='language'
                                   onChange={onChangeOption}>
                                {language.map((option, index) => {
                                    return (
                                        <option key={index} value={option.code}  >
                                            {option.name}
                                        </option>
                                    );
                                })}
                               </select>
                               }
                               <div className={styles.formSwitch + ' form-check form-switch'}>
                                            <input className="form-check-input" type="checkbox" value={formData.rememberCheck}  onChange={(event) => handleChange(event, 'rememberme')} role="switch" id="rememberme" />
                                            <label className={styles.labelColor + ' form-check-label'} htmlFor="rememberme">{formData.rememberme}</label>
                                </div>
                             </div>
                             <div className='col-sm-1'></div>
                          </div>
                          <div className={' row'}>
                             <div className='col-sm-1'></div>
                             <div className='col-sm-4 text-start'>
                             </div>
                             <div className='col-sm-6'>

                             </div>
                             <div className='col-sm-1'></div>
                          </div>
                     </div>
                 </div>
                 <div className='col-sm-3'></div>
            </div>
            <div className='row'>
                 <div className='col-sm-3'></div>
                 <div className='col-sm-6'>
                     <input type='submit' className={styles.btnblock + ' btn btn-default'} value="Log in" />
                 </div>
                 <div className='col-sm-3'></div>
            </div>
            </form>
        </section>
    );
}
export default Login;