"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Alert,
  Loading,
  LoadingSkeleton,
  ProgressBar,
  Breadcrumb,
  Pagination,
  SearchBar,
  Tabs,
  Tooltip,
  DropdownMenu,
  Modal,
} from "../components/ui";
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioButton,
  FileUpload,
} from "../components/forms";
import { ModuleCard } from "../components/content";
import { Container } from "../components/layout";

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <div className="space-y-16">
          <header>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              Design System
            </h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive, minimalist component library for the educational
              platform.
            </p>
          </header>

          <section className="space-y-8">
            <div>
              <h2 className="mb-4 text-3xl font-semibold">Typography</h2>
              <Card>
                <CardContent className="space-y-4">
                  <div>
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <h4>Heading 4</h4>
                    <h5>Heading 5</h5>
                    <h6>Heading 6</h6>
                    <p>
                      Body text with a comfortable reading experience. Lorem ipsum
                      dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Colors</h2>
              <Card>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <div>
                      <h3 className="mb-3 text-sm font-medium">Neutral</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded border bg-background" />
                          <span className="text-sm">Background</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded border bg-surface" />
                          <span className="text-sm">Surface</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded border bg-muted" />
                          <span className="text-sm">Muted</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-medium">Brand</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-primary" />
                          <span className="text-sm">Primary</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-secondary" />
                          <span className="text-sm">Secondary</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-medium">Status</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-success" />
                          <span className="text-sm">Success</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-warning" />
                          <span className="text-sm">Warning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-danger" />
                          <span className="text-sm">Danger</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-info" />
                          <span className="text-sm">Info</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-medium">Subjects</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-subject-math" />
                          <span className="text-sm">Math</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-subject-science" />
                          <span className="text-sm">Science</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-subject-language" />
                          <span className="text-sm">Language</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-subject-history" />
                          <span className="text-sm">History</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-subject-arts" />
                          <span className="text-sm">Arts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Buttons</h2>
              <Card>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-3 text-sm font-medium">Variants</h3>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="success">Success</Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-medium">Sizes</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-medium">States</h3>
                      <div className="flex flex-wrap gap-3">
                        <Button isLoading>Loading</Button>
                        <Button disabled>Disabled</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Form Components</h2>
              <Card>
                <CardContent className="space-y-6">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    helperText="We'll never share your email."
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error="Password is too short"
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter module description..."
                    rows={4}
                  />
                  <Select
                    label="Subject"
                    placeholder="Select a subject"
                    options={[
                      { value: "math", label: "Mathematics" },
                      { value: "science", label: "Science" },
                      { value: "language", label: "Language" },
                      { value: "history", label: "History" },
                      { value: "arts", label: "Arts" },
                    ]}
                  />
                  <div className="space-y-3">
                    <Checkbox label="I agree to the terms and conditions" />
                    <Checkbox label="Subscribe to newsletter" />
                  </div>
                  <div className="space-y-3">
                    <RadioButton name="role" label="Viewer" value="viewer" />
                    <RadioButton
                      name="role"
                      label="Contributor"
                      value="contributor"
                    />
                    <RadioButton
                      name="role"
                      label="Moderator"
                      value="moderator"
                    />
                  </div>
                  <FileUpload
                    label="Module File"
                    helperText="Upload an HTML file for your interactive module"
                    onFileSelect={(file) => console.log(file)}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Badges</h2>
              <Card>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Alerts</h2>
              <Card>
                <CardContent className="space-y-3">
                  <Alert variant="info" title="Info">
                    This is an informational message.
                  </Alert>
                  <Alert variant="success" title="Success">
                    Your module has been uploaded successfully!
                  </Alert>
                  <Alert variant="warning" title="Warning">
                    Your module is pending approval.
                  </Alert>
                  <Alert variant="danger" title="Error">
                    Failed to upload module. Please try again.
                  </Alert>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Loading States</h2>
              <Card>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Spinners</h3>
                    <div className="flex items-center gap-4">
                      <Loading size="sm" />
                      <Loading size="md" />
                      <Loading size="lg" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Skeleton</h3>
                    <div className="space-y-2">
                      <LoadingSkeleton className="h-4 w-full" />
                      <LoadingSkeleton className="h-4 w-3/4" />
                      <LoadingSkeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Progress Bar</h2>
              <Card>
                <CardContent className="space-y-4">
                  <ProgressBar value={30} showLabel />
                  <ProgressBar value={60} showLabel />
                  <ProgressBar value={90} showLabel />
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Navigation</h2>
              <Card>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Breadcrumb</h3>
                    <Breadcrumb
                      items={[
                        { label: "Home", href: "/" },
                        { label: "Subjects", href: "/subjects" },
                        { label: "Mathematics", href: "/subjects/math" },
                        { label: "Algebra" },
                      ]}
                    />
                  </div>
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Pagination</h3>
                    <Pagination
                      currentPage={1}
                      totalPages={10}
                      onPageChange={(page) => console.log(page)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Search</h2>
              <Card>
                <CardContent>
                  <SearchBar
                    onSearch={(value) => setSearchValue(value)}
                    onClear={() => setSearchValue("")}
                    placeholder="Search for modules..."
                  />
                  {searchValue && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Searching for: <strong>{searchValue}</strong>
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Tabs</h2>
              <Card>
                <CardContent>
                  <Tabs
                    tabs={[
                      {
                        id: "overview",
                        label: "Overview",
                        content: (
                          <p className="text-sm">Overview content here</p>
                        ),
                      },
                      {
                        id: "modules",
                        label: "Modules",
                        content: (
                          <p className="text-sm">Module list would go here</p>
                        ),
                      },
                      {
                        id: "settings",
                        label: "Settings",
                        content: (
                          <p className="text-sm">Settings options here</p>
                        ),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Modal & Dropdown</h2>
              <Card>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => setIsModalOpen(true)}>
                      Open Modal
                    </Button>
                    <DropdownMenu
                      trigger={<Button variant="secondary">Actions</Button>}
                      items={[
                        { label: "Edit", onClick: () => console.log("Edit") },
                        { label: "Duplicate", onClick: () => console.log("Duplicate") },
                        { label: "Delete", onClick: () => console.log("Delete"), destructive: true },
                      ]}
                    />
                    <Tooltip content="This is a helpful tooltip">
                      <Button variant="ghost">Hover me</Button>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-semibold">Module Card</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ModuleCard
                  title="Introduction to Algebra"
                  description="Learn the fundamentals of algebraic expressions and equations."
                  subject="math"
                  status="approved"
                />
                <ModuleCard
                  title="Photosynthesis Explained"
                  description="Understand how plants convert sunlight into energy."
                  subject="science"
                  status="pending"
                />
                <ModuleCard
                  title="Shakespeare's Sonnets"
                  description="Explore the beauty and depth of Shakespeare's poetry."
                  subject="language"
                  status="approved"
                />
              </div>
            </div>
          </section>
        </div>
      </Container>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p className="text-sm">
          This is a modal dialog with a title, content area, and footer
          actions.
        </p>
      </Modal>
    </div>
  );
}
