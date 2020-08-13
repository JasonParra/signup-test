import React, { Component } from 'react'
import CustomInput from '../../components/custom-input/custom-input'
import CustomButton from '../../components/custom-button/custom-button'
import { faUser, faMailBulk, faLock, faCheck, faReload } from "@fortawesome/free-solid-svg-icons"
import Styles from './form.module.css'
import { post } from '../../api/api'
import { isMail } from '../../utils/validator'
import InputError from '../../components/input-error/input-error'
// import _ from 'lodash'

class Form extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    success: false,
    oldForm: {
      email: ""
    },
    res: null
  }

  handleInputs = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async () => {

    const error = this.validateForm()

    if (!error) {

      try {

        const { firstName, lastName, email, password } = this.state;

        const payload = {
          firstName,
          lastName,
          email,
          password
        }

        const checkUser = await post("https://api.raisely.com/v3/check-user ", { email })

        if (checkUser.data.data.status !== 'EXISTS') {

          const submit = await post("https://api.raisely.com/v3/signup", payload)

          if (submit.data.status !== 400) {
            if (submit.data.message === 'Thank you for joining!') {
              this.setState({
                error: '',
                success: true,
                res: submit
              })
            }
          } else {
            this.setState({
              error: 'emailExists',
              oldForm: payload,
              res: submit
            })
          }

        } else {
          this.setState({
            error: 'emailExists',
            oldForm: payload,
            res: checkUser

          })
        }

      } catch (e) {
        console.log(e)
      }

    } else {
      this.setState({
        error: 'formValidate',
      })
    }
  }

  disableModify = () => {

    const { error, oldForm, email } = this.state

    if (error) {
      if (error === "formValidate") {
        if (!this.validateForm())
          return false
        else return true
      } else if (error === "emailExists") {
        if ((oldForm.email !== email) && !this.validateForm())
          return false
        else return true
      }
    } else return false


  }

  inputErrorMsg = (input) => {

    const { error } = this.state

    if (error) {
      const { firstName, lastName, email, password, oldForm } = this.state;
      let msg = ''

      switch (input) {
        case 'firstName': msg = !firstName ? 'Campo Vacío' : '';
          break;
        case 'lastName': msg = !lastName ? 'Campo Vacío' : '';
          break;
        case 'password': msg = !password ? 'Campo Vacío' : '';
          break;
        case 'email': msg = !email ? 'Campo Vacío' : !isMail(email) ? 'Correo no Valido'
          : error === "emailExists" ? oldForm.email === email ? "Email is in use" : "" : "";
          break;
        default: msg = ""
      }

      return msg

    } else return ""
  }

  validateForm = () => {
    const { firstName, lastName, email, password, error, oldForm } = this.state
    let _error = false

    if (!firstName)
      _error = true
    if (!lastName)
      _error = true
    if (!password)
      _error = true
    else if (!isMail(email) || !email || (error === 'emailExists' && oldForm.email === email))
      _error = true

    return _error
  }

  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
      success: false,
      oldForm: {
        email: ""
      },
      res: null
    })

  }


  render() {
    const { firstName, lastName, email, password, success, res } = this.state

    return (
      <div>

        <div className={Styles.container}>
          <h3>Signup Form</h3>
          <div className={Styles.form}>
            <CustomInput
              name="firstName"
              placeholder="first name"
              icon={faUser}
              value={firstName}
              onChange={this.handleInputs}
              className={Styles.input}
              error={this.inputErrorMsg('firstName')}
            />
            {this.inputErrorMsg('firstName') ?
              <InputError className={Styles.input}>{this.inputErrorMsg('firstName')}</InputError> : null
            }
            <CustomInput
              name="lastName"
              placeholder="last name"
              icon={faUser}
              value={lastName}
              onChange={this.handleInputs}
              className={Styles.input}
              error={this.inputErrorMsg('lastName')}
            />
            {this.inputErrorMsg('lastName') ?
              <InputError className={Styles.input}>{this.inputErrorMsg('lastName')}</InputError> : null
            }
            <CustomInput
              name="email"
              placeholder="email"
              icon={faMailBulk}
              value={email}
              onChange={this.handleInputs}
              className={Styles.input}
              error={this.inputErrorMsg('email')}
            />
            {this.inputErrorMsg('email') ?
              <InputError className={Styles.input}>{this.inputErrorMsg('email')}</InputError> : null
            }
            <CustomInput
              name="password"
              placeholder="password"
              icon={faLock}
              value={password}
              onChange={this.handleInputs}
              className={Styles.input}
              type={'password'}
              error={this.inputErrorMsg('password')}
            />
            {this.inputErrorMsg('password') ?
              <InputError className={Styles.inputL}>{this.inputErrorMsg('password')}</InputError> : null
            }
            <CustomButton
              className={Styles.input}
              onClick={() => this.handleSubmit()}
              fluid
              icon={faCheck}
              positive
              text={success ? 'Done !!!' : 'Signup'}
              disabled={this.disableModify()}
              success={success}
            />

          </div>
        </div>
      </div>

    )
  }
}

export default Form
