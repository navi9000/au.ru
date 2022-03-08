import {useState} from 'react'

export default function CustomForm(props) {
    const [lastUpdate, setLastUpdate] = useState('15 мая 2012 в 14:55:17')

    const submitHandler = e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const results = {}
        for (let value of formData.entries()) {
            results[value[0]] = {value: value[1]}
        }

        props.validation(results)

        if (!Object.values(results).some(result => result.hasError)) {
            const logInfo = {}
            for (let result in results) {
                logInfo[result] = results[result].value
            }
            console.log(JSON.stringify(logInfo))
            setLastUpdate(new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'}))
        }   
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            {props.children}
            <button type="submit" className="form__button">Изменить</button>
            <span className="form__edited">последние изменения {lastUpdate}</span>
        </form>
    )
}