import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('Only renders 0 jobs option by default', () => {
    render(<App />);
    const currentStatusSelect = screen.queryByTestId('current-status-select');
    expect(currentStatusSelect).toBeInTheDocument();
  });

  test("Doesn't initially render job 1,2, and 3 options by default", () => {
    render(<App />);
    for (let i = 1; i < 4; i++) {
      const jobIncomeField = screen.queryByTestId(`job-${i}-income-textfield`);
      expect(jobIncomeField).not.toBeInTheDocument();

      const companyNameField = screen.queryByTestId(`job-${i}-company-name-textfield`);
      expect(companyNameField).not.toBeInTheDocument();

      const occupationSelectField = screen.queryByTestId(`job-${i}-occupation-select`);
      expect(occupationSelectField).not.toBeInTheDocument();
    }
  });

  test("Displays income, company name, and occupation inputs when 1 or more jobs are selected", () => {
    render(<App />);
    const jobAmountButtonTestId = (amount: number) => `job-amt-button-${amount}`;
    for (let chosenJobAmount = 1; chosenJobAmount < 4; chosenJobAmount++) {
      const jobAmountButton = screen.queryByTestId(jobAmountButtonTestId(chosenJobAmount));
      act(() => {
        jobAmountButton?.click();
      })

      for (let jobIndex = 1; jobIndex <= chosenJobAmount; jobIndex++) {
        const jobIncomeField = screen.queryByTestId(`job-${jobIndex}-income-textfield`);
        expect(jobIncomeField).toBeInTheDocument();

        const companyNameField = screen.queryByTestId(`job-${jobIndex}-company-name-textfield`);
        expect(companyNameField).toBeInTheDocument();

        const occupationSelectField = screen.queryByTestId(`job-${jobIndex}-occupation-select`);
        expect(occupationSelectField).toBeInTheDocument();
      }
    }
  });

  test("Doesn't display 0 job options when more than 0 jobs are", () => {
    render(<App />);
    const jobAmountButtonTestId = (amount: number) => `job-amt-button-${amount}`;
    for (let chosenJobAmount = 1; chosenJobAmount < 4; chosenJobAmount++) {
      const jobAmountButton = screen.queryByTestId(jobAmountButtonTestId(chosenJobAmount));
      act(() => {
        jobAmountButton?.click();
      })
      const currentStatusSelect = screen.queryByTestId('current-status-select');
      expect(currentStatusSelect).not.toBeInTheDocument();
    }
  });

  test("Retains previously entered job information after changing job amounts", async () => {
    render(<App />);
    const jobAmountButtonTestId = (amount: number) => `job-amt-button-${amount}`;
    act(() => {
      screen.queryByTestId(jobAmountButtonTestId(1))?.click();
    })
    const jobIncomeField = screen.queryByTestId(`job-1-income-textfield`) as HTMLInputElement;
    expect(jobIncomeField).toBeInTheDocument();
    fireEvent.change(jobIncomeField, { target: { value: '60000' } })
    expect(jobIncomeField.value).toBe('60000')

    const companyNameField = screen.queryByTestId(`job-1-company-name-textfield`) as HTMLInputElement;
    expect(companyNameField).toBeInTheDocument();
    fireEvent.change(companyNameField, { target: { value: 'test company' } })
    expect(companyNameField.value).toBe('test company')

    const occupationSelectField = screen.queryByTestId(`job-1-occupation-select`) as HTMLElement;
    expect(occupationSelectField).toBeInTheDocument();
    const input = occupationSelectField?.parentNode?.querySelector('[tabIndex=-1]') as HTMLElement;

    act(() => {
      fireEvent.change(input, { target: { value: 'Senior Frontend Engineer' } })
    })

    act(() => {
      screen.queryByTestId(jobAmountButtonTestId(0))?.click();
    })

    act(() => {
      screen.queryByTestId(jobAmountButtonTestId(1))?.click();
    })

    const incomeField = screen.queryByTestId(`job-1-income-textfield`) as HTMLInputElement;
    expect(incomeField.value).toBe('60000')

    const companyName = screen.queryByTestId(`job-1-company-name-textfield`) as HTMLInputElement;
    expect(companyName.value).toBe('test company')

    const occupationSelect = screen.queryByTestId('job-1-occupation-select') as HTMLInputElement;
    const occupationSelectInput = occupationSelect?.parentNode?.querySelector('[id=job-1-occupation-select]') as HTMLInputElement;
    expect(occupationSelectInput.innerHTML).toBe("Senior Frontend Engineer")
  });
})