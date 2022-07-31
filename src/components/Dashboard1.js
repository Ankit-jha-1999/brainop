import React ,{useState, useEffect}from 'react'
import './Dashboard1.css'
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const testResults = require("../testData/testResult.json")

const Dashboard1 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [mean, setMean] = useState({})
  const [median, setMedian] = useState({})
  const [ideal, setIdeal] = useState(testResults.data[0])

const [graphData, setGraphData] = useState([ { Name: 'Warmth', Ideal: 4, },
{ Name: 'Reasoning', Ideal: 0 },
{ Name: 'Emotional Stability', Ideal: 4 },
{ Name: 'Dominance', Ideal: 4 },
{ Name: 'Liveliness', Ideal: 0 },
{ Name: 'Rule Conciousness', Ideal: 4 },
{ Name: 'Social Boldness', Ideal: 4 },
{ Name: 'Sensitivity', Ideal: 0 },
{ Name: 'Vigilance', Ideal: 0 },
{ Name: 'Abstractedness', Ideal: 0 },
{ Name: 'Privateness', Ideal: 4 },
{ Name: 'Apprehension', Ideal: 0 },
{ Name: 'Openness to change', Ideal: 4 },
{ Name: 'Self Reliance', Ideal: 4 },
{ Name: 'Perfectionism', Ideal: 4 },
{ Name: 'Tension', Ideal: 0 } ])


  const options = testResults.data.map((data, i)=>{
    return {
      "label" : data["Name"],
      "Warmth": data["Warmth"],
      "Reasoning": data["Reasoning"],
      "Emotional Stability": data["Emotional Stability"],
      "Dominance": data["Dominance"],
      "Liveliness": data["Liveliness"],
      "Rule Conciousness": data["Rule Conciousness"],
      "Social Boldness": data["Social Boldness"],
      "Sensitivity": data["Sensitivity"],
      "Vigilance": data["Vigilance"],
      "Abstractedness": data["Abstractedness"],
      "Privateness": data["Privateness"],
      "Apprehension": data["Apprehension"],
      "Openness to change": data["Openness to change"],
      "Self Reliance": data["Self Reliance"],
      "Perfectionism": data["Perfectionism"],
      "Tension": data["Tension"],
      "value" : `${i}`
    }
  })

  function meanOfData(arr){
    const meanObj = {}
        for(let data of arr){
      for(let [key,value] of Object.entries(data)){
        if(key !== "Name"){
          if(meanObj[key]){
            meanObj[key] += value
          }else{
            meanObj[key]=value
          }
        }
      }
    }
    const avgObj ={}
    for(let key in meanObj){
        avgObj[key] = +parseFloat(meanObj[key] / testResults.data.length).toFixed(2)
      }
    return avgObj
  }

  function medianOfData(ideal){
    let medianObj ={}
      for(let [key,value] of Object.entries(ideal)){
        if(key !== "Name"){
            let median = 0
          const arr = testResults.data.sort((a, b)=> a[key] - b[key])
           if(arr.length % 2 !== 0){
                  median = arr[( Math.ceil([arr.length/2]))-1][key]
                }else{
                  median = (arr[(arr.length/2)-1][key] + arr[arr.length/2][key])/2
                }
          medianObj[key] = median
        }
      }
      return medianObj
  }


  useEffect(() => {
    if(selectedOption){
      let arr = []
      console.log("selectedOption",selectedOption)
      console.log("idea",ideal)
    for(let [key, value] of Object.entries(ideal)){
      if(key !== "Name")
      arr.push(
          {
              Name: key,
              [ideal["Name"]] : value,
              [selectedOption["label"]] : selectedOption[key],
              Mean : mean[key] || 0,
              Median: median[key] || 0
          })
        }
        setGraphData(arr)
      }
  
  setMean(()=>meanOfData(testResults.data))
  setMedian(()=>medianOfData(ideal))

  }
  , [selectedOption])

  return (
    <div className="dashboard">
    <div className='patient-container'>
    {
      <div className='patientname'>
      <h4>Sychometric Graph of <span className='name'>{selectedOption? selectedOption['label'] : "Ideal"}</span></h4>
      </div>
    }
    <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        className="search"
        placeholder="Select patient name"
      />
      </div>
      <div className="graph-container">
     <ResponsiveContainer width="97%" aspect={3}>
        <BarChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Name" interval={0}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Ideal" fill="#2df74e" />
          {
            selectedOption ? <Bar dataKey={selectedOption['label']} fill="#0390fc" />:
            null
          }
          <Bar dataKey="Mean" fill="#fcd303" />
          <Bar dataKey="Median" fill="#fa5ccb" />
        </BarChart>
      </ResponsiveContainer> 
      </div>
      </ div>
  )
}

export default Dashboard1