import { getPayload } from 'payload'
import config from '@/payload.config'
import { Blog } from '@/payload-types';
import dotenv from 'dotenv';

dotenv.config();

const sampleBlogPost = {
  title: "Building a Modern React TypeScript Application: A Complete Guide",
  slug: "building-modern-react-typescript-application-complete-guide",
  excerpt: "Learn how to build a production-ready React application with TypeScript, featuring best practices, advanced patterns, and real-world examples. This comprehensive guide covers everything from project setup to deployment.",
  category: "tutorial",
  subcategory: "Frontend Development",
  difficulty: "intermediate",
  primaryLanguage: "typescript",
  technologies: [
    { technology: "React" },
    { technology: "TypeScript" },
    { technology: "Vite" },
    { technology: "Tailwind CSS" },
    { technology: "React Query" },
    { technology: "Zustand" },
    { technology: "React Hook Form" },
    { technology: "Vitest" }
  ],
  series: {
    isPartOfSeries: true,
    seriesName: "Modern React Development",
    seriesOrder: 1,
    seriesDescription: "A comprehensive series covering modern React development practices, tools, and patterns for building scalable applications."
  },
  tableOfContents: [
    { heading: "Introduction", anchor: "introduction", level: "2" },
    { heading: "Project Setup", anchor: "project-setup", level: "2" },
    { heading: "TypeScript Configuration", anchor: "typescript-configuration", level: "2" },
    { heading: "Component Architecture", anchor: "component-architecture", level: "2" },
    { heading: "State Management", anchor: "state-management", level: "2" },
    { heading: "API Integration", anchor: "api-integration", level: "2" },
    { heading: "Testing Strategy", anchor: "testing-strategy", level: "2" },
    { heading: "Performance Optimization", anchor: "performance-optimization", level: "2" },
    { heading: "Deployment", anchor: "deployment", level: "2" },
    { heading: "Conclusion", anchor: "conclusion", level: "2" }
  ],
  prerequisites: [
    { prerequisite: "Basic knowledge of JavaScript ES6+" },
    { prerequisite: "Understanding of React fundamentals" },
    { prerequisite: "Familiarity with Node.js and npm" },
    { prerequisite: "Basic command line usage" }
  ],
  learningOutcomes: [
    { outcome: "Set up a modern React TypeScript project from scratch" },
    { outcome: "Implement proper TypeScript configurations and patterns" },
    { outcome: "Build reusable and scalable component architecture" },
    { outcome: "Integrate state management with Zustand" },
    { outcome: "Implement efficient API data fetching with React Query" },
    { outcome: "Write comprehensive tests with Vitest and Testing Library" },
    { outcome: "Optimize application performance and bundle size" },
    { outcome: "Deploy the application to production" }
  ],
  tags: [
    { tag: "react" },
    { tag: "typescript" },
    { tag: "frontend" },
    { tag: "javascript" },
    { tag: "web-development" },
    { tag: "tutorial" },
    { tag: "best-practices" },
    { tag: "modern-development" },
    { tag: "component-architecture" },
    { tag: "state-management" }
  ],
  externalLinks: [
    {
      title: "React Official Documentation",
      url: "https://react.dev",
      description: "The official React documentation with guides and API reference"
    },
    {
      title: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/",
      description: "Comprehensive guide to TypeScript language features and best practices"
    },
    {
      title: "Vite Guide",
      url: "https://vitejs.dev/guide/",
      description: "Fast build tool for modern web projects"
    },
    {
      title: "React Query Documentation",
      url: "https://tanstack.com/query/latest",
      description: "Powerful data synchronization for React applications"
    }
  ],
  featured: true,
  allowComments: true,
  status: "published",
  publishedAt: new Date().toISOString(),
  readingTime: 15,
  seo: {
    metaTitle: "Building Modern React TypeScript Apps: Complete 2024 Guide",
    metaDescription: "Master React TypeScript development with this comprehensive guide. Learn best practices, advanced patterns, and build production-ready applications.",
    keywords: "react, typescript, frontend development, web development, javascript, tutorial, best practices, modern development",
    canonicalUrl: "",
    ogImage: null
  },
  content: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'Introduction' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'In today\'s rapidly evolving web development landscape, building robust and maintainable React applications requires more than just knowing the basics. This comprehensive guide will walk you through creating a modern React application with TypeScript, incorporating industry best practices and cutting-edge tools that will make your development process more efficient and your applications more reliable.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'callout',
            type: 'info',
            title: 'What You\'ll Build',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', text: 'Throughout this tutorial, we\'ll build a complete task management application with user authentication, real-time updates, and a modern UI. The final application will demonstrate all the concepts covered in this guide.' }
                    ]
                  }
                ]
              }
            }
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'Project Setup' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Let\'s start by setting up our project with Vite, which provides lightning-fast development experience and optimized production builds. We\'ll use the React TypeScript template to get started quickly.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'Initialize New React TypeScript Project',
            language: 'bash',
            code: `# Create a new Vite project with React TypeScript template
npm create vite@latest my-react-app -- --template react-ts

# Navigate to the project directory
cd my-react-app

# Install dependencies
npm install

# Install additional dependencies for our modern stack
npm install @tanstack/react-query zustand react-hook-form @hookform/resolvers zod
npm install -D @types/node @vitejs/plugin-react tailwindcss postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Initialize Tailwind CSS
npx tailwindcss init -p`,
            runnable: true,
            showLineNumbers: true
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'TypeScript Configuration' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'A well-configured TypeScript setup is crucial for maintaining code quality and developer experience. Let\'s set up a robust TypeScript configuration that enforces best practices.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'Enhanced TypeScript Configuration',
            language: 'json',
            code: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
            runnable: false,
            showLineNumbers: true
          }
        },
        {
          type: 'block',
          fields: {
            blockType: 'callout',
            type: 'tip',
            title: 'Pro Tip: Strict TypeScript Configuration',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', text: 'The strict configuration above helps catch potential bugs early and enforces consistent coding patterns. While it might seem restrictive initially, it significantly improves code quality and maintainability in the long run.' }
                    ]
                  }
                ]
              }
            }
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'Component Architecture' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Building a scalable component architecture is essential for maintainable React applications. We\'ll implement a component structure that promotes reusability and follows React best practices.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'Reusable Button Component with TypeScript',
            language: 'tsx',
            code: `import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };`,
            runnable: false,
            showLineNumbers: true
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'State Management' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'For state management, we\'ll use Zustand, a lightweight and intuitive state management solution that works perfectly with TypeScript. It provides a simple API while being powerful enough for complex applications.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'Zustand Store with TypeScript',
            language: 'typescript',
            code: `import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Define the task interface
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the store interface
interface TaskStore {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
  error: string | null;

  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TaskStore['filter']) => void;
  clearCompleted: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Create the store with middleware
export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        tasks: [],
        filter: 'all',
        isLoading: false,
        error: null,

        addTask: (taskData) => {
          set((state) => {
            const newTask: Task = {
              ...taskData,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            state.tasks.push(newTask);
          });
        },

        updateTask: (id, updates) => {
          set((state) => {
            const taskIndex = state.tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
              state.tasks[taskIndex] = {
                ...state.tasks[taskIndex],
                ...updates,
                updatedAt: new Date(),
              };
            }
          });
        },

        deleteTask: (id) => {
          set((state) => {
            state.tasks = state.tasks.filter(task => task.id !== id);
          });
        },

        toggleTask: (id) => {
          set((state) => {
            const task = state.tasks.find(task => task.id === id);
            if (task) {
              task.completed = !task.completed;
              task.updatedAt = new Date();
            }
          });
        },

        setFilter: (filter) => {
          set({ filter });
        },

        clearCompleted: () => {
          set((state) => {
            state.tasks = state.tasks.filter(task => !task.completed);
          });
        },

        setLoading: (isLoading) => {
          set({ isLoading });
        },

        setError: (error) => {
          set({ error });
        },
      })),
      {
        name: 'task-store',
        partialize: (state) => ({ tasks: state.tasks, filter: state.filter }),
      }
    ),
    { name: 'task-store' }
  )
);

// Selectors for derived state
export const useFilteredTasks = () => {
  const tasks = useTaskStore(state => state.tasks);
  const filter = useTaskStore(state => state.filter);

  return tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });
};`,
            runnable: false,
            showLineNumbers: true
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'API Integration' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'React Query (TanStack Query) provides excellent data fetching capabilities with built-in caching, background updates, and error handling. Let\'s integrate it into our application.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'React Query Setup and Custom Hooks',
            language: 'typescript',
            code: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

// API client with proper error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = \`\${this.baseURL}\${endpoint}\`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

const apiClient = new ApiClient(import.meta.env.VITE_API_URL || '/api');

// Zod schemas for API validation
const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

type Task = z.infer<typeof TaskSchema>;
type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

// Custom hooks for API operations
export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => apiClient.get<Task[]>('/tasks'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskInput) =>
      apiClient.post<Task>('/tasks', data),
    onSuccess: (newTask) => {
      // Optimistically update the cache
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old ? [...old, newTask] : [newTask]
      );
    },
    onError: (error) => {
      console.error('Failed to create task:', error);
      // Handle error (show toast, etc.)
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Task> & { id: string }) =>
      apiClient.put<Task>(\`/tasks/\${id}\`, data),
    onSuccess: (updatedTask) => {
      // Update the specific task in the cache
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ) || []
      );
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(\`/tasks/\${id}\`),
    onSuccess: (_, deletedId) => {
      // Remove the task from the cache
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.filter(task => task.id !== deletedId) || []
      );
    },
  });
};`,
            runnable: false,
            showLineNumbers: true
          }
        },
        {
          type: 'block',
          fields: {
            blockType: 'callout',
            type: 'warning',
            title: 'Error Handling Best Practice',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', text: 'Always implement proper error handling in your API calls. React Query provides excellent error boundaries and retry mechanisms, but you should also handle errors gracefully in your UI components.' }
                    ]
                  }
                ]
              }
            }
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'Testing Strategy' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'A comprehensive testing strategy is crucial for maintaining code quality. We\'ll set up unit tests, integration tests, and end-to-end tests using modern testing tools.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'Component Testing with Vitest and Testing Library',
            language: 'typescript',
            code: `import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskForm } from '@/components/TaskForm';
import { useCreateTask } from '@/hooks/useTasks';

// Mock the custom hook
vi.mock('@/hooks/useTasks');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('TaskForm', () => {
  const mockCreateTask = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCreateTask as any).mockReturnValue({
      mutate: mockCreateTask,
      isPending: false,
      error: null,
    });
  });

  it('renders form fields correctly', () => {
    render(<TaskForm />, { wrapper: createWrapper() });

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const user = userEvent.setup();
    render(<TaskForm />, { wrapper: createWrapper() });

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /create task/i });

    await user.type(titleInput, 'Test Task');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
        priority: 'medium',
        completed: false,
      });
    });
  });

  it('displays validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<TaskForm />, { wrapper: createWrapper() });

    const submitButton = screen.getByRole('button', { name: /create task/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', () => {
    (useCreateTask as any).mockReturnValue({
      mutate: mockCreateTask,
      isPending: true,
      error: null,
    });

    render(<TaskForm />, { wrapper: createWrapper() });

    const submitButton = screen.getByRole('button', { name: /creating/i });
    expect(submitButton).toBeDisabled();
  });

  it('displays error message on submission failure', () => {
    const errorMessage = 'Failed to create task';
    (useCreateTask as any).mockReturnValue({
      mutate: mockCreateTask,
      isPending: false,
      error: new Error(errorMessage),
    });

    render(<TaskForm />, { wrapper: createWrapper() });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});`,
            runnable: false,
            showLineNumbers: true
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'Performance Optimization' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Performance optimization is crucial for providing a smooth user experience. Let\'s implement several optimization techniques including code splitting, memoization, and bundle analysis.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'twoColumn',
            leftColumn: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 3,
                    children: [
                      { type: 'text', text: 'React.memo for Component Optimization' }
                    ]
                  },
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', text: 'Use React.memo to prevent unnecessary re-renders of components that receive the same props.' }
                    ]
                  }
                ]
              }
            },
            rightColumn: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    tag: 3,
                    children: [
                      { type: 'text', text: 'useMemo and useCallback' }
                    ]
                  },
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', text: 'Optimize expensive calculations and prevent function recreation on every render.' }
                    ]
                  }
                ]
              }
            }
          }
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'Performance Optimization Techniques',
            language: 'typescript',
            code: `import React, { memo, useMemo, useCallback, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Lazy load components for code splitting
const TaskModal = lazy(() => import('@/components/TaskModal'));
const TaskChart = lazy(() => import('@/components/TaskChart'));

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
  onTaskDelete: (id: string) => void;
  filter: string;
}

// Memoized component to prevent unnecessary re-renders
const TaskList = memo<TaskListProps>(({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  filter
}) => {
  // Memoize expensive calculations
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      switch (filter) {
        case 'active':
          return !task.completed;
        case 'completed':
          return task.completed;
        default:
          return true;
      }
    }).sort((a, b) => {
      // Sort by priority and due date
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime();
    });
  }, [tasks, filter]);

  // Memoize callback functions to prevent child re-renders
  const handleTaskToggle = useCallback((id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      onTaskUpdate(id, { completed: !task.completed });
    }
  }, [tasks, onTaskUpdate]);

  const handleTaskEdit = useCallback((id: string, updates: Partial<Task>) => {
    onTaskUpdate(id, updates);
  }, [onTaskUpdate]);

  // Virtualization for large lists (using react-window)
  const Row = useCallback(({ index, style }: any) => {
    const task = filteredTasks[index];
    return (
      <div style={style}>
        <TaskItem
          key={task.id}
          task={task}
          onToggle={handleTaskToggle}
          onEdit={handleTaskEdit}
          onDelete={onTaskDelete}
        />
      </div>
    );
  }, [filteredTasks, handleTaskToggle, handleTaskEdit, onTaskDelete]);

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Use react-window for virtualization with large lists */}
      {filteredTasks.length > 100 ? (
        <FixedSizeList
          height={600}
          itemCount={filteredTasks.length}
          itemSize={80}
          width="100%"
        >
          {Row}
        </FixedSizeList>
      ) : (
        filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleTaskToggle}
            onEdit={handleTaskEdit}
            onDelete={onTaskDelete}
          />
        ))
      )}
    </div>
  );
});

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="text-center py-8">
    <h2 className="text-lg font-semibold text-red-600 mb-2">
      Something went wrong
    </h2>
    <p className="text-muted-foreground mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-primary text-white rounded-md"
    >
      Try again
    </button>
  </div>
);

// Main component with error boundary and suspense
export const TaskManager = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Task Manager</h1>

        <Suspense fallback={<div>Loading tasks...</div>}>
          <TaskList />
        </Suspense>

        <Suspense fallback={<div>Loading modal...</div>}>
          <TaskModal />
        </Suspense>

        <Suspense fallback={<div>Loading chart...</div>}>
          <TaskChart />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

TaskList.displayName = 'TaskList';`,
            runnable: false,
            showLineNumbers: true
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'Deployment' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Finally, let\'s deploy our application to production. We\'ll use Vercel for its excellent React support and automatic deployments.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'codePlayground',
            title: 'Production Build and Deployment',
            language: 'bash',
            code: `# Build the application for production
npm run build

# Preview the production build locally
npm run preview

# Deploy to Vercel (after installing Vercel CLI)
npm i -g vercel
vercel

# Or deploy using GitHub integration
# 1. Push your code to GitHub
# 2. Connect your repository to Vercel
# 3. Automatic deployments on every push

# Environment variables for production
# Create .env.production file:
VITE_API_URL=https://your-api.com
VITE_APP_ENV=production`,
            runnable: true,
            showLineNumbers: true
          }
        },
        {
          type: 'block',
          fields: {
            blockType: 'callout',
            type: 'success',
            title: 'Deployment Checklist',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'list',
                    listType: 'bullet',
                    children: [
                      {
                        type: 'listitem',
                        children: [
                          { type: 'text', text: 'Configure environment variables' }
                        ]
                      },
                      {
                        type: 'listitem',
                        children: [
                          { type: 'text', text: 'Set up error monitoring (Sentry)' }
                        ]
                      },
                      {
                        type: 'listitem',
                        children: [
                          { type: 'text', text: 'Configure analytics (Google Analytics)' }
                        ]
                      },
                      {
                        type: 'listitem',
                        children: [
                          { type: 'text', text: 'Set up performance monitoring' }
                        ]
                      },
                      {
                        type: 'listitem',
                        children: [
                          { type: 'text', text: 'Configure custom domain and SSL' }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          }
        },
        {
          type: 'heading',
          tag: 2,
          children: [
            { type: 'text', text: 'Conclusion' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Congratulations! You\'ve successfully built a modern React TypeScript application with industry best practices. This foundation will serve you well for building scalable, maintainable applications.' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Key takeaways from this guide:' }
          ]
        },
        {
          type: 'list',
          listType: 'bullet',
          children: [
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'TypeScript configuration is crucial for maintaining code quality' }
              ]
            },
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'Component architecture should prioritize reusability and maintainability' }
              ]
            },
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'State management with Zustand provides a clean, type-safe solution' }
              ]
            },
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'React Query simplifies data fetching and caching' }
              ]
            },
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'Comprehensive testing ensures application reliability' }
              ]
            },
            {
              type: 'listitem',
              children: [
                { type: 'text', text: 'Performance optimization techniques improve user experience' }
              ]
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Continue exploring advanced topics like micro-frontends, server-side rendering with Next.js, and advanced testing strategies to further enhance your React development skills.' }
          ]
        },
        {
          type: 'block',
          fields: {
            blockType: 'callout',
            type: 'info',
            title: 'What\'s Next?',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      { type: 'text', text: 'In the next part of this series, we\'ll explore advanced patterns like compound components, render props, and custom hooks. We\'ll also dive into performance profiling and optimization techniques for large-scale applications.' }
                    ]
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
};

async function createSampleBlog() {
  try {
    console.log('🌱 Creating comprehensive sample blog post...');

    const payload = await getPayload({ config });

    const createdBlog = await payload.create({
      collection: 'blogs',
      data: sampleBlogPost as unknown as Blog,
    });

    console.log('✅ Sample blog post created successfully!');
    console.log(`📝 Title: ${createdBlog.title}`);
    console.log(`🔗 Slug: ${createdBlog.slug}`);
    console.log(`📊 Reading time: ${createdBlog.readingTime} minutes`);
    console.log(`🏷️ Tags: ${sampleBlogPost.tags.map(t => t.tag).join(', ')}`);
    console.log(`🛠️ Technologies: ${sampleBlogPost.technologies.map(t => t.technology).join(', ')}`);

  } catch (error) {
    console.error('❌ Error creating sample blog post:', error);
  }
}

export default createSampleBlog;

createSampleBlog()
  .then(() => {
    console.log('✅ Sample blog post created successfully!');
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error creating sample blog post:', error);
    process.exit(1)
  })
