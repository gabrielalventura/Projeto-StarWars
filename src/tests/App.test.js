import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import  APIMock from './helpers/tableMock';
import StarWarsProvider from '../context/StarWarsProvider';
import userEvent from '@testing-library/user-event';

describe('Testa elementos da página', () => {
  it('Teste a renderização de inputs', () => {

    render(
    <StarWarsProvider>
      <App />
    </StarWarsProvider>);

    const filterByName = screen.findByPlaceholderText(/'enter key words'/i)
    waitFor(() => expect(filterByName).toBeInTheDocument());

    const filterColumn = screen.findByTestId(/'column-filter'/i);
    waitFor(() => expect(filterColumn).toBeInTheDocument());
    waitFor(() => expect(filterColumn).toHaveLength(4));

    const filterOperator = screen.findByTestId(/'comparison-filter'/i);
    waitFor(() => expect(filterOperator).toBeInTheDocument())
    waitFor(() => expect(filterOperator).toHaveLength(2))

    const filterValue = screen.findAllByTestId(/'value-filter'/i);
    waitFor(() => expect(filterValue).toBeInTheDocument());
  });

  it('Testa se a API é chamada', () => {
      global.fetch = jest.fn(async () => ({
      json: async () => APIMock
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });

  it('Testa se o botão de filtrar', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => APIMock
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      const filterbtn = screen.getByRole('button', { name: 'Filtrar' });
      expect(filterbtn).toBeInTheDocument();
  });

  it('Testa se os filtros funcionam corretamente', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => APIMock
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      const usingFilter = screen.getAllByRole('combobox');
      const valueFilter = screen.getByTestId('value-filter');
      const filterbtn = screen.getByRole('button', { name: 'Filtrar' });
      userEvent.selectOptions(usingFilter[0], ['surface_water']);
      userEvent.selectOptions(usingFilter[1], ['menor que']);
      userEvent.type(valueFilter, '1');
      userEvent.click(filterbtn);

      const result = screen.getAllByRole('row');
      waitFor(() => expect(result).toHaveLength(0));

      const filterByName = screen.getByRole('textbox', { type: 'text' });
      userEvent.type(filterByName, 'h' );

      const result2 = screen.getAllByRole('row');
      waitFor(() => expect(result2).toHaveLength(1));
  });

  it('Testa se a tabela é renderizada com todos os planetas', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => APIMock
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

      const table = screen.getAllByRole('row');
      waitFor(() => expect(table).toHaveLength(11));
  });

  it('Testa o comparativo `maior que`', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => APIMock
    }));

    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>);

    const usingFilter = screen.getAllByRole('combobox');
    const valueFilter = screen.getByTestId('value-filter');
    const filterbtn = screen.getByRole('button', { name: 'Filtrar' });

    userEvent.selectOptions(usingFilter[0], ['surface_water']);
    userEvent.selectOptions(usingFilter[1], ['maior que']);
    userEvent.type(valueFilter, '40');
    userEvent.click(filterbtn);

    const result = screen.getAllByRole('row');
      waitFor(() => expect(result).toHaveLength(1));

  })

  it('Testa o comparativo `igual a`', () => {
      global.fetch = jest.fn(async () => ({
        json: async () => APIMock
      }));
  
      render(
        <StarWarsProvider>
          <App />
        </StarWarsProvider>);
  
      const usingFilter = screen.getAllByRole('combobox');
      const valueFilter = screen.getByTestId('value-filter');
      const filterbtn = screen.getByRole('button', { name: 'Filtrar' });
  
      userEvent.selectOptions(usingFilter[0], ['surface_water']);
      userEvent.selectOptions(usingFilter[1], ['igual a']);
      userEvent.type(valueFilter, '40');
      userEvent.click(filterbtn);
  
      const result = screen.getAllByRole('row');
        waitFor(() => expect(result).toHaveLength(0));
  });
});


