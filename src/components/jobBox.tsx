import { Select, MenuItem, TextField, SelectChangeEvent } from '@mui/material';
import React, { ChangeEvent } from 'react';
import FormContainer from './formContainer';
import InputTemplate from './inputTemplate';

interface Props {
    jobIndex: number;
    jobHistory: any;
    setJobHistory: (jobHistory: any) => void;
}

export default function JobBox({ jobIndex, setJobHistory, jobHistory }: Props) {
    const occupations = ['Head of Engineering', 'Senior Frontend Engineer', 'Junior UX Designer'];

    const currentJobIndexKey = `job${jobIndex}`;
    const currentJobDetails = jobHistory[currentJobIndexKey];
    const handleOccupationChange = (e: SelectChangeEvent) => setJobHistory({ ...jobHistory, [`job${jobIndex}`]: { ...currentJobDetails, occupation: e.target.value } });
    const handleCompanyNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setJobHistory({ ...jobHistory, [`job${jobIndex}`]: { ...currentJobDetails, companyName: e.target.value } });
    const handleIncomeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setJobHistory({ ...jobHistory, [`job${jobIndex}`]: { ...currentJobDetails, income: parseInt(e.target.value) } });

    return (
        <>
            <FormContainer title={`Job ${jobIndex}`} inputElements={[
                <InputTemplate title={"What's your current occupation?"}
                    input={
                        <Select
                            data-testid={`job-${jobIndex}-occupation-select`}
                            fullWidth
                            size='small'
                            id={`job-${jobIndex}-occupation-select`}
                            value={jobHistory[currentJobIndexKey].occupation}
                            onChange={handleOccupationChange}
                        >
                            <MenuItem value={'No option specified'}>Select</MenuItem>
                            {occupations.map(occupation => <MenuItem key={`${jobIndex}-${occupation}`} value={occupation}>{occupation}</MenuItem>)}
                        </Select>
                    } />,
                <InputTemplate title={'Company Name'} input={<TextField onChange={handleCompanyNameChange} inputProps={{ "data-testid": `job-${jobIndex}-company-name-textfield`}} value={jobHistory[currentJobIndexKey].companyName} fullWidth size='small' placeholder='Enter Company Name' />} />,
                <InputTemplate title={'Income'} input={<TextField onChange={handleIncomeChange}  inputProps={{ "data-testid": `job-${jobIndex}-income-textfield`}} value={jobHistory[currentJobIndexKey].income} fullWidth size='small' placeholder='Enter Amount' />} />
            ]} />
        </>
    )
}