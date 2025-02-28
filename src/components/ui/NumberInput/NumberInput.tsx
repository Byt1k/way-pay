'use client'
import React, {ChangeEvent, InputHTMLAttributes, useState} from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder'>

interface NumberInputPropsType extends HTMLInputProps {
    label?: string,
    placeholder?: string,
    value: string,
    onChange: (value: string) => void,

}

const NumberInput = ({label, placeholder, value, onChange}: NumberInputPropsType) => {

    // const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.replace(/\D/g, ''); // Удалить все нечисловые символы

        // Проверка на начало с нуля
        if (inputValue.length > 1 && inputValue.startsWith('0')) {
            inputValue = inputValue.substring(1); // Удалить ведущий ноль
        }

        const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // Добавить пробелы между тысячами
        onChange(formattedValue);
    };
    return (<div>
            {!!label && <span>{label}</span>}
            <input type="text" value={value} onChange={handleChange} className="form-control"
                   placeholder={placeholder}/>
        </div>

    );
};

export default NumberInput;