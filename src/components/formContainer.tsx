import * as React from 'react';
import Box from '@mui/material/Box';
import '../App.css';

interface Props {
  title?: string;
  inputElements: JSX.Element[];
}

export default function FormContainer({ title, inputElements }: Props) {
  return (
    <Box
      sx={{
        width: '60vw',
        minHeight: '10vh',
        margin: '16px',
        borderRadius: '8px',
        border: '2px solid #e3e3e3',
        textAlign: 'initial',
        padding: '16px',
      }}
    >
      {title && <h3 style={{
        margin: '0px',
        fontSize: '1.25rem',
        fontWeight: 400,
        marginBottom: '8px'
      }}>{title}</h3>}
      <div className='input-box-inputs-div'>
        {inputElements.map((el, idx) => <div key={`input-el-${idx}-${title ?? ''}`}>{el}</div>)}
      </div>
    </Box>
  );
}
