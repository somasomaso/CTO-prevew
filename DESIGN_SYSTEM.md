# Design System Documentation

A comprehensive, minimalist design system built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## 🎨 Design Principles

1. **Minimalism**: Clean, uncluttered interfaces with generous whitespace
2. **Accessibility**: WCAG AA compliant with proper focus states and keyboard navigation
3. **Consistency**: Unified visual language across all components
4. **Performance**: Optimized animations and efficient rendering
5. **Responsive**: Mobile-first approach for all screen sizes

## 🎯 Design Tokens

### Colors

The design system uses a comprehensive color palette based on HSL values with CSS custom properties for easy theming:

#### Neutral Colors
- `background` - Main background color
- `foreground` - Primary text color
- `surface` - Card/surface background
- `muted` - Muted backgrounds
- `muted-foreground` - Muted text
- `border` - Border color
- `ring` - Focus ring color

#### Brand Colors
- `primary` - Primary brand color (blue)
- `secondary` - Secondary actions (gray)

#### Status Colors
- `success` - Success states (green)
- `warning` - Warning states (amber)
- `danger` - Error/destructive actions (red)
- `info` - Informational states (blue)

#### Subject Colors (Educational)
- `subject-math` - Mathematics (purple)
- `subject-science` - Science (green)
- `subject-language` - Language (orange)
- `subject-history` - History (yellow)
- `subject-arts` - Arts (pink)

### Typography

System font stack for optimal performance and native feel:
- **Sans-serif**: `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`
- **Monospace**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas`

**Scale**:
- h1: 2.25rem (36px) - Hero headings
- h2: 1.875rem (30px) - Section headings
- h3: 1.5rem (24px) - Subsection headings
- h4: 1.25rem (20px) - Card headings
- h5: 1.125rem (18px) - Small headings
- h6: 1rem (16px) - Label headings
- body: 1rem (16px) - Base text
- small: 0.875rem (14px) - Helper text
- xs: 0.75rem (12px) - Captions

### Spacing

Consistent spacing scale using Tailwind's default spacing:
- 0.25rem (4px)
- 0.5rem (8px)
- 0.75rem (12px)
- 1rem (16px)
- 1.5rem (24px)
- 2rem (32px)
- 3rem (48px)
- 4rem (64px)

### Border Radius
- `sm`: 0.375rem (6px) - Small elements
- `md`: 0.5rem (8px) - Default
- `lg`: 0.75rem (12px) - Large cards

### Shadows
- `sm`: Subtle elevation
- `md`: Default cards
- `lg`: Modals and overlays

### Transitions
- `fast`: 150ms - Hover states
- `base`: 200ms - Default
- `slow`: 300ms - Complex animations

## 📦 Component Library

### UI Components (`app/components/ui/`)

#### Button
Versatile button component with multiple variants and sizes.

**Variants**: `primary`, `secondary`, `ghost`, `danger`, `success`  
**Sizes**: `sm`, `md`, `lg`  
**Features**: Loading state, disabled state, icons support

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="md">Click me</Button>
<Button variant="secondary" isLoading>Loading...</Button>
<Button variant="danger" disabled>Disabled</Button>
```

#### Card
Content container with optional elevation and sections.

**Components**: `Card`, `CardHeader`, `CardContent`, `CardFooter`  
**Variants**: `default`, `elevated`

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui";

<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer actions</CardFooter>
</Card>
```

#### Badge
Small label for tags, status indicators, and metadata.

**Variants**: `default`, `primary`, `success`, `warning`, `danger`, `info`  
**Sizes**: `sm`, `md`

```tsx
import { Badge } from "@/components/ui";

<Badge variant="success">Approved</Badge>
<Badge variant="warning" size="md">Pending</Badge>
```

#### Alert
Contextual feedback messages.

**Variants**: `info`, `success`, `warning`, `danger`

```tsx
import { Alert } from "@/components/ui";

<Alert variant="success" title="Success">
  Your module has been uploaded!
</Alert>
```

#### Loading
Loading indicators and skeleton screens.

**Components**: `Loading`, `LoadingOverlay`, `LoadingSkeleton`  
**Sizes**: `sm`, `md`, `lg`

```tsx
import { Loading, LoadingSkeleton } from "@/components/ui";

<Loading size="md" />
<LoadingSkeleton className="h-4 w-full" />
```

#### ProgressBar
Visual progress indicator.

```tsx
import { ProgressBar } from "@/components/ui";

<ProgressBar value={60} max={100} showLabel />
```

#### Modal
Dialog overlay for confirmations and forms.

**Sizes**: `sm`, `md`, `lg`, `xl`

```tsx
import { Modal } from "@/components/ui";

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={<Button>Confirm</Button>}
>
  Are you sure?
</Modal>
```

#### Tooltip
Contextual information on hover.

**Positions**: `top`, `bottom`, `left`, `right`

```tsx
import { Tooltip } from "@/components/ui";

<Tooltip content="Helpful info" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

#### Tabs
Tabbed content navigation.

```tsx
import { Tabs } from "@/components/ui";

<Tabs
  tabs={[
    { id: "1", label: "Tab 1", content: <div>Content 1</div> },
    { id: "2", label: "Tab 2", content: <div>Content 2</div> },
  ]}
/>
```

#### DropdownMenu
Action menu with items.

```tsx
import { DropdownMenu } from "@/components/ui";

<DropdownMenu
  trigger={<Button>Actions</Button>}
  items={[
    { label: "Edit", onClick: () => {} },
    { label: "Delete", onClick: () => {}, destructive: true },
  ]}
  align="end"
/>
```

#### Breadcrumb
Hierarchical navigation.

```tsx
import { Breadcrumb } from "@/components/ui";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Subjects", href: "/subjects" },
    { label: "Math" },
  ]}
/>
```

#### Pagination
Page navigation controls.

```tsx
import { Pagination } from "@/components/ui";

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => console.log(page)}
/>
```

#### SearchBar
Prominent search input with clear functionality.

```tsx
import { SearchBar } from "@/components/ui";

<SearchBar
  onSearch={(value) => console.log(value)}
  onClear={() => console.log("cleared")}
  placeholder="Search modules..."
/>
```

#### Toast
Temporary notification messages.

**Variants**: `info`, `success`, `warning`, `danger`

```tsx
import { Toast } from "@/components/ui";

<Toast
  variant="success"
  title="Success"
  message="Operation completed"
  onClose={() => {}}
  duration={5000}
/>
```

### Form Components (`app/components/forms/`)

#### Input
Text input with label, error, and helper text.

```tsx
import { Input } from "@/components/forms";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
  helperText="We'll never share your email"
  leftIcon={<Icon />}
/>
```

#### Textarea
Multi-line text input.

```tsx
import { Textarea } from "@/components/forms";

<Textarea
  label="Description"
  placeholder="Enter description..."
  rows={4}
  error="Too short"
/>
```

#### Select
Dropdown selection.

```tsx
import { Select } from "@/components/forms";

<Select
  label="Subject"
  placeholder="Select a subject"
  options={[
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
  ]}
/>
```

#### Checkbox
Single checkbox with label.

```tsx
import { Checkbox } from "@/components/forms";

<Checkbox label="I agree to terms" />
```

#### RadioButton
Radio button for selection groups.

```tsx
import { RadioButton } from "@/components/forms";

<RadioButton name="role" value="admin" label="Administrator" />
<RadioButton name="role" value="user" label="User" />
```

#### FileUpload
Drag-and-drop file upload.

```tsx
import { FileUpload } from "@/components/forms";

<FileUpload
  label="Module File"
  accept=".html"
  maxSize={10 * 1024 * 1024}
  onFileSelect={(file) => console.log(file)}
/>
```

### Layout Components (`app/components/layout/`)

#### Container
Responsive content wrapper.

**Sizes**: `sm`, `md`, `lg`, `xl`, `full`

```tsx
import { Container } from "@/components/layout";

<Container size="lg">Content here</Container>
```

#### Navbar
Sticky header with navigation and user menu.

```tsx
import { Navbar } from "@/components/layout";

<Navbar title="EduPlatform" />
```

#### Sidebar
Collapsible navigation sidebar.

```tsx
import { Sidebar } from "@/components/layout";

<Sidebar
  items={[
    {
      id: "1",
      label: "Dashboard",
      href: "/dashboard",
      children: [
        { id: "1-1", label: "Overview", href: "/dashboard/overview" },
      ],
    },
  ]}
/>
```

#### Footer
Minimal footer with links.

```tsx
import { Footer } from "@/components/layout";

<Footer />
```

### Content Components (`app/components/content/`)

#### ModuleCard
Display card for educational modules.

```tsx
import { ModuleCard } from "@/components/content";

<ModuleCard
  title="Introduction to Algebra"
  description="Learn algebra fundamentals"
  subject="math"
  status="approved"
/>
```

## 🌗 Dark Mode

Dark mode support is built-in using CSS custom properties. Toggle dark mode by adding the `dark` class to the `<html>` element:

```tsx
document.documentElement.classList.toggle("dark");
```

## ♿ Accessibility

All components follow accessibility best practices:

- **Semantic HTML**: Proper use of HTML5 elements
- **ARIA attributes**: Where needed for enhanced screen reader support
- **Keyboard navigation**: Full keyboard support for interactive elements
- **Focus indicators**: Visible focus states for all interactive elements
- **Color contrast**: WCAG AA compliant color combinations
- **Motion preferences**: Respects `prefers-reduced-motion`

## 📱 Responsive Design

Mobile-first approach with breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚀 Usage

### Import components:

```tsx
// UI components
import { Button, Card, Badge, Alert } from "@/components/ui";

// Form components
import { Input, Textarea, Select } from "@/components/forms";

// Layout components
import { Container, Navbar, Footer } from "@/components/layout";

// Content components
import { ModuleCard } from "@/components/content";
```

### Using design tokens in custom styles:

```tsx
// In Tailwind classes
<div className="bg-primary text-primary-foreground" />

// CSS custom properties
<div style={{ color: "hsl(var(--color-primary))" }} />
```

## 📚 Examples

Visit `/design-system` to see all components with live examples and usage patterns.

## 🛠 Development

The design system is organized in:
- `app/components/ui/` - Base UI components
- `app/components/forms/` - Form components
- `app/components/layout/` - Layout components
- `app/components/content/` - Content-specific components
- `app/components/common/` - Utilities
- `app/globals.css` - CSS custom properties and base styles
- `tailwind.config.ts` - Tailwind configuration and design tokens

All components are fully typed with TypeScript for excellent developer experience.
