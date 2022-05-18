import { Button, ButtonGroup, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import FormContainer from './components/formContainer';
import InputTemplate from './components/inputTemplate';
import JobBox from './components/jobBox';

interface NoJobDetails {
  currentStatus: string;
}

interface JobDetails {
  occupation: string;
  companyName: string;
  income: number;
}

interface JobHistory {
  job1: JobDetails;
  job2: JobDetails;
  job3: JobDetails;
  noJob: NoJobDetails;
}

const NO_OPTION_SPECIFIED = 'No option specified'

const noJobInfoYet = {
  occupation: NO_OPTION_SPECIFIED,
  companyName: '',
  income: 0
}

const initialJobHistory = {
  job1: noJobInfoYet,
  job2: noJobInfoYet,
  job3: noJobInfoYet,
  noJob: {currentStatus: NO_OPTION_SPECIFIED}
}

function App() {
  const [jobHistory, setJobHistory] = useState<JobHistory>(initialJobHistory);
  const [chosenJobAmount, setChosenJobAmount] = useState<number>(0);
  const allJobAmounts = [0, 1, 2, 3];

  const handleJobAmountClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setChosenJobAmount(parseInt(e.currentTarget.value));
  };

  const jobBoxes = Array.from({ length: chosenJobAmount }, (value, index) => index).map((jobAmount) => <JobBox key={jobAmount} jobHistory={jobHistory} setJobHistory={setJobHistory} jobIndex={jobAmount + 1} />);
  const whatsYourCurrentStatusBox = <FormContainer inputElements={[
    <InputTemplate title={"What is your current status?"}
      input={
        <Select
          fullWidth
          size='small'
          data-testid={'current-status-select'}
          value={jobHistory.noJob.currentStatus}
          id="current-status-select"
          onChange={(e, anv) => {
            setJobHistory({...jobHistory, noJob: {currentStatus: e.target.value as string}})
          }}
        >
          <MenuItem value={'No option specified'}>Select</MenuItem>
          {['Seeking Work', 'Studying'].map(currentStatus => <MenuItem key={currentStatus} value={currentStatus}>{currentStatus}</MenuItem>)}
        </Select>
      } />
  ]} />

  return (
    <div className="App">
      <FormContainer
        inputElements={[<InputTemplate title={'How many jobs do you have?'} input={<ButtonGroup>{allJobAmounts.map(amount => <Button key={amount} data-testid={`job-amt-button-${amount}`} onClick={(e) => handleJobAmountClick(e)} value={amount} variant={chosenJobAmount === amount ? 'contained' : 'outlined'}>{amount}</Button>)}</ButtonGroup>} />]}
      />
      {chosenJobAmount === 0 ? whatsYourCurrentStatusBox : jobBoxes}
    </div>
  );
}

export default App;
