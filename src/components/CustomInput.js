export default function CustomInput(props) {

    const shouldAddErrorClass = (classDefinition) => {
        try {
            return props.validator[props.name].hasError ? classDefinition : ''
        } catch {
            return ''
        }
    }

    const getErrorMessage = () => {
        try {
            if (props.validator[props.name].hasError) return props.validator[props.name].errorMessage
        } catch {
            return ''
        }
    }

    return (
        <label className="input" htmlFor={props.name}>
            <p className="input__title">{props.title}</p>
            {
                props.type !== 'select' &&
                (<input
                    type={props.type}
                    name={props.name}
                    autoComplete="off"
                    className={`input__entry ${props.type === 'checkbox' ? 'input__entry_checkbox' : ''} ${shouldAddErrorClass('input__entry_error')}`} />)
            }
            {
                props.type === 'select' &&
                (<select name={props.name} className="input__entry input__entry_select">
                    {props.options.map(option => (<option key={option} value={option}>{option}</option>))}
                </select>)
            }
            <p className={`input__comment ${props.type === 'checkbox' ? 'input__comment_checkbox' : ''}`}>{props.comment}</p>
            <p className={`input__error ${shouldAddErrorClass('input__error_visible')}`}>{getErrorMessage()}</p>
        </label>
    )
}