import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CepSearch from '../components/CepSearch/CepSearch';
import * as cepService from '../services/cepService';

// Mock do serviço de CEP
vi.mock('../services/cepService');

describe('Feature: ZIP Code Search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Scenario: Search for a valid ZIP code successfully', () => {
    it('Given the user is on the ZIP code search page', () => {
      render(<CepSearch />);
      expect(screen.getByText('ZIP Code Search')).toBeInTheDocument();
    });

    it('When the user enters a valid ZIP code and clicks search', async () => {
      const mockCepData = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      };

      vi.mocked(cepService.searchCEP).mockResolvedValue(mockCepData);

      render(<CepSearch />);
      const input = screen.getByTestId('cep-input');
      const button = screen.getByTestId('search-button');

      await userEvent.type(input, '01001000');
      fireEvent.click(button);

      await waitFor(() => {
        expect(cepService.searchCEP).toHaveBeenCalledWith('01001-000');
      });
    });

    it('Then the system should display the address data', async () => {
      const mockCepData = {
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      };

      vi.mocked(cepService.searchCEP).mockResolvedValue(mockCepData);

      render(<CepSearch />);
      const input = screen.getByTestId('cep-input');
      const button = screen.getByTestId('search-button');

      await userEvent.type(input, '01001000');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByTestId('cep-result')).toBeInTheDocument();
      });

      expect(screen.getByText('Praça da Sé')).toBeInTheDocument();
      expect(screen.getByText('Sé')).toBeInTheDocument();
      expect(screen.getByText('São Paulo')).toBeInTheDocument();
      expect(screen.getByText('SP')).toBeInTheDocument();
    });
  });

  describe('Scenario: Search for an invalid ZIP code', () => {
    it('Given the user is on the ZIP code search page', () => {
      render(<CepSearch />);
      expect(screen.getByText('ZIP Code Search')).toBeInTheDocument();
    });

    it('When the user enters an invalid ZIP code and clicks search', async () => {
      vi.mocked(cepService.searchCEP).mockRejectedValue(
        new Error('ZIP code not found')
      );

      render(<CepSearch />);
      const input = screen.getByTestId('cep-input');
      const button = screen.getByTestId('search-button');

      await userEvent.type(input, '99999999');
      fireEvent.click(button);

      await waitFor(() => {
        expect(cepService.searchCEP).toHaveBeenCalled();
      });
    });

    it('Then the system should display an error message', async () => {
      vi.mocked(cepService.searchCEP).mockRejectedValue(
        new Error('ZIP code not found')
      );

      render(<CepSearch />);
      const input = screen.getByTestId('cep-input');
      const button = screen.getByTestId('search-button');

      await userEvent.type(input, '99999999');
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });

      expect(screen.getByText('ZIP code not found')).toBeInTheDocument();
    });
  });

  describe('Scenario: Display loading during search', () => {
    it('Given the user started a ZIP code search', async () => {
      vi.mocked(cepService.searchCEP).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      );

      render(<CepSearch />);
      const input = screen.getByTestId('cep-input');
      const button = screen.getByTestId('search-button');

      await userEvent.type(input, '01001000');
      fireEvent.click(button);

      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Searching...');
    });
  });

  describe('Scenario: Automatic ZIP code formatting', () => {
    it('When the user types only numbers', async () => {
      render(<CepSearch />);
      const input = screen.getByTestId('cep-input') as HTMLInputElement;

      await userEvent.type(input, '01001000');

      expect(input.value).toBe('01001-000');
    });
  });
});
