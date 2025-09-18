import { useState, useEffect } from 'react';

interface UseDebounceSearchOptions {
  delay?: number;
  onSearch?: (searchTerm: string) => void;
}

interface UseDebounceSearchReturn {
  searchInput: string;
  searchTerm: string;
  setSearchInput: (value: string) => void;
  setSearchTerm: (value: string) => void;
  clearSearch: () => void;
}

/**
 * Custom hook để quản lý debounce search
 * 
 * @param options - Cấu hình cho hook
 * @param options.delay - Thời gian delay (mặc định 500ms)
 * @param options.onSearch - Callback được gọi khi search term thay đổi
 * @returns Object chứa các state và function để quản lý search
 */
export const useDebounceSearch = (options: UseDebounceSearchOptions = {}): UseDebounceSearchReturn => {
  const { delay = 500, onSearch } = options;
  
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      onSearch?.(searchInput);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchInput, delay, onSearch]);

  const clearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  return {
    searchInput,
    searchTerm,
    setSearchInput,
    setSearchTerm,
    clearSearch,
  };
};
