import React, { useEffect, useState } from "react";
import "./styles/App.css";
import TextInput from "./components/TextInput";
import Button from "./components/Button";
import { Line } from "react-chartjs-2";

const App = () => {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [bmi, setBmi] = useState();
  const [bmiClass, setBmiClass] = useState();
  const [chartData, setChartData] = useState({});
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleHeightChange = (event) => setHeight(event.target.value);
  const handleWeightChange = (event) => setWeight(event.target.value);

  const computeBmi = () => {
    const bmiValue = (weight / (height / 100) ** 2).toFixed(2);
    setBmi(bmiValue);
    const bmiClass = getBmi(bmiValue);
    setBmiClass(bmiClass);
    setHeight("");
    setWeight("");
  };

  const getBmi = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    }
    if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal weight";
    }
    if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    }
    if (bmi >= 30) {
      return "Obesity";
    }
  };

  const chart = () => {
    setChartData({
      labels: [date],
      datasets: [
        {
          label: "BMI Chart",
          data: [bmi],
          fill: true,
          backgroundColor: "rgba(6, 156,51, .3)",
          borderColor: "#02b844",
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className='App'>
      <div className='container'>
        <div
          style={{
            display: "block",
            width: "50%",
            margin: "0 auto",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <h2>Welcome to our BMI Calculator!</h2>
        </div>
        <div className='row'>
          <TextInput
            label='Height'
            placeholder='Enter height in cm'
            handleChange={handleHeightChange}
            value={height}
          />
        </div>
        <div className='row'>
          <TextInput
            label='Weight'
            placeholder='Enter weight in kg'
            handleChange={handleWeightChange}
            value={weight}
          />
        </div>
        <div className='row'>
          <Button label='CALCULATE' onClick={computeBmi} />
        </div>
        <div className='row'>
          {isNaN(bmi) ? null : <h3>Your BMI = {bmi}</h3>}
        </div>
        <div className='row'>
          <h3>{bmiClass}</h3>
        </div>
        <div className='row'>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default App;
