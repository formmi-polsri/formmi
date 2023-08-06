import Link from "next/link";

export function Input(props) {
    const { label, htmlFor, onChange, ...inputProps } = props

    return (
        <div className={`relative flex flex-col`}>
            <label htmlFor={htmlFor} className={'mb-2 text-xs'}>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                autoComplete="on"
                className={`input`}
            />
            {props.id === 'passwordLogin' ? (
                <Link href="/"><span className={`block text-xs  text-right`}>Lupa password?</span></Link>
            ) : ''}
        </div>
    )
}