import styles from './InputText.module.css'


export function InputText({ type, placeholder, name, required=false }) {
    if (required) {
        return (
            <input 
                type={type}
                placeholder={placeholder}
                name={name} 
                className={styles.inputText}
                required />
        )
    } else {
        return (
            <input 
                type={type}
                placeholder={placeholder}
                name={name} 
                className={styles.inputText} />
        )
    }
}

export function InputTextWithDefaultValues({ type, placeholder, name, defaultValue }) {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            name={name} 
            defaultValue={defaultValue}
            className={styles.inputText} />
    )
}

export function InputTextWithOnChange({ type, placeholder, name, onChange, required=false }) {
    if (required) {
        return (
            <input 
                type={type}
                placeholder={placeholder}
                name={name} 
                onChange={onChange}
                className={styles.inputText}
                required />
        )
    } else {
        return (
            <input 
                type={type}
                placeholder={placeholder}
                name={name} 
                onChange={onChange}
                className={styles.inputText} />
        )
    }
}
