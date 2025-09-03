import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, User } from 'lucide-react';

export function BookCard({ book }) {
  const [imageError, setImageError] = useState(false);

  const getCoverUrl = (coverId, size = 'M') => {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' & ');
    return `${authors[0]} & ${authors.length - 1} others`;
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-0 shadow-book hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg bg-muted">
          {book.cover_i && !imageError ? (
            <img
              src={getCoverUrl(book.cover_i, 'L')}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-primary">
              <BookOpen className="w-16 h-16 text-primary-foreground opacity-60" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2 text-sm leading-tight">
              {book.title}
            </h3>
            <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
              <User className="w-3 h-3" />
              {formatAuthors(book.author_name || [])}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {book.first_publish_year && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {book.first_publish_year}
              </div>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-3 text-xs hover:bg-primary/10">
                  Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">{book.title}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-muted">
                      {book.cover_i && !imageError ? (
                        <img
                          src={getCoverUrl(book.cover_i, 'L')}
                          alt={`Cover of ${book.title}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-primary">
                          <BookOpen className="w-16 h-16 text-primary-foreground opacity-60" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Authors</h4>
                      <p className="text-muted-foreground">{formatAuthors(book.author_name || [])}</p>
                    </div>

                    {book.first_publish_year && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">First Published</h4>
                        <p className="text-muted-foreground">{book.first_publish_year}</p>
                      </div>
                    )}

                    {book.publisher && book.publisher.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Publishers</h4>
                        <p className="text-muted-foreground">{book.publisher.slice(0, 3).join(', ')}</p>
                      </div>
                    )}

                    {book.page_count_median && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Pages</h4>
                        <p className="text-muted-foreground">{book.page_count_median} pages</p>
                      </div>
                    )}

                    {book.subject && book.subject.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Subjects</h4>
                        <div className="flex flex-wrap gap-1">
                          {book.subject.slice(0, 8).map((subject, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
