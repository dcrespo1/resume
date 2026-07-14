<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { reveal } from './reveal.js'
  import { contact } from './data.js'

  interface Repo {
    id: number
    name: string
    html_url: string
    description: string | null
    stargazers_count: number
    language: string | null
    pushed_at: string
    fork: boolean
    archived: boolean
  }

  let state: 'loading' | 'ready' | 'error' = 'loading'
  let repos: Repo[] = []

  const LANG_COLOR: Record<string, string> = {
    Go: '#00ADD8',
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Shell: '#89e051',
    HTML: '#e34c26',
    CSS: '#563d7c',
  }

  function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime()
    const days = Math.floor(diff / 86400000)
    if (days < 1) return 'today'
    if (days === 1) return '1 day ago'
    if (days < 30) return `${days} days ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months} mo ago`
    return `${Math.floor(months / 12)}y ago`
  }

  onMount(async () => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${contact.github}/repos?sort=updated&per_page=100`,
        { headers: { Accept: 'application/vnd.github+json' } }
      )
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)
      const data: Repo[] = await res.json()
      repos = data
        .filter((r) => !r.fork && !r.archived)
        .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
        .slice(0, 6)
      state = 'ready'
    } catch (err) {
      state = 'error'
    }
  })
</script>

<section class="card reveal wide" use:reveal>
  <div class="sec-head">
    <h2>Projects</h2>
    <span class="tag">// live from github.com/{contact.github}</span>
  </div>

  {#if state === 'loading'}
    <div class="skeleton-grid">
      {#each Array(4) as _}
        <div class="skeleton-card"></div>
      {/each}
    </div>
  {:else if state === 'error'}
    <p class="fallback mono">
      Couldn't reach the GitHub API right now — browse the repos directly at
      <a href="https://github.com/{contact.github}" target="_blank" rel="noopener">github.com/{contact.github}</a>.
    </p>
  {:else if repos.length === 0}
    <p class="fallback mono">No public repos found.</p>
  {:else}
    <div class="repo-grid">
      {#each repos as repo, i (repo.id)}
        <a
          class="repo"
          href={repo.html_url}
          target="_blank"
          rel="noopener"
          in:fly={{ y: 10, duration: 400, delay: i * 60 }}
        >
          <div class="repo-top">
            <span class="repo-name">{repo.name}</span>
            {#if repo.stargazers_count > 0}
              <span class="repo-stars mono">★ {repo.stargazers_count}</span>
            {/if}
          </div>
          {#if repo.description}
            <p class="repo-desc">{repo.description}</p>
          {/if}
          <div class="repo-meta mono">
            {#if repo.language}
              <span class="lang-dot" style="background: {LANG_COLOR[repo.language] || 'var(--faint)'}"></span>
              <span>{repo.language}</span>
              <span class="sep">·</span>
            {/if}
            <span>updated {timeAgo(repo.pushed_at)}</span>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>

<style>
  .wide { grid-column: 1 / -1; }

  .skeleton-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .skeleton-card {
    height: 92px;
    border-radius: 10px;
    background: linear-gradient(90deg, var(--line-soft) 25%, var(--line) 50%, var(--line-soft) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s ease-in-out infinite;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .fallback { color: var(--muted); font-size: 0.88rem; }
  .fallback a { color: var(--pink); }

  .repo-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .repo {
    display: block;
    padding: 16px 17px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: rgba(20, 17, 29, 0.35);
    text-decoration: none;
    transition: border-color 0.15s ease, transform 0.15s ease, background 0.15s ease;
  }
  .repo:hover {
    border-color: var(--purple);
    background: rgba(167, 101, 245, 0.07);
    transform: translateY(-2px);
  }
  .repo-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .repo-name {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 600;
    font-size: 0.98rem;
    color: var(--ink);
  }
  .repo-stars {
    font-size: 0.72rem;
    color: var(--amber);
    white-space: nowrap;
  }
  .repo-desc {
    margin: 8px 0 0;
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .repo-meta {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    color: var(--faint);
    letter-spacing: 0.03em;
  }
  .repo-meta .sep { color: var(--line); }
  .lang-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
  }

  @media (max-width: 640px) {
    .repo-grid, .skeleton-grid { grid-template-columns: 1fr; }
  }
</style>
