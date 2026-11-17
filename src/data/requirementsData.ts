export interface GuideCommand {
  /** Short label such as "Windows · winget" or "Any OS · npm" */
  label: string;
  code: string;
  note?: string;
}

export interface GuideStep {
  title: string;
  description: string;
  commands?: GuideCommand[];
  link?: { label: string; href: string };
  tip?: string;
}

export interface RequirementGuide {
  id: string;
  number: number;
  name: string;
  tagline: string;
  /** Short reason why we need it in the workshop */
  why: string;
  duration: string;
  /** Path to a sticker icon in /public, if available */
  iconPath?: string;
  /** Key of the lucide fallback icon when no iconPath is provided */
  fallbackIcon?: 'radio' | 'user';
  accent: string;
  badge: string;
  highlight?: boolean;
  steps: GuideStep[];
  verify?: {
    title: string;
    command?: string;
    expected: string;
  };
}

export const REQUIREMENT_GUIDES: RequirementGuide[] = [
  {
    id: 'vscode',
    number: 1,
    name: 'Visual Studio Code',
    tagline: 'Your code editor — where every file of the project lives',
    why: 'VS Code is the workspace where we open the project folder, run the terminal, and talk to OpenCode.',
    duration: '5 min',
    iconPath: '/assets/stickers/vscode.svg',
    accent: 'bg-blue-50 border-gdgc-blue/40',
    badge: 'Editor',
    steps: [
      {
        title: 'Download the installer',
        description:
          'Open the official download page and pick the installer for your system (Windows, macOS, or Linux).',
        link: { label: 'code.visualstudio.com/download', href: 'https://code.visualstudio.com/download' },
      },
      {
        title: 'Install with the recommended options',
        description:
          'Run the installer. On Windows, tick "Add to PATH" and "Add Open with Code action" so you can open any folder in VS Code with a right-click.',
        tip: 'Keep the default options if you are not sure — they are already correct for the workshop.',
      },
      {
        title: 'Open a project folder and the terminal',
        description:
          'Create an empty folder on your Desktop (for example "my-workshop-app"), then in VS Code choose File → Open Folder. Open the built-in terminal with the shortcut below.',
        commands: [{ label: 'Shortcut', code: 'Ctrl + `', note: 'Cmd + ` on macOS' }],
      },
    ],
    verify: {
      title: 'Check it works',
      command: 'code --version',
      expected: 'A version number such as 1.xx.x appears in the terminal.',
    },
  },
  {
    id: 'live-server',
    number: 2,
    name: 'Live Server Extension',
    tagline: 'Instant browser preview that refreshes every time you save',
    why: 'Live Server lets us see the frontend that OpenCode generates immediately, without any build step.',
    duration: '2 min',
    fallbackIcon: 'radio',
    accent: 'bg-neon/20 border-forest/40',
    badge: 'VS Code Extension',
    steps: [
      {
        title: 'Open the Extensions panel',
        description:
          'In VS Code press the shortcut below (or click the square-blocks icon in the left sidebar).',
        commands: [{ label: 'Shortcut', code: 'Ctrl + Shift + X', note: 'Cmd + Shift + X on macOS' }],
      },
      {
        title: 'Search and install "Live Server"',
        description:
          'Type "Live Server" in the search box and click Install on the one published by Ritwick Dey. You can also install it from the terminal.',
        commands: [
          { label: 'Terminal alternative', code: 'code --install-extension ritwickdey.LiveServer' },
        ],
        link: {
          label: 'Live Server on the VS Code Marketplace',
          href: 'https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer',
        },
      },
      {
        title: 'Try it on a test page',
        description:
          'Create a file named index.html, write any text inside, then click "Go Live" in the bottom-right status bar (or right-click the file → Open with Live Server). Your browser opens at http://127.0.0.1:5500 and refreshes on every save.',
        tip: 'If "Go Live" does not appear, make sure you opened a folder (not a single file) in VS Code.',
      },
    ],
    verify: {
      title: 'Check it works',
      expected: 'The browser shows your page, and editing the text then saving updates it automatically.',
    },
  },
  {
    id: 'git',
    number: 3,
    name: 'Git',
    tagline: 'Version control — save checkpoints of your project',
    why: 'Git records every change so we can push the project to GitHub and deploy it to Netlify.',
    duration: '5 min',
    iconPath: '/assets/stickers/git.svg',
    accent: 'bg-red-50 border-gdgc-red/30',
    badge: 'Version Control',
    steps: [
      {
        title: 'Download Git',
        description:
          'Download the installer for your system from the official site. On macOS and Linux you may already have it.',
        link: { label: 'git-scm.com/downloads', href: 'https://git-scm.com/downloads' },
      },
      {
        title: 'Install with default options',
        description:
          'Run the installer and keep clicking Next — the default options are fine. Then close and reopen VS Code so it detects Git.',
      },
      {
        title: 'Tell Git who you are (one time only)',
        description:
          'Run these two commands in the terminal, replacing the values with your own name and the email of your GitHub account.',
        commands: [
          { label: 'Set your name', code: 'git config --global user.name "Your Name"' },
          { label: 'Set your email', code: 'git config --global user.email "you@example.com"' },
        ],
        tip: 'Use the same email you will use for GitHub so your commits are linked to your profile.',
      },
    ],
    verify: {
      title: 'Check it works',
      command: 'git --version',
      expected: 'Output like "git version 2.xx.x".',
    },
  },
  {
    id: 'nodejs',
    number: 4,
    name: 'Node.js (LTS)',
    tagline: 'Runtime needed to install OpenCode and to build React apps',
    why: 'Node.js gives us npm, which installs OpenCode and runs the frontend tooling later in the project.',
    duration: '5 min',
    iconPath: '/assets/stickers/nodejs.svg',
    accent: 'bg-green-50 border-gdgc-green/40',
    badge: 'Runtime',
    steps: [
      {
        title: 'Download the LTS version',
        description:
          'Choose the button labelled "LTS" (Long Term Support) — it is the most stable version for beginners.',
        link: { label: 'nodejs.org/en/download', href: 'https://nodejs.org/en/download' },
      },
      {
        title: 'Install and restart your terminal',
        description:
          'Run the installer with the default options. Then close every terminal window and open a new one so the new commands are available.',
      },
    ],
    verify: {
      title: 'Check it works',
      command: 'node -v && npm -v',
      expected: 'Two version numbers are printed (one for Node.js, one for npm).',
    },
  },
  {
    id: 'opencode',
    number: 5,
    name: 'OpenCode + /connect',
    tagline: 'The AI coding agent that builds the project with you',
    why: 'OpenCode reads your project files and writes code from your prompts. It must be installed and connected to an AI model before the workshop starts.',
    duration: '10 min',
    iconPath: '/assets/stickers/opencode.svg',
    accent: 'bg-neon/25 border-forest',
    badge: 'AI Coding Agent · Must Have',
    highlight: true,
    steps: [
      {
        title: 'Install OpenCode',
        description:
          'Pick ONE of the methods below. The npm method works on every system because you installed Node.js in the previous step.',
        commands: [
          { label: 'Any OS · npm (recommended)', code: 'npm install -g @opencode/cli' },
          { label: 'Windows · winget', code: 'winget install Anomaly.OpenCode' },
          { label: 'macOS / Linux · script', code: 'curl -fsSL https://opencode.ai/v2/install | bash' },
        ],
        link: { label: 'Official site: opencode.ai', href: 'https://opencode.ai/' },
        tip: 'Close and reopen your terminal after installing so the opencode command is found.',
      },
      {
        title: 'Check the installation',
        description: 'Run the command below. You should see a version number.',
        commands: [{ label: 'Check version', code: 'opencode --version' }],
      },
      {
        title: 'Start OpenCode inside your project folder',
        description:
          'In VS Code open the terminal inside your project folder (the one from Step 1) and start OpenCode. The OpenCode interface opens right in the terminal.',
        commands: [{ label: 'Start OpenCode', code: 'opencode' }],
      },
      {
        title: 'Connect it with /connect',
        description:
          'Inside OpenCode type /connect and press Enter. Choose a provider from the list, then follow the instructions: sign in through the browser window that opens, or paste your API key when asked.',
        commands: [
          { label: 'Inside OpenCode', code: '/connect' },
          {
            label: 'Alternative from the terminal',
            code: 'opencode auth login',
            note: 'Same result, run outside the OpenCode screen',
          },
        ],
        tip: 'Not sure which provider to choose? Select the one you already have an account or free credits for — the workshop works with any of them.',
      },
      {
        title: 'Choose a model',
        description:
          'Type /models inside OpenCode and pick the model you want to use. You can list models from the terminal too.',
        commands: [
          { label: 'Inside OpenCode', code: '/models' },
          { label: 'From the terminal', code: 'opencode models' },
        ],
      },
      {
        title: 'Send your first prompt',
        description:
          'Type the prompt below, press Enter, and approve the file creation when OpenCode asks. Then open the file with Live Server (Requirement 2).',
        commands: [
          {
            label: 'First prompt',
            code: 'Create an index.html file with a centered heading that says "Hello GDGC Batna 2".',
          },
        ],
      },
    ],
    verify: {
      title: 'Check it works',
      command: 'opencode auth list',
      expected:
        'Your connected provider appears in the list, and OpenCode answers your first prompt by creating index.html.',
    },
  },
  {
    id: 'github',
    number: 6,
    name: 'GitHub Account',
    tagline: 'Cloud home for your code',
    why: 'GitHub stores the repository that Netlify deploys automatically on every push.',
    duration: '5 min',
    iconPath: '/assets/stickers/github.svg',
    accent: 'bg-amber-50 border-gdgc-yellow/50',
    badge: 'Free Account',
    steps: [
      {
        title: 'Create your account',
        description:
          'Sign up with a personal email (use the same one you set in Git). Choose a simple, professional username — it will appear in your project links.',
        link: { label: 'github.com/signup', href: 'https://github.com/signup' },
      },
      {
        title: 'Verify your email',
        description:
          'GitHub sends a launch code to your inbox. Enter it to finish. Without verification you cannot create repositories.',
      },
      {
        title: 'Keep your login ready',
        description:
          'Write down your username and make sure you can sign in on the laptop you will bring. We will also use "Sign in with GitHub" for Supabase and Netlify.',
        tip: 'Enable two-factor authentication later — it is optional for the workshop.',
      },
    ],
    verify: {
      title: 'Check it works',
      expected: 'You can open github.com and see your profile icon in the top-right corner.',
    },
  },
  {
    id: 'supabase',
    number: 7,
    name: 'Supabase Account',
    tagline: 'Backend as a Service — database, auth, and APIs in minutes',
    why: 'Supabase will be the backend of our real project: PostgreSQL tables, login, and ready-made APIs.',
    duration: '3 min',
    iconPath: '/assets/stickers/supabase.svg',
    accent: 'bg-emerald-50 border-gdgc-green/40',
    badge: 'Free Account',
    steps: [
      {
        title: 'Sign in with GitHub',
        description:
          'Open Supabase, click "Start your project", then choose "Continue with GitHub". This links both accounts in one click.',
        link: { label: 'supabase.com', href: 'https://supabase.com/' },
      },
      {
        title: 'Open your dashboard',
        description:
          'After signing in you land on the Supabase dashboard. You do not need to create a project now — we will create it together in the workshop.',
        tip: 'The free plan is enough for everything we build.',
      },
    ],
    verify: {
      title: 'Check it works',
      expected: 'The Supabase dashboard (supabase.com/dashboard) opens without asking you to sign in again.',
    },
  },
  {
    id: 'netlify',
    number: 8,
    name: 'Netlify Account',
    tagline: 'Publish your app to a live public link',
    why: 'Netlify takes the code from GitHub and gives us a live HTTPS website that anyone can open.',
    duration: '3 min',
    iconPath: '/assets/stickers/netlify.svg',
    accent: 'bg-teal-50 border-teal-500/40',
    badge: 'Free Account',
    steps: [
      {
        title: 'Sign up with GitHub',
        description:
          'Open the Netlify sign-up page and choose "Sign up with GitHub". Authorize Netlify when GitHub asks.',
        link: { label: 'app.netlify.com/signup', href: 'https://app.netlify.com/signup' },
      },
      {
        title: 'Reach your team dashboard',
        description:
          'Answer the short welcome questions (any answer works) until you see your team dashboard. We will connect a repository and pick the project link in the workshop.',
        tip: 'Choose the free plan — no payment card is needed to follow the workshop.',
      },
    ],
    verify: {
      title: 'Check it works',
      expected: 'The Netlify dashboard opens and shows your team name at the top.',
    },
  },
];
