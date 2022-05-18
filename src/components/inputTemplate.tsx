import * as React from 'react';
import '../App.css';

interface Props {
    title: string;
    input: JSX.Element;
}

export default function InputTemplate({ title, input }: Props) {
    return (
        <div>
            <p style={{
                fontSize: '1rem',
                fontWeight: 500,
                margin: '0px 0px 8px 0px'
            }}>{title}</p>
            {input}
        </div>
    );
}
