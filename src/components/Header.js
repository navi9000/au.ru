import { useState, useRef, useEffect } from "react"

export default function Header() {
    const [status, setStatus] = useState('Прежде чем действовать, надо понять')
    const [isInputDisabled, toggleInputDisabled] = useState(true)
    const inputBox = useRef()

    useEffect(() => {
        inputBox.current.focus()
    }, [isInputDisabled])


    return (
        <div className="header">
            <div className="header__flex">
                <h1 className="header__greeting">Здравствуйте, <span className="header__greeting header__greeting_highlighted">Человек №3596941</span></h1>
                <button
                    type="button"
                    className="header__changestatus"
                    onClick={() => toggleInputDisabled(!isInputDisabled)}
                    >{isInputDisabled ? 'Сменить статус' : 'OK'}</button>
            </div>
            <div className="header__statusblock">
                <input
                    type="text"
                    ref={inputBox}
                    value={status}
                    className={`header__status ${isInputDisabled ? 'header__status_disabled' : ''}`}
                    disabled={isInputDisabled}
                    onChange={e => setStatus(e.target.value)}
                />
            </div>
        </div>
    )
}