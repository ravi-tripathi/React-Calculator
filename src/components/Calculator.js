import React, { useState } from 'react'
import Button from './Button';

const Calculator = ({isScien}) => {

    const [operator, setOperator] = useState(null);
    const [display, setDisplay] = useState('0');
    const [prevKeyType, setPrev] =useState('');
    const [firstValue, setFirstValue] = useState(null);
    const [modValue, setModValue] = useState('');

    const calculate = (n1, operator, n2) => {
        const fn = parseFloat(n1);
        const sn = parseFloat(n2);
        if(operator === '+') return fn + sn;
        if(operator === '-'){
            return fn - sn;   
        } 
        if(operator === '/') {
            if(sn !== 0) {
                return fn / sn;
            }else{
                return 0;
            }
        }
        if(operator === '*') return fn * sn;
    }
    
    const onKeyPress = (content, type) => () => {
        if (type === 'number') {
            if (display === '0' || prevKeyType === 'operator' || prevKeyType === 'calculate') {
                if(prevKeyType === 'calculate') setOperator('');
                setDisplay(content);
              } else {
                setDisplay(display + content)
              }
            setFirstValue(display);
            setPrev(type);
        }

        if(type === 'operator') {
            if (firstValue && operator && prevKeyType !== 'operator' && prevKeyType !== 'calculate') {
                let result = calculate(firstValue,operator,display)
                setDisplay(result);
                setFirstValue(result);
            }else{
                setFirstValue(display);
            }
            setPrev(type);
            setFirstValue(display);
            setOperator(content);
        }

        if(type === 'calculate') {
            let secondValue = display;
            if(firstValue){
                if (prevKeyType === 'calculate') {
                   setFirstValue(display);
                   secondValue = modValue;
                }
                setDisplay(calculate(firstValue, operator, secondValue));
            }
            setModValue(secondValue);
            setPrev(type);
        }

        if(type === 'clearall') {
            if(content === 'clearall'){
                setFirstValue('');
                setModValue('');
                setOperator('');
                setPrev('');
            }
            setDisplay('0')
            setPrev(type);
        }

        if (type === 'decimal') {
            if(!display.includes('.')){
                setDisplay(display+'.')
            }else if (prevKeyType === 'operator' || prevKeyType === 'calculate') {
                setDisplay('0.');
            }
            setPrev(type);
        }

        if(type==='scientific') {
            if(content === '-/+'){
                setDisplay(-display);
            }
            if(content === 'Sq'){
                setDisplay(display*display);
            }
            if(content === 'Sqrt'){
                setDisplay(Math.sqrt(display))
            }
        }
    };
    
  return (
    <div className='calculatorContainer'>
      <div className="display">{display}</div>
      {isScien}
      <div className="buttons">
        <Button onButtonClick={onKeyPress} content="1" type="number"/>
        <Button onButtonClick={onKeyPress} content="2" type="number"/>
        <Button onButtonClick={onKeyPress} content="3" type="number"/>
        <Button onButtonClick={onKeyPress} content="+" type="operator" />
        <Button onButtonClick={onKeyPress} content="4" type="number"/>
        <Button onButtonClick={onKeyPress} content="5" type="number"/>
        <Button onButtonClick={onKeyPress} content="6" type="number"/>
        <Button onButtonClick={onKeyPress} content="-" type="operator" />
        <Button onButtonClick={onKeyPress} content="7" type="number"/>
        <Button onButtonClick={onKeyPress} content="8" type="number"/>
        <Button onButtonClick={onKeyPress} content="9" type="number"/>
        <Button onButtonClick={onKeyPress} content="*" type="operator" />
        <Button onButtonClick={onKeyPress} content="Clear" type="clearall" />
        <Button onButtonClick={onKeyPress} content="0" type="number"/>
        <Button onButtonClick={onKeyPress} content="=" type="calculate" />
        <Button onButtonClick={onKeyPress} content="/" type="operator" />
        { (isScien)? <>
        <Button onButtonClick={onKeyPress} content="-/+" type="scientific" />
        <Button onButtonClick={onKeyPress} content="Sq" type="scientific" />
        <Button onButtonClick={onKeyPress} content="Sqrt" type="scientific" />
        </> : ''}
      </div>
      <div className="bottom" />
    </div>
  )
}

export default Calculator;