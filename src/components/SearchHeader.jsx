import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, BookOpen, User, Tag } from 'lucide-react';

export function SearchHeader({ onSearch, isLoading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), searchType);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Book Finder
          </h1>
          <div className="absolute -inset-1 bg-gradient-hero opacity-20 blur-lg rounded-full"></div>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover your next favorite book from millions of titles. Search by title, author, or subject to find exactly what you're looking for.
        </p>
      </div>

      {/* Search Interface */}
      <div className="bg-gradient-card rounded-xl shadow-book border p-6">
        <Tabs value={searchType} onValueChange={setSearchType} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="title" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Title
            </TabsTrigger>
            <TabsTrigger value="author" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Author
            </TabsTrigger>
            <TabsTrigger value="subject" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Subject
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSearch} className="space-y-4">
            <TabsContent value="title" className="mt-0">
              <div className="space-y-2">
                <Label htmlFor="title-search">Search by book title</Label>
                <div className="relative">
                  <Input
                    id="title-search"
                    placeholder="e.g., The Great Gatsby, Harry Potter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="author" className="mt-0">
              <div className="space-y-2">
                <Label htmlFor="author-search">Search by author name</Label>
                <div className="relative">
                  <Input
                    id="author-search"
                    placeholder="e.g., Stephen King, Jane Austen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="subject" className="mt-0">
              <div className="space-y-2">
                <Label htmlFor="subject-search">Search by subject or genre</Label>
                <div className="relative">
                  <Input
                    id="subject-search"
                    placeholder="e.g., Science Fiction, Romance, History..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
              </div>
            </TabsContent>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:bg-primary-hover shadow-glow"
              disabled={isLoading || !searchQuery.trim()}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search Books
                </>
              )}
            </Button>
          </form>
        </Tabs>
      </div>
    </div>
  );
}
