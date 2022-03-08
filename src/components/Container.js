import Header from "./Header"
import CustomForm from "./CustomForm"
import CustomInput from "./CustomInput"
import CustomHr from "./CustomHr"
import data from '../json/cities.json'
import { useState } from "react"

export default function Container() {
    const [validator, setValidator] = useState({
        password: {hasError: false},
        confirm_password: {hasError: false},
        email: {hasError: false}
    })

    const validationHandler = (results) => {
        if (results.password.value.length === 0) {
            results.password.hasError = true
            results.password.errorMessage = 'Укажите пароль'
        } else if (results.password.value.length < 5) {
            results.password.hasError = true
            results.password.errorMessage = 'Используйте не менее 5 символов'
        } else {
            results.password.hasError = false
            results.password.errorMessage = null
        }
        if (results.confirm_password.value.length === 0) {
            results.confirm_password.hasError = true
            results.confirm_password.errorMessage = 'Укажите пароль'
        } else if (results.confirm_password.value !== results.password.value) {
            results.confirm_password.hasError = true
            results.confirm_password.errorMessage = 'Пароли не совпадают'
        } else {
            results.confirm_password.hasError = false
            results.confirm_password.errorMessage = null
        }
        if (results.email.value.length === 0) {
            results.email.hasError = true
            results.email.errorMessage = 'Укажите E-mail'
        } else if (/^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(results.email.value) === false) {
            results.email.hasError = true
            results.email.errorMessage = 'Неверный E-mail'
        } else {
            results.email.hasError = false
            results.email.errorMessage = null
        }
        setValidator(results)
    }

    const filteredCities = () => {
        const sortedArray = data
        .filter(entry => Number(entry.population) > 50000)
        .sort((a, b) => Number(b.population) - Number(a.population))
        return [...sortedArray.slice(0, 1).map(entry => entry.city), ...sortedArray.slice(1).map(entry => entry.city).sort()]
        
    }

    return (
        <div className="container">
            <Header />
            <CustomForm validation={validationHandler}>
                <CustomInput title="Ваш город" name="city" type="select" options={filteredCities()}/>
                <CustomHr />
                <CustomInput
                    title="Пароль"
                    type="password"
                    name="password"
                    comment="Ваш новый пароль должен содержать не менее 5 символов"
                    validator={validator}/>
                <CustomInput
                    title="Пароль еще раз"
                    type="password"
                    name="confirm_password"
                    comment="Повторите пароль, пожалуйста, это обезопасит вас с нами на случай ошибки."
                    validator={validator}/>
                <CustomHr />
                <CustomInput
                    title="Электронная почта"
                    type="text"
                    name="email"
                    comment="Можно изменить адрес, указанный при регистрации."
                    validator={validator} />
                <CustomInput title="Я согласен" type="checkbox" name="get_info" comment="принимать актуальную информацию на емейл" />
            </CustomForm>
        </div>
    )
}