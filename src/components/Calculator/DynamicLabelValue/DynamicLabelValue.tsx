import React from 'react';
import s from './DynamicLabelValue.module.scss'

interface DynamicLabelProps {
    label: string;
    value: string | number;
}

const DynamicLabelValue = ({label, value}: DynamicLabelProps) => {
    return (
        <div>
            <h3 className={s.label}>{label}</h3>
            <div className={s.value}>{value}</div>
        </div>
    );
};

export default DynamicLabelValue;