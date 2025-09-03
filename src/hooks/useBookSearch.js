// useBookSearch.js

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useBookSearch() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchBooks = useCallback(async (query, type) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      let searchUrl = 'https://openlibrary.org/search.json?';
      const params = new URLSearchParams();

      switch (type) {
        case 'title':
          params.append('title', query);
          break;
        case 'author':
          params.append('author', query);
          break;
        case 'subject':
          params.append('subject', query);
          break;
        default:
          break;
      }

      params.append('limit', '20');
      params.append(
        'fields',
        'key,title,author_name,first_publish_year,cover_i,publisher,subject,isbn,page_count_median'
      );

      searchUrl += params.toString();

      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.docs.length === 0) {
        toast({
          title: 'No books found',
          description: `We couldn't find any books matching "${query}". Try a different search term.`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Search completed',
          description: `Found ${data.numFound} books matching "${query}"`,
        });
      }

      setBooks(data.docs);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search failed',
        description: 'Unable to search for books. Please check your connection and try again.',
        variant: 'destructive',
      });
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    books,
    isLoading,
    hasSearched,
    searchBooks,
  };
}
