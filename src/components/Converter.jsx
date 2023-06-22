import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import {IoMdSwap} from "react-icons/io";
 
function Converter() {
  const apiUrl = "https://open.er-api.com/v6/latest/USD";
  const [currenciesList, setCurrencies] = useState([]);
 
  useEffect(() => {
    fetchCurrencies();
  }, []);
 
  async function fetchCurrencies() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const data = jsonData.rates;
    const temp = Object.entries(data).map((element) => {
      return {
        value: element[0],
        label: element[0],
        rate: element[1],
      };
    });
 
    setCurrencies(temp);
  }
 
  let defaultfirstCurrency = "USD";
  let defaultsecondCurrency = "INR";

 
  const [inputValue, setInputValue] = useState(1);
  let [firstCurrency, setFirstCurrency] = useState(defaultfirstCurrency);
  let [secondCurrency,  setsecondCurrency] = useState(defaultsecondCurrency);
  const [result,setResult] = useState(0);
 
 
 
  useEffect(() => {
    if(currenciesList.length === 0){
        return;
    }
 
    const firstCurrencyRate = currenciesList.find((element)=>{
        return element.value === firstCurrency
    })?.rate;
 
    const secondtCurrencyRate = currenciesList.find((element)=>{
        return element.value === secondCurrency
    })?.rate;
 
    if(firstCurrencyRate === undefined || secondtCurrencyRate === undefined){
        return;
    }
 
    const resultValue = (inputValue*secondtCurrencyRate)/firstCurrencyRate;
 
    setResult(resultValue.toFixed(3));
 
    // <p></p> // ******* Important thing that we discovered that it'll make changes in all the paragraph tags as well bro **********
 
}, [inputValue, firstCurrency, secondCurrency,result]);
 
const[swap,setSwap] = useState(false);
 
useEffect(()=>{
 
 
  console.log("First Currency = "+firstCurrency);
  console.log("second Currency = "+secondCurrency);
 
 
  setFirstCurrency(secondCurrency);
  setsecondCurrency(firstCurrency);
 
},[swap])
 
 
function button_swap(){
  if(swap===false){
    setSwap(true);
  }else{
    setSwap(false);
  }
}
 
  return (
    <div className="card-container">
      <Card title={<h2>Currency Converter</h2>}>
        <Form>
          <Form.Item>
            <Input
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            ></Input>
          </Form.Item>
          <div className="currency-selectors">
            <Select
              style={{ width: "180px" }}
              value={firstCurrency}
              options={currenciesList}
              defaultValue={defaultfirstCurrency}
              onChange={(value)=>{
                setFirstCurrency(value)
              }}
            ></Select>
 
            <Button className="swap-button" onClick={button_swap}>
              <IoMdSwap />
            </Button>
 
            <Select
              style={{ width: "180px" }}
              value={secondCurrency}
              options={currenciesList}
              defaultValue={defaultsecondCurrency}
              onChange={(value)=>{
                setsecondCurrency(value)
              }}
            ></Select>
          </div>
        </Form>
        <p style={{margin:"20px 0px 0px 0px"}}> {inputValue} {firstCurrency} = {result} {secondCurrency} </p>
      </Card>
    </div>
  );
}
 
export default Converter;
