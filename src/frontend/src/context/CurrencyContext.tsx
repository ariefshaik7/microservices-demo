import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'INR';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (amountInUSD: number) => string;
    rate: number;
    loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_SYMBOLS: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    INR: '₹'
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>('USD');
    const [rate, setRate] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchRate = async () => {
            if (currency === 'USD') {
                setRate(1);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.post('/api/currency/convert', {
                    from: 'USD',
                    to: currency,
                    amount: 1
                });
                setRate(response.data.rate);
            } catch (error) {
                console.error('Failed to fetch currency rate:', error);
                // Fallback to 1 if failed
                setRate(1);
            } finally {
                setLoading(false);
            }
        };

        fetchRate();
    }, [currency]);

    const formatPrice = (amountInUSD: number) => {
        const converted = amountInUSD * rate;
        return `${CURRENCY_SYMBOLS[currency]}${converted.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, rate, loading }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
