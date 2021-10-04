// @ts-ignore
import {useSkin} from '@hooks/useSkin'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Link, Redirect, useHistory} from 'react-router-dom'
import {Facebook, Twitter, Mail, GitHub} from 'react-feather'
// @ts-ignore
import InputPasswordToggle from '@components/input-password-toggle'
import {
    Row,
    Col,
    CardTitle,
    CardText,
    Form,
    FormGroup,
    Label,
    Input,
    CustomInput,
    Button,
    FormFeedback,
    Spinner
} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Mapping} from "../models/Mapping"
import {authApiService} from "../apiservice/auth"
import {HttpError, HttpUnauthorizedError} from "../apiservice/http-error"
import {useForm} from "react-hook-form"
import classnames from 'classnames'
import {handleLogin} from "../redux/actions/auth";
import {useDispatch} from "react-redux";
import {setUserId, setUserData} from "../redux/actions/user";
import {useRef, useState} from "react";
import {useHotkeys} from "react-hotkeys-hook";
import {setCompany} from "../redux/actions/company";

const AppLogoWithText = () => {
    return (
        <Link className='brand-logo' to='/'>
            <svg viewBox='0 0 139 95' version='1.1' height='28'>
                <defs>
                    <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                        <stop stopColor='#000000' offset='0%'/>
                        <stop stopColor='#FFFFFF' offset='100%'/>
                    </linearGradient>
                    <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%'
                                    id='linearGradient-2'>
                        <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'/>
                        <stop stopColor='#FFFFFF' offset='100%'/>
                    </linearGradient>
                </defs>
                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                        <g id='Group' transform='translate(400.000000, 178.000000)'>
                            <path
                                d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                                id='Path'
                                className='text-primary'
                                style={{fill: 'currentColor'}}
                            />
                            <path
                                d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                                id='Path'
                                fill='url(#linearGradient-1)'
                                opacity='0.2'
                            />
                            <polygon
                                id='Path-2'
                                fill='#000000'
                                opacity='0.049999997'
                                points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                            />
                            <polygon
                                id='Path-2'
                                fill='#000000'
                                opacity='0.099999994'
                                points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                            />
                            <polygon
                                id='Path-3'
                                fill='url(#linearGradient-2)'
                                opacity='0.099999994'
                                points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                            />
                        </g>
                    </g>
                </g>
            </svg>
            <h2 className='brand-text text-primary ml-1'>Vuexy</h2>
        </Link>
    )
}

const LoginSocialMedia = () => {
    return (
        <div className="auth-footer-btn d-flex justify-content-center">
            <Button color="facebook">
                <Facebook size={14}/>
            </Button>
            <Button color="twitter">
                <Twitter size={14}/>
            </Button>
            <Button color="google">
                <Mail size={14}/>
            </Button>
            <Button className="mr-0" color="github">
                <GitHub size={14}/>
            </Button>
        </div>
    )
}

interface LoginState {
    isLoginLoading: boolean
    isLoginSuccess: boolean
    loginFailMessage: string | null
}

const LoginPage = () => {
    const usernameInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    const passwordInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    const dispatch = useDispatch()
    const history = useHistory()
    const [skin] = useSkin()
    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg'
    const source = require(`@src/assets/images/pages/${illustration}`).default
    const [loginState, setLoginState] = useState<LoginState>({
        isLoginLoading: false,
        isLoginSuccess: true,
        loginFailMessage: null
    })

    useHotkeys("ctrl+i", () => {
        usernameInputRef?.current?.focus()
    });

    const SignupSchema = yup.object().shape({
        username: yup.string()
            .required("Username belum diisi"),
        password: yup.string()
            .min(6, "Password minimal 6 karakter")
            .required("Password belum diisi")
    })

    const {register, errors, setError, handleSubmit} = useForm(
        {mode: 'onChange', resolver: yupResolver(SignupSchema)})

    const handleFormLogin = (data: Mapping) => {
        console.log(data)

        setLoginState({
            isLoginLoading: true,
            isLoginSuccess: true,
            loginFailMessage: null
        })

        authApiService.login({
            username: data.username,
            password: data.password
        })
            .then((response) => {

                console.log(response)

                setLoginState({
                    isLoginLoading: false,
                    isLoginSuccess: true,
                    loginFailMessage: null
                })

                dispatch(
                    handleLogin({
                        accessToken: response.data.data.accessToken,
                        refreshToken: response.data.data.refreshToken
                    })
                )
                dispatch(setUserId(response.data.data.userId))
                dispatch(setUserData(response.data.data.user))
                dispatch(setCompany(response.data.data.company))


                history.replace("/")

            })
            .catch((error) => {
                console.log(error.message)
                console.log(error?.getResponse())
                if (error instanceof HttpUnauthorizedError) {
                    setLoginState({
                        isLoginLoading: false,
                        isLoginSuccess: false,
                        loginFailMessage: "Periksa kembali username dan password Anda"
                    })
                }

            })
    }

    return (
        <div className='auth-wrapper auth-v2'>
            <Row className='auth-inner m-0'>

                <AppLogoWithText/>

                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login V2'/>
                    </div>
                </Col>

                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>

                        <CardTitle tag='h2' className='font-weight-bold mb-1'>
                            Selamat Datang
                        </CardTitle>
                        <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>

                        <Form
                            onSubmit={event => handleSubmit((data, event1) => {
                                handleFormLogin(data)
                            }, (errors1, event1) => {
                                console.log('on in valid error', errors1)
                                console.log('on in valid event', event1)
                            })(event)}
                            className='auth-login-form mt-2'>

                            <FormGroup>
                                <Label className='form-label' for='username'>Username</Label>
                                <Input
                                    id='username'
                                    name='username'
                                    tabIndex={1}
                                    type='text'
                                    placeholder=''
                                    autoFocus
                                    innerRef={(instance) => {
                                        usernameInputRef.current = instance
                                        return register({required: true})(instance)
                                    }}
                                    invalid={errors.username && true}
                                    className={classnames({'is-invalid': errors.username})}
                                />
                                {errors && errors.username && <FormFeedback>{errors.username.message} </FormFeedback>}
                            </FormGroup>

                            <FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='password'>Password</Label>
                                    <Link to='/'>
                                        <small>Lupa Password?</small>
                                    </Link>
                                </div>

                                <InputPasswordToggle
                                    id='password'
                                    name="password"
                                    tabIndex={2}
                                    className={classnames("input-group-merge", {'is-invalid': errors.password})}
                                    innerRef={(ref: any) => {
                                        passwordInputRef.current = ref
                                        return register({required: true})(ref)
                                    }}
                                    invalid={errors.password && true}
                                />
                                {errors && errors.password && <FormFeedback>{errors.password.message} </FormFeedback>}
                            </FormGroup>

                            {!loginState.isLoginSuccess && loginState.loginFailMessage &&
                            <div className="text-danger mb-1">{loginState.loginFailMessage}</div>}

                            <FormGroup>
                                <Button
                                    type='submit'
                                    tabIndex={3}
                                    color='primary' block
                                >
                                    {loginState.isLoginLoading ?
                                        <>
                                            <Spinner color='white' size='sm'/>
                                            <span className='ml-50'>Loading...</span>
                                        </>
                                        : "Login"
                                    }
                                </Button>
                            </FormGroup>

                        </Form>


                        {/*<p className='text-center mt-2'>*/}
                        {/*    <span className='mr-25'>New on our platform?</span>*/}
                        {/*    <Link to='/'>*/}
                        {/*        <span>Create an account</span>*/}
                        {/*    </Link>*/}
                        {/*</p>*/}
                        {/*<div className='divider my-2'>*/}
                        {/*    <div className='divider-text'>or</div>*/}
                        {/*</div>*/}

                        {/*<LoginSocialMedia/>*/}

                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage

