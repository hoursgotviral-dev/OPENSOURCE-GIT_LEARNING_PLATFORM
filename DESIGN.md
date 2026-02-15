# Design Document: AI-Powered Git & Open Source Learning Platform

## Table of Contents
1. [System Architecture](#1-system-architecture)
2. [Component Design](#2-component-design)
3. [Data Architecture](#3-data-architecture)
4. [API Design](#4-api-design)
5. [Security Design](#5-security-design)
6. [Scalability & Performance](#6-scalability--performance)
7. [UI/UX Design](#7-uiux-design)
8. [Error Handling & Recovery](#8-error-handling--recovery)
9. [Deployment Architecture](#9-deployment-architecture)

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │   Monaco   │  │  Terminal  │  │  Mission   │             │
│  │   Editor   │  │ Simulator  │  │   Panel    │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│         Next.js + React + Tailwind CSS                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Backend Layer                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │    Git     │  │ Validator  │  │   State    │             │
│  │   Engine   │  │  Service   │  │  Manager   │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│              Node.js + Express.js                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         AWS Layer                           │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │  API Gateway │────────▶│    Lambda    │                 |
│  │              │         │ Orchestrator │                  │
│  └──────────────┘         └──────────────┘                  │
│                                  │                          │ 
│                    ┌─────────────┴─────────────┐            │
│                    ▼                           ▼            │
│           ┌────────────────┐         ┌────────────────┐     │
│           │ Amazon Bedrock │         │   DynamoDB     │     │
│           │   (AI Model)   │         │   (Database)   │     │
│           └────────────────┘         └────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Architecture Principles

- **Separation of Concerns**: Frontend handles UI, backend handles business logic, AWS handles AI and persistence
- **Serverless-First**: Use Lambda and managed services to reduce operational overhead
- **Cost Optimization**: Local validation reduces AI API calls
- **Progressive Enhancement**: Core features work offline, AI enhances the experience
- **Scalability**: Horizontally scalable with serverless architecture

### 1.3 Data Flow

**Standard Command Execution Flow:**
```
User Input → Terminal → Backend Git Engine → Validator → 
Execute Command → Update State → Return Result → Update UI
```

**AI-Assisted Flow (on error/help):**
```
User Error → Collect Context → API Gateway → Lambda Orchestrator →
Build Prompt → Bedrock API → AI Response → Cache → Return Hint → Display
```

---

## 2. Component Design

### 2.1 Frontend Components

#### 2.1.1 Monaco Editor Module

**Purpose**: Code editing interface with syntax highlighting and IntelliSense

**Key Features:**
- Multi-file editing with tabs
- Syntax highlighting for popular languages
- Code completion (basic, not AI-powered initially)
- Diff view for comparing changes
- Line numbers and minimap

**Technical Implementation:**
```typescript
// Component Structure
<MonacoEditorWrapper>
  <FileExplorer />
  <EditorTabs />
  <MonacoEditor
    language={currentFile.language}
    value={fileContent}
    onChange={handleFileChange}
    theme="vs-dark"
  />
</MonacoEditorWrapper>
```

**State Management:**
- Current file path
- File content (virtual filesystem)
- Unsaved changes indicator
- Editor configuration (theme, font size)

**APIs Used:**
- `monaco-editor` npm package
- Custom file system adapter

#### 2.1.2 Terminal Simulator

**Purpose**: Command-line interface for Git operations

**Key Features:**
- Command history (up/down arrows)
- Tab completion for commands
- Color-coded output (errors in red, success in green)
- Command suggestions
- Multi-line command support

**Technical Implementation:**
```typescript
// xterm.js integration
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

const terminal = new Terminal({
  theme: customTheme,
  fontSize: 14,
  fontFamily: 'Fira Code, monospace',
  cursorBlink: true
});

const fitAddon = new FitAddon();
terminal.loadAddon(fitAddon);
```

**Command Parser:**
```typescript
interface Command {
  command: string;
  args: string[];
  flags: Record<string, boolean | string>;
}

function parseCommand(input: string): Command {
  // Parse git commands with flags and arguments
}
```

**Communication:**
- WebSocket connection to backend for real-time command execution
- Fallback to HTTP POST for non-real-time operations

#### 2.1.3 Mission System

**Purpose**: Gamified learning path with structured lessons

**Mission Structure:**
```typescript
interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: Objective[];
  initialFiles: FileStructure;
  hints: Hint[];
  rewards: {
    xp: number;
    badges: string[];
  };
}

interface Objective {
  id: string;
  description: string;
  validation: ValidationRule;
  aiHintTrigger?: string; // When to suggest AI help
}
```

**Mission Categories:**
1. Git Basics (init, add, commit, status, log)
2. Branching & Merging
3. Remote Operations (simulated)
4. Collaboration Workflows
5. Advanced Topics (rebase, cherry-pick, stash)

**Progression Logic:**
- Linear progression for beginners
- Unlock advanced missions after completing prerequisites
- Daily challenges for engagement

#### 2.1.4 AI Hint Panel

**Purpose**: Display AI mentor guidance

**Features:**
- Contextual hints based on user actions
- Progressive disclosure (basic → detailed hints)
- Code examples and explanations
- Interactive suggestions (clickable commands)

**UI States:**
```typescript
type HintState = 
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success', hint: string, examples: string[] }
  | { type: 'error', message: string };
```

#### 2.1.5 File Explorer

**Purpose**: Visual representation of the virtual file system

**Features:**
- Tree view of files and folders
- Git status indicators (modified, staged, untracked)
- Context menu (add, delete, rename)
- Drag-and-drop support

**Virtual File System:**
```typescript
interface VirtualFS {
  files: Map<string, FileNode>;
  workingDirectory: string;
}

interface FileNode {
  path: string;
  content: string;
  type: 'file' | 'directory';
  gitStatus: 'untracked' | 'modified' | 'staged' | 'committed';
  children?: Map<string, FileNode>;
}
```

### 2.2 Backend Components

#### 2.2.1 Git Simulation Engine

**Purpose**: Simulate Git operations without actual Git installation

**Core Operations:**

```typescript
class GitEngine {
  private repos: Map<string, Repository>;
  
  async init(repoId: string): Promise<InitResult>;
  async add(repoId: string, files: string[]): Promise<AddResult>;
  async commit(repoId: string, message: string): Promise<CommitResult>;
  async status(repoId: string): Promise<StatusResult>;
  async log(repoId: string, options?: LogOptions): Promise<LogResult>;
  async branch(repoId: string, name?: string): Promise<BranchResult>;
  async checkout(repoId: string, target: string): Promise<CheckoutResult>;
  async merge(repoId: string, branch: string): Promise<MergeResult>;
  async diff(repoId: string, options?: DiffOptions): Promise<DiffResult>;
}
```

**Repository State:**
```typescript
interface Repository {
  id: string;
  userId: string;
  workingDirectory: VirtualFS;
  stagingArea: Set<string>;
  commits: Commit[];
  branches: Map<string, string>; // branch name -> commit hash
  currentBranch: string;
  HEAD: string; // commit hash
}

interface Commit {
  hash: string;
  message: string;
  author: string;
  timestamp: Date;
  parent: string | null;
  tree: FileSnapshot; // snapshot of files at commit time
}
```

**Merge Strategy:**
```typescript
interface MergeStrategy {
  detectConflicts(base: FileSnapshot, ours: FileSnapshot, theirs: FileSnapshot): Conflict[];
  autoResolve(conflicts: Conflict[]): Resolution[];
  createMergeCommit(branch1: string, branch2: string): Commit;
}
```

#### 2.2.2 Validator Service

**Purpose**: Validate commands before execution and provide immediate feedback

**Validation Rules:**
```typescript
interface ValidationRule {
  command: string;
  checks: ValidationCheck[];
}

interface ValidationCheck {
  type: 'precondition' | 'argument' | 'state';
  validate: (context: ExecutionContext) => ValidationResult;
  errorMessage: string;
  aiHintTrigger?: boolean; // Whether to suggest AI help on failure
}
```

**Example Validations:**
- `git commit` requires staged files
- `git push` requires commits ahead of remote
- `git merge` checks for clean working directory
- Branch names must follow naming conventions

**Fast-Fail Approach:**
```typescript
async function validateCommand(cmd: Command, context: Context): Promise<ValidationResult> {
  // Quick local checks first
  if (!isGitInitialized(context)) {
    return { valid: false, error: 'Not a git repository', suggestAI: true };
  }
  
  // Command-specific validation
  const validator = getValidator(cmd.command);
  return validator.validate(cmd, context);
}
```

#### 2.2.3 State Manager

**Purpose**: Manage user sessions and persist state to DynamoDB

**Responsibilities:**
- Session management
- Repository state persistence
- Progress tracking
- Cache management

**State Persistence:**
```typescript
interface UserState {
  userId: string;
  currentMissionId: string;
  repositories: RepositorySnapshot[];
  progress: ProgressData;
  lastActivity: Date;
}

class StateManager {
  async saveState(userId: string, state: UserState): Promise<void>;
  async loadState(userId: string): Promise<UserState>;
  async updateProgress(userId: string, progress: Partial<ProgressData>): Promise<void>;
}
```

**Caching Strategy:**
- In-memory cache for active sessions (Redis or ElastiCache)
- DynamoDB for persistent storage
- TTL for inactive sessions (30 minutes)

#### 2.2.4 Mission Controller

**Purpose**: Manage mission logic and validation

**Responsibilities:**
- Load mission definitions
- Track objective completion
- Validate mission completion criteria
- Award points and badges

```typescript
class MissionController {
  async startMission(userId: string, missionId: string): Promise<MissionState>;
  async validateObjective(userId: string, objectiveId: string): Promise<ValidationResult>;
  async checkMissionCompletion(userId: string, missionId: string): Promise<CompletionResult>;
  async awardRewards(userId: string, rewards: Rewards): Promise<void>;
}
```

### 2.3 AWS Components

#### 2.3.1 Lambda Orchestrator

**Purpose**: Coordinate AI requests and build prompts for Bedrock

**Function Signature:**
```typescript
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const context = JSON.parse(event.body);
  
  // Build prompt
  const prompt = buildPrompt(context);
  
  // Call Bedrock
  const response = await invokeBedrockModel(prompt);
  
  // Cache response
  await cacheResponse(context.userId, context.commandHash, response);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ hint: response.content })
  };
}
```

**Prompt Engineering:**
```typescript
function buildPrompt(context: ErrorContext): string {
  return `
You are a Git mentor helping a student learn Git commands.

Context:
- Current command: ${context.command}
- Error: ${context.error}
- Repository state: ${context.repoState}
- User level: ${context.userLevel}
- Mission objective: ${context.currentObjective}

Provide a helpful, encouraging hint that:
1. Explains what went wrong
2. Guides toward the correct command
3. Keeps it under 100 words
4. Includes a command example if helpful

Response format: Plain text hint
`;
}
```

**Model Configuration:**
```typescript
const bedrockConfig = {
  modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
  inferenceConfig: {
    maxTokens: 200,
    temperature: 0.7,
    topP: 0.9
  }
};
```

#### 2.3.2 Bedrock Integration

**Model Selection:**
- **Primary**: Claude 3 Sonnet (balance of speed and quality)
- **Fallback**: Claude 3 Haiku (faster, lower cost)

**Request/Response Flow:**
```typescript
interface BedrockRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  max_tokens: number;
  temperature: number;
}

interface BedrockResponse {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}
```

**Cost Optimization:**
- Cache responses by command + error hash
- Rate limiting per user (max 10 AI requests per hour for free tier)
- Batch similar requests
- Progressive hint system (show cached hints before calling AI)

---

## 3. Data Architecture

### 3.1 DynamoDB Schema

#### 3.1.1 Users Table

**Table Name**: `git-learning-users`

**Primary Key**: `userId` (String, Partition Key)

**Attributes**:
```typescript
interface UserRecord {
  userId: string; // PK
  email: string;
  username: string;
  createdAt: string; // ISO timestamp
  lastLogin: string;
  tier: 'free' | 'premium';
  stats: {
    totalXP: number;
    missionsCompleted: number;
    currentStreak: number;
    longestStreak: number;
  };
}
```

**GSI (Global Secondary Index)**:
- `email-index`: Query by email
- `username-index`: Query by username

#### 3.1.2 Repositories Table

**Table Name**: `git-learning-repositories`

**Primary Key**: 
- Partition Key: `userId` (String)
- Sort Key: `repoId` (String)

**Attributes**:
```typescript
interface RepositoryRecord {
  userId: string; // PK
  repoId: string; // SK
  missionId: string;
  state: {
    currentBranch: string;
    branches: Record<string, string>;
    commits: Commit[];
    stagingArea: string[]; // file paths
    workingDirectory: string; // JSON stringified VirtualFS
  };
  lastModified: string;
  ttl: number; // Auto-delete after 7 days of inactivity
}
```

#### 3.1.3 Progress Table

**Table Name**: `git-learning-progress`

**Primary Key**:
- Partition Key: `userId` (String)
- Sort Key: `missionId` (String)

**Attributes**:
```typescript
interface ProgressRecord {
  userId: string; // PK
  missionId: string; // SK
  status: 'not_started' | 'in_progress' | 'completed';
  objectivesCompleted: string[]; // objective IDs
  startedAt: string;
  completedAt?: string;
  attempts: number;
  hintsUsed: number;
  aiHintsUsed: number;
  score: number; // Based on attempts and time
}
```

**GSI**:
- `status-index`: Query all in-progress missions for a user

#### 3.1.4 AI Cache Table

**Table Name**: `git-learning-ai-cache`

**Primary Key**: `cacheKey` (String) - Hash of (command + error + context)

**Attributes**:
```typescript
interface AICacheRecord {
  cacheKey: string; // PK
  prompt: string;
  response: string;
  usageCount: number;
  createdAt: string;
  ttl: number; // Auto-delete after 30 days
}
```

#### 3.1.5 Missions Table

**Table Name**: `git-learning-missions`

**Primary Key**: `missionId` (String)

**Attributes**:
```typescript
interface MissionRecord {
  missionId: string; // PK
  title: string;
  description: string;
  difficulty: string;
  category: string;
  order: number; // Sequence in learning path
  objectives: Objective[];
  initialState: {
    files: Record<string, string>;
    branches: string[];
  };
  hints: string[];
  estimatedTime: number; // minutes
  prerequisites: string[]; // mission IDs
}
```

### 3.2 Data Access Patterns

1. **Get User Profile**: `Query by userId`
2. **Load Active Repository**: `Query by userId + repoId`
3. **Get User Progress**: `Query by userId, filter by status`
4. **Check AI Cache**: `Get by cacheKey`
5. **List Available Missions**: `Scan missions table (cached)`
6. **Update Progress**: `Update item by userId + missionId`

### 3.3 Backup & Recovery

- **Point-in-Time Recovery**: Enabled on all tables
- **Backup Schedule**: Daily automated backups
- **Retention**: 7 days for repositories, 30 days for progress/users
- **Cross-Region Replication**: For disaster recovery (optional, Phase 2)

---

## 4. API Design

### 4.1 REST API Endpoints

**Base URL**: `https://api.gitlearn.dev/v1`

#### 4.1.1 Git Operations

```
POST /git/init
POST /git/add
POST /git/commit
POST /git/status
POST /git/log
POST /git/branch
POST /git/checkout
POST /git/merge
POST /git/diff
```

**Example Request/Response:**

```typescript
// POST /git/commit
{
  "userId": "user123",
  "repoId": "repo456",
  "message": "Initial commit"
}

// Response
{
  "success": true,
  "commit": {
    "hash": "a3f5c2d",
    "message": "Initial commit",
    "timestamp": "2024-02-15T10:30:00Z"
  },
  "state": {
    "currentBranch": "main",
    "commitsCount": 1
  }
}
```

#### 4.1.2 Mission Operations

```
GET    /missions                    # List all missions
GET    /missions/:id                # Get mission details
POST   /missions/:id/start          # Start a mission
POST   /missions/:id/validate       # Validate mission completion
GET    /missions/:id/progress       # Get user progress
```

#### 4.1.3 AI Operations

```
POST   /ai/hint                     # Request AI hint
GET    /ai/suggestions              # Get proactive suggestions
```

**AI Hint Request:**
```typescript
{
  "userId": "user123",
  "command": "git commit",
  "error": "nothing to commit, working tree clean",
  "repoState": {
    "branch": "main",
    "stagedFiles": [],
    "modifiedFiles": ["README.md"]
  },
  "missionContext": {
    "missionId": "git-basics-01",
    "currentObjective": "Make your first commit"
  }
}
```

**AI Hint Response:**
```typescript
{
  "hint": "You need to stage your changes before committing. Try running 'git add README.md' first to add the file to the staging area.",
  "examples": [
    "git add README.md",
    "git commit -m \"Update README\""
  ],
  "cached": false,
  "tokensUsed": 45
}
```

#### 4.1.4 User Operations

```
POST   /auth/register               # Register new user
POST   /auth/login                  # Login
GET    /users/profile               # Get user profile
PATCH  /users/profile               # Update profile
GET    /users/progress              # Get overall progress
```

### 4.2 WebSocket API

**Connection URL**: `wss://api.gitlearn.dev/terminal`

**Messages:**

```typescript
// Client → Server
{
  "type": "command",
  "sessionId": "session123",
  "command": "git status"
}

// Server → Client
{
  "type": "output",
  "output": "On branch main\nnothing to commit, working tree clean",
  "exitCode": 0
}

// Server → Client (streaming)
{
  "type": "stream",
  "chunk": "Counting objects: 100% (50/50), done.\n"
}
```

### 4.3 API Gateway Configuration

**Throttling:**
- 10,000 requests per second (burst)
- 5,000 requests per second (steady state)
- Per-user limit: 100 requests per minute

**CORS Configuration:**
```json
{
  "allowOrigins": ["https://gitlearn.dev", "https://www.gitlearn.dev"],
  "allowMethods": ["GET", "POST", "PATCH"],
  "allowHeaders": ["Content-Type", "Authorization"],
  "maxAge": 3600
}
```

**Authentication:**
- JWT tokens with 24-hour expiry
- Refresh tokens with 30-day expiry
- API key for public endpoints

---

## 5. Security Design

### 5.1 Authentication & Authorization

**Authentication Flow:**
```
User Login → Cognito → JWT Token → API Gateway Authorizer → Lambda
```

**JWT Structure:**
```json
{
  "sub": "user123",
  "email": "user@example.com",
  "tier": "free",
  "iat": 1707996600,
  "exp": 1708083000
}
```

**Authorization Levels:**
- **Guest**: Read-only access to demo missions
- **Free User**: Full access with rate limits
- **Premium User**: Unlimited AI hints, advanced missions

### 5.2 Input Validation

**Command Sanitization:**
```typescript
function sanitizeCommand(input: string): string {
  // Remove dangerous characters
  const cleaned = input.replace(/[;&|<>$`\\]/g, '');
  
  // Whitelist approach for Git commands
  const allowedCommands = ['git', 'ls', 'cat', 'pwd', 'cd'];
  const parts = cleaned.split(' ');
  
  if (!allowedCommands.includes(parts[0])) {
    throw new Error('Command not allowed');
  }
  
  return cleaned;
}
```

**SQL Injection Prevention:**
- All DynamoDB queries use parameterized inputs
- No raw string concatenation for queries

**XSS Prevention:**
- Content Security Policy headers
- Sanitize user-generated content (commit messages, branch names)
- React's automatic escaping

### 5.3 Data Protection

**Encryption:**
- **At Rest**: DynamoDB encryption enabled (AWS managed keys)
- **In Transit**: TLS 1.3 for all API communication
- **Sensitive Data**: User emails hashed before logging

**Data Retention:**
- Repository states: 7 days after last activity
- User progress: Indefinite
- AI cache: 30 days
- Logs: 90 days

### 5.4 Rate Limiting

**Per-User Limits:**
- Git commands: 100/minute
- AI hints (free): 10/hour
- AI hints (premium): 100/hour
- API requests: 1000/hour

**Implementation:**
```typescript
// Token bucket algorithm
class RateLimiter {
  async checkLimit(userId: string, operation: string): Promise<boolean> {
    const key = `ratelimit:${userId}:${operation}`;
    const limit = limits[operation];
    
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, limit.window);
    }
    
    return current <= limit.max;
  }
}
```

### 5.5 Secrets Management

- **AWS Secrets Manager**: Store database credentials, API keys
- **Environment Variables**: Configuration (not secrets)
- **Rotation**: Automated 90-day rotation for database credentials

---

## 6. Scalability & Performance

### 6.1 Scalability Strategy

**Horizontal Scaling:**
- Lambda: Auto-scales up to 1000 concurrent executions
- API Gateway: Handles millions of requests
- DynamoDB: On-demand capacity mode

**Vertical Scaling:**
- Not applicable (serverless architecture)

**Load Distribution:**
```
CloudFront (CDN) → API Gateway → Lambda (Auto-scaled)
                                    ↓
                                DynamoDB (Partitioned)
```

### 6.2 Performance Optimization

**Frontend:**
- Code splitting (Next.js automatic)
- Lazy loading for Monaco Editor
- Service worker for offline support
- Image optimization (next/image)

**Backend:**
- In-memory caching (Redis/ElastiCache)
- Connection pooling for DynamoDB
- Lambda warm-up (scheduled CloudWatch events)

**Database:**
- Composite keys for efficient queries
- GSI for alternative access patterns
- DynamoDB Accelerator (DAX) for read-heavy workloads

**CDN Strategy:**
```typescript
// CloudFront distribution
const distribution = {
  origins: [
    {
      domainName: 's3bucket.s3.amazonaws.com', // Static assets
      cacheBehavior: { ttl: 86400 } // 24 hours
    },
    {
      domainName: 'api.gitlearn.dev', // API
      cacheBehavior: { ttl: 0 } // No cache
    }
  ]
};
```

### 6.3 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 2s | Lighthouse |
| Terminal Response | < 200ms | 95th percentile |
| AI Hint Generation | < 3s | 95th percentile |
| Git Command Execution | < 100ms | Average |
| API Latency | < 500ms | 99th percentile |

### 6.4 Monitoring & Metrics

**CloudWatch Metrics:**
- Lambda invocation count, duration, errors
- API Gateway 4xx/5xx errors, latency
- DynamoDB consumed capacity, throttles

**Custom Metrics:**
- Mission completion rate
- AI hint accuracy (user feedback)
- User engagement (DAU, MAU)
- Command success rate

**Alarms:**
- Lambda error rate > 5%
- API latency > 1s (p99)
- DynamoDB throttling events
- Bedrock API failures

**Logging:**
```typescript
// Structured logging
logger.info('Command executed', {
  userId: 'user123',
  command: 'git commit',
  duration: 45,
  success: true,
  missionId: 'git-basics-01'
});
```

---

## 7. UI/UX Design

### 7.1 Layout Structure

**Desktop Layout (1920x1080):**

```
┌──────────────────────────────────────────────────────────────┐
│  Header: Logo | Mission Title | Progress Bar | User Menu     │
├──────────────────┬───────────────────────────────────────────┤
│                  │                                            │
│   File Explorer  │          Monaco Editor                     │
│                  │                                            │
│   (240px)        │          (Flexible)                        │
│                  │                                            │
│                  │                                            │
├──────────────────┴───────────────────────────────────────────┤
│                                                               │
│                  Terminal Simulator                           │
│                  (Height: 300px)                              │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│  Mission Panel (Left) | AI Hints Panel (Right)               │
│  (400px)             | (400px)                                │
└───────────────────────────────────────────────────────────────┘
```

**Mobile Layout (< 768px):**
- Tabbed interface (Editor | Terminal | Mission)
- Collapsible file explorer
- Bottom sheet for AI hints

### 7.2 Component Hierarchy

```typescript
<App>
  <Header>
    <Logo />
    <MissionTitle />
    <ProgressBar />
    <UserMenu />
  </Header>
  
  <MainLayout>
    <Sidebar>
      <FileExplorer />
    </Sidebar>
    
    <EditorPanel>
      <EditorTabs />
      <MonacoEditor />
    </EditorPanel>
    
    <TerminalPanel>
      <Terminal />
    </TerminalPanel>
    
    <BottomPanel>
      <MissionObjectives />
      <AIHintsPanel />
    </BottomPanel>
  </MainLayout>
</App>
```

### 7.3 State Management

**React Context Structure:**
```typescript
// Global state
<AppProvider>
  <AuthContext>        // User authentication
  <RepositoryContext>  // Current repo state
  <MissionContext>     // Active mission
  <UIContext>          // Theme, layout preferences
  <TerminalContext>    // Terminal history, connection
    <App />
  </TerminalContext>
  </UIContext>
  </MissionContext>
  </RepositoryContext>
  </AuthContext>
</AppProvider>
```

**State Updates:**
```typescript
// Optimistic updates for Git commands
const handleGitCommand = async (cmd: string) => {
  // Update UI immediately
  dispatch({ type: 'COMMAND_STARTED', cmd });
  
  try {
    const result = await executeCommand(cmd);
    dispatch({ type: 'COMMAND_SUCCESS', result });
  } catch (error) {
    dispatch({ type: 'COMMAND_FAILED', error });
  }
};
```

### 7.4 Design System

**Color Palette:**
```css
:root {
  /* Primary */
  --primary-500: #3B82F6; /* Blue */
  --primary-600: #2563EB;
  
  /* Success */
  --success-500: #10B981; /* Green */
  
  /* Error */
  --error-500: #EF4444; /* Red */
  
  /* Warning */
  --warning-500: #F59E0B; /* Amber */
  
  /* Neutral */
  --gray-50: #F9FAFB;
  --gray-900: #111827;
  
  /* Background */
  --bg-primary: #1E1E1E; /* VS Code dark theme */
  --bg-secondary: #252526;
  --bg-tertiary: #2D2D30;
}
```

**Typography:**
```css
/* Fonts */
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'Fira Code', 'Consolas', monospace;

/* Sizes */
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
```

**Spacing:**
- 4px base unit
- Multiples: 4, 8, 12, 16, 24, 32, 48, 64

**Animation:**
```css
/* Transitions */
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;

/* Easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 7.5 Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};
```

### 7.6 Accessibility

**WCAG 2.1 AA Compliance:**
- Keyboard navigation support (Tab, Shift+Tab, Arrow keys)
- ARIA labels for interactive elements
- Screen reader friendly
- Color contrast ratio ≥ 4.5:1
- Focus indicators
- Skip navigation links

**Keyboard Shortcuts:**
- `Ctrl+S`: Save file
- `Ctrl+Enter`: Execute terminal command
- `Ctrl+/`: Toggle AI hints panel
- `Ctrl+Shift+P`: Command palette
- `Esc`: Close modals

---

## 8. Error Handling & Recovery

### 8.1 Error Categories

**Client-Side Errors:**
- Network failures
- Invalid user input
- State inconsistencies
- Browser compatibility issues

**Server-Side Errors:**
- Git operation failures
- Database connection issues
- Lambda timeouts
- Bedrock API errors

**User Errors:**
- Invalid Git commands
- Merge conflicts
- Permission denied (simulated)
- Missing prerequisites

### 8.2 Error Handling Strategy

**Graceful Degradation:**
```typescript
// Fallback chain for AI hints
async function getHint(context: Context): Promise<string> {
  try {
    // Try AI-generated hint
    return await fetchAIHint(context);
  } catch (error) {
    // Fall back to cached response
    const cached = await getCachedHint(context);
    if (cached) return cached;
    
    // Fall back to static hint
    return getStaticHint(context.command);
  }
}
```

**Retry Logic:**
```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i)); // Exponential backoff
    }
  }
  throw new Error('Max retries exceeded');
}
```

### 8.3 User-Facing Error Messages

**Error Message Structure:**
```typescript
interface ErrorMessage {
  title: string;          // "Command Failed"
  description: string;    // What went wrong
  suggestion: string;     // What to do next
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Examples:**
```typescript
{
  title: "Cannot Commit",
  description: "You need to stage files before committing.",
  suggestion: "Try running 'git add <file>' first.",
  action: {
    label: "Get AI Help",
    onClick: () => requestAIHint()
  }
}
```

### 8.4 Logging & Debugging

**Log Levels:**
- ERROR: Critical failures
- WARN: Recoverable issues
- INFO: Important events
- DEBUG: Detailed trace

**Structured Logging:**
```typescript
logger.error('Lambda invocation failed', {
  requestId: context.requestId,
  userId: event.userId,
  error: error.message,
  stack: error.stack,
  duration: Date.now() - startTime
});
```

**Error Tracking:**
- Integrate Sentry or CloudWatch Insights
- Track error frequency and patterns
- Alert on error rate thresholds

### 8.5 Recovery Mechanisms

**State Recovery:**
```typescript
// Auto-save every 30 seconds
useEffect(() => {
  const interval = setInterval(() => {
    saveRepositoryState(repoId, currentState);
  }, 30000);
  
  return () => clearInterval(interval);
}, [repoId, currentState]);

// Load last known good state on error
async function recoverState(userId: string): Promise<State> {
  const snapshots = await getStateSnapshots(userId);
  return snapshots[0]; // Most recent
}
```

**Session Recovery:**
- Store session ID in localStorage
- Reconnect WebSocket on disconnection
- Resume mission progress on page reload

---

## 9. Deployment Architecture

### 9.1 Infrastructure as Code

**AWS CDK Stack:**
```typescript
class GitLearningStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    
    // DynamoDB Tables
    const usersTable = new Table(this, 'UsersTable', {
      partitionKey: { name: 'userId', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true
    });
    
    // Lambda Functions
    const orchestratorFn = new Function(this, 'OrchestratorFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromAsset('lambda/orchestrator'),
      environment: {
        BEDROCK_MODEL_ID: 'anthropic.claude-3-sonnet-20240229-v1:0',
        DYNAMODB_TABLE: usersTable.tableName
      },
      timeout: Duration.seconds(30)
    });
    
    // API Gateway
    const api = new RestApi(this, 'GitLearningAPI', {
      restApiName: 'Git Learning Platform API'
    });
    
    // CloudFront Distribution
    const distribution = new Distribution(this, 'CDN', {
      defaultBehavior: {
        origin: new S3Origin(websiteBucket)
      }
    });
  }
}
```

### 9.2 CI/CD Pipeline

**GitHub Actions Workflow:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build frontend
        run: npm run build
      
      - name: Deploy to AWS
        run: |
          npm run cdk deploy --all
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

**Deployment Stages:**
1. **Development**: Auto-deploy on PR merge to `develop`
2. **Staging**: Manual approval for `staging` branch
3. **Production**: Manual approval with blue-green deployment

### 9.3 Environment Configuration

```typescript
// config/environments.ts
export const environments = {
  development: {
    apiUrl: 'https://dev-api.gitlearn.dev',
    bedrockModel: 'claude-3-haiku', // Cheaper for dev
    logLevel: 'DEBUG'
  },
  staging: {
    apiUrl: 'https://staging-api.gitlearn.dev',
    bedrockModel: 'claude-3-sonnet',
    logLevel: 'INFO'
  },
  production: {
    apiUrl: 'https://api.gitlearn.dev',
    bedrockModel: 'claude-3-sonnet',
    logLevel: 'WARN'
  }
};
```

### 9.4 Disaster Recovery

**Backup Strategy:**
- Automated daily snapshots of DynamoDB
- S3 versioning for static assets
- Cross-region replication (optional)

**Recovery Time Objective (RTO):** 4 hours
**Recovery Point Objective (RPO):** 24 hours

**Failover Plan:**
1. Detect outage (CloudWatch alarms)
2. Switch DNS to backup region
3. Restore DynamoDB from snapshot
4. Redeploy Lambda functions
5. Validate functionality

### 9.5 Cost Estimation

**Monthly Cost Breakdown (10,000 active users):**

| Service | Usage | Cost |
|---------|-------|------|
| Lambda | 10M requests | $20 |
| DynamoDB | 100GB storage, 10M reads | $50 |
| Bedrock | 1M tokens/month | $100 |
| API Gateway | 10M requests | $35 |
| CloudFront | 100GB transfer | $8 |
| S3 | 50GB storage | $1 |
| **Total** | | **~$214/month** |

**Scaling (100,000 users):** ~$1,500/month
**Scaling (1M users):** ~$12,000/month

---

## 10. Future Enhancements

### Phase 2 Features:
- Real GitHub integration (fork, clone, push to actual repos)
- Multiplayer collaboration mode
- Video tutorials integrated with missions
- Mobile native apps (React Native)
- Code review simulation
- Advanced Git workflows (rebase, cherry-pick, submodules)

### Phase 3 Features:
- Integrate with popular project templates
- Company-specific training modules
- Certification system
- Instructor dashboard for educators
- Analytics and insights for learners

---

## Appendix A: Technology Versions

- Node.js: 18.x LTS
- React: 18.2+
- Next.js: 14.x
- Monaco Editor: 0.44+
- xterm.js: 5.3+
- AWS CDK: 2.x
- TypeScript: 5.x

## Appendix B: Third-Party Dependencies

Frontend:
- `monaco-editor`: Code editor
- `xterm.js`: Terminal emulator
- `tailwindcss`: Styling
- `zustand`: State management
- `react-query`: API state management

Backend:
- `express`: Web framework
- `aws-sdk`: AWS services
- `jsonwebtoken`: Authentication
- `zod`: Schema validation

## Appendix C: Glossary

- **Mission**: A structured learning task with specific objectives
- **Objective**: A specific goal within a mission that must be completed
- **Hint**: AI-generated or static guidance to help users
- **Repository State**: Complete snapshot of the virtual Git repository
- **Orchestrator**: Lambda function coordinating AI requests
- **Virtual Filesystem**: In-memory file structure for simulated files

---

**Document Version**: 1.0  
**Last Updated**: February 15, 2026  
**Authors**: System Architecture Team  
**Status**: Draft for Review