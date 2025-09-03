import { SearchHeader } from "@/components/SearchHeader";
import { BookCard } from "@/components/BookCard";
import { useBookSearch } from "@/hooks/useBookSearch";
import { BookOpen, Search, Heart } from "lucide-react";

const Index = () => {
  const { books, isLoading, hasSearched, searchBooks } = useBookSearch();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-full bg-gradient-primary">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">BookFinder</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <SearchHeader onSearch={searchBooks} isLoading={isLoading} />

        {/* Results Section */}
        {hasSearched && (
          <div className="mt-12">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Searching through millions of books...</p>
              </div>
            ) : books.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Search Results ({books.length} books)
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {books.map((book) => (
                    <BookCard key={book.key} book={book} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-foreground mb-2">No books found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or explore different categories.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Welcome State */}
        {!hasSearched && (
          <div className="mt-12 text-center space-y-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Explore millions of books
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Book Finder connects you to the extensive Open Library database, giving you access
                to millions of books from around the world. Whether you're looking for classic literature,
                contemporary fiction, academic texts, or niche subjects, we'll help you discover your next great read.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-card rounded-lg p-6 shadow-book">
                <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Search by Title</h3>
                <p className="text-sm text-muted-foreground">
                  Find specific books by searching for their exact or partial titles.
                </p>
              </div>

              <div className="bg-gradient-card rounded-lg p-6 shadow-book">
                <Search className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Browse by Author</h3>
                <p className="text-sm text-muted-foreground">
                  Discover all works by your favorite authors or explore new ones.
                </p>
              </div>

              <div className="bg-gradient-card rounded-lg p-6 shadow-book">
                <Heart className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Explore by Subject</h3>
                <p className="text-sm text-muted-foreground">
                  Browse books by genre, topic, or academic subject area.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by the Open Library API • Built with ❤️ for book lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
