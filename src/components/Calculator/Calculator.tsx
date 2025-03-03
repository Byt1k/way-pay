'use client'
import React, {useCallback, useMemo, useState} from 'react';
import NumberInput from "@/components/ui/NumberInput/NumberInput";
import DynamicLabelValue from "@/components/Calculator/DynamicLabelValue/DynamicLabelValue";
import {Form} from "react-bootstrap";
//module styles
import s from './Calculator.module.scss'


const months = [
    {value: "1", label: 'Январь'},
    {value: "2", label: 'Февраль'},
    {value: "3", label: 'Март'},
    {value: "4", label: 'Апрель'},
    {value: "5", label: 'Май'},
    {value: "6", label: 'Июнь'},
    {value: "7", label: 'Июль'},
    {value: "8", label: 'Август'},
    {value: "9", label: 'Сентябрь'},
    {value: "10", label: 'Октябрь'},
    {value: "11", label: 'Ноябрь'},
    {value: "12", label: 'Декабрь'},
];

const Calculator = () => {
    const [sum, setSum] = useState('');
    const [monthCount, setMonthCount] = useState('');
    const [allowance, setAllowance] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [roundUp, setRoundUp] = useState('50');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const currentYear = new Date().getFullYear()

    const totalSum = useMemo(() => {
        if (!sum || !allowance) return {totalSum: 0, allowanceCount: 0}
        const allowanceCount = Number(sum.replace(/\s+/g, '')) * Number(allowance.replace(/\s+/g, '')) / 100;
        return {
            totalSum: allowanceCount + Number(sum.replace(/\s+/g, '')),
            allowanceCount,
        }

    }, [sum, allowance])

    const totalDebt = useMemo(() => {
        return Number(totalSum.totalSum) - Number(downPayment.replace(/\s+/g, ''));
    }, [downPayment, totalSum])

    const paymentPerMonth = useMemo(() => {
        if (!monthCount) return 0;
        const value = totalDebt / Number(monthCount.replace(/\s+/g, ''));
        return Math.ceil(value / 50) * 50;
    }, [totalDebt, monthCount]);

    const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(e.target.value);
    };

    const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
    };

    const calculateLastMonth = useCallback(() => {
        if (!selectedMonth || !selectedYear) return ''
        const startMonthIndex = Number(selectedMonth) - 1; // Индекс месяца в массиве
        const totalMonths = startMonthIndex + (Number(monthCount.replace(/\s+/g, '')) / 100) * 100; // Общее количество месяцев
        const years = Math.floor(totalMonths / 12); // Количество лет
        const lastMonthIndex = totalMonths % 12; // Индекс последнего месяца
        const lastYear = Number(selectedYear) + years;
        const lastMonthLabel = lastMonthIndex === 0 ? months[11]?.label : months[lastMonthIndex - 1]?.label;
        return `${lastMonthLabel} ${lastYear}`
    }, [selectedMonth, selectedYear, monthCount])

    return (
        <div className={s.calculator}>
            <h2 className={s.title}>Калькулятор</h2>
            <div className={s.container}>
                <div className={s.calculatorWrapper}>
                    <h3 className={s.subtitle}>Параметры рассрочки</h3>
                    <NumberInput value={sum} onChange={setSum} label={"Сумма рассрочки, руб.:"} placeholder={'100000'}/>
                    <NumberInput value={monthCount} onChange={setMonthCount} label={"Количество месяцев:"}
                                 placeholder={'12'}/>
                    <NumberInput value={allowance} onChange={setAllowance} label={"Надбавка, %:"} placeholder={'20'}/>
                    <NumberInput value={downPayment} onChange={setDownPayment} label={"Первоначальный взнос, руб:"}
                                 placeholder={'10000'}/>
                    <NumberInput value={roundUp} onChange={() => {
                    }} label={"Округлять до, руб:"}/>

                    <div className={s.selectWrapper}>
                        <span>Начало выплат:</span>
                        <Form.Select className={`me-3 ${s.select}`} value={selectedMonth} onChange={handleMonth}>
                            <option value="">Выберите месяц</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Select className={`me-3 ${s.select}`} value={selectedYear} onChange={handleYear}>
                            <option value="">Выберите год</option>
                            <option value={currentYear}>{currentYear}</option>
                            <option value={currentYear + 1}>{currentYear + 1}</option>
                        </Form.Select>
                    </div>

                </div>
                <div className={s.resultInfoWrapper}>
                    <DynamicLabelValue label={"Общая сумма, руб:"} value={totalSum.totalSum}/>
                    <DynamicLabelValue label={"Переплата по надбавке, руб:"} value={totalSum.allowanceCount}/>
                    <DynamicLabelValue label={"Сумма ежемесячного платежа, руб:"} value={paymentPerMonth}/>
                    <DynamicLabelValue label={"Суммарный долг, руб:"} value={totalDebt}/>
                    <DynamicLabelValue label={"Последний месяц оплаты:"} value={calculateLastMonth()}/>
                </div>

            </div>


        </div>
    );
};

export default Calculator;