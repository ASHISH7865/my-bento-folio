'use client'

import React, { useState, useMemo } from 'react';
import BlogCard from '@/components/Blog/BlogCard';
import { BookOpen, Search, Filter, Code, Zap, Target, Users, Lightbulb, Brain, Star, Calendar, Clock, Eye, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Blog } from '@/payload-types';

interface BlogPageClientProps {
  blogs: Blog[]
}

const categories = [
  { value: 'all', label: 'All Posts', icon: BookOpen, color: 'bg-gray-500/10 text-gray-600 border-gray-500/20' },
  { value: 'technology', label: 'Technology', icon: Zap, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  { value: 'development', label: 'Development', icon: Code, color: 'bg-green-500/10 text-green-600 border-green-500/20' },
  { value: 'tutorial', label: 'Tutorials', icon: Target, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  { value: 'best-practices', label: 'Best Practices', icon: Star, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  { value: 'ai-ml', label: 'AI/ML', icon: Brain, color: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
  { value: 'career', label: 'Career', icon: Users, color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
  { value: 'thoughts', label: 'Thoughts', icon: Lightbulb, color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
];

const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

const languages = [
  { value: 'all', label: 'All Languages' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'reading-time', label: 'Reading Time' },
];

export default function BlogPageClient({ blogs }: BlogPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    const filtered = blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.tags?.some(tag => tag.tag?.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || blog.difficulty === selectedDifficulty;
      const matchesLanguage = selectedLanguage === 'all' || blog.primaryLanguage === selectedLanguage;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesLanguage;
    });

    // Sort blogs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime();
        case 'oldest':
          return new Date(a.publishedAt || '').getTime() - new Date(b.publishedAt || '').getTime();
        case 'popular':
          return (b.likes || 0) - (a.likes || 0);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'reading-time':
          return (a.readingTime || 0) - (b.readingTime || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [blogs, searchTerm, selectedCategory, selectedDifficulty, selectedLanguage, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBlogs.length / postsPerPage);
  const paginatedBlogs = filteredAndSortedBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Stats
  const stats = useMemo(() => {
    const totalPosts = blogs.length;
    const tutorials = blogs.filter(b => b.category === 'tutorial').length;
    const techPosts = blogs.filter(b => b.category === 'technology' || b.category === 'development').length;
    const averageReadingTime = Math.round(blogs.reduce((sum, blog) => sum + (blog.readingTime || 0), 0) / blogs.length);
    const featuredPosts = blogs.filter(b => b.featured).length;

    return { totalPosts, tutorials, techPosts, averageReadingTime, featuredPosts };
  }, [blogs]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedLanguage('all');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedLanguage !== 'all';

  return (
    <div className="min-h-screen p-5 max-sm:p-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Blog
              </h1>
              <p className="text-muted-foreground text-lg">Thoughts, tutorials, and insights on development</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary">{stats.totalPosts}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-orange-500">{stats.tutorials}</div>
              <div className="text-sm text-muted-foreground">Tutorials</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-blue-500">{stats.techPosts}</div>
              <div className="text-sm text-muted-foreground">Tech Posts</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-green-500">{stats.averageReadingTime}m</div>
              <div className="text-sm text-muted-foreground">Avg. Read</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-500">{stats.featuredPosts}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 h-12 text-base bg-background/50 border-border/50 backdrop-blur-sm"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>

              {/* Quick Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Filters:</span>
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {categories.find(c => c.value === selectedCategory)?.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                    </Badge>
                  )}
                  {selectedDifficulty !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {difficulties.find(d => d.value === selectedDifficulty)?.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDifficulty('all')} />
                    </Badge>
                  )}
                  {selectedLanguage !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {languages.find(l => l.value === selectedLanguage)?.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLanguage('all')} />
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="p-4 rounded-lg bg-card/30 border border-border/50 backdrop-blur-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Difficulty Level</label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(difficulty => (
                          <SelectItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Programming Language</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(language => (
                          <SelectItem key={language.value} value={language.value}>
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-muted/30">
            {categories.map(category => {
              const Icon = category.icon;
              const count = category.value === 'all'
                ? blogs.length
                : blogs.filter(b => b.category === category.value).length;

              return (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="flex flex-col gap-1 p-3 data-[state=active]:bg-background"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{category.label}</span>
                  <Badge variant="secondary" className="text-xs h-5">
                    {count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category.value} value={category.value} className="mt-6">
              {/* Results Summary */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {category.value === 'all' ? 'All Posts' : category.label}
                    </h2>
                    <p className="text-muted-foreground">
                      {filteredAndSortedBlogs.length} {filteredAndSortedBlogs.length === 1 ? 'post' : 'posts'}
                      {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Blog Grid */}
              {paginatedBlogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedBlogs.map((blog) => (
                      <BlogCard key={blog.id} blog={blog} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No posts found</h2>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm
                      ? `No posts match your search for "${searchTerm}"`
                      : 'No posts in this category yet'
                    }
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
