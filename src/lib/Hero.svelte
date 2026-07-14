<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { profile } from './data.js'
  import { reveal } from './reveal.js'

  let displayed = ''
  let roleIndex = 0
  let charIndex = 0
  let deleting = false
  let timer: ReturnType<typeof setTimeout>

  const TYPE_SPEED = 42
  const DELETE_SPEED = 24
  const HOLD_MS = 1600

  function tick() {
    const current = profile.roles[roleIndex]

    if (!deleting) {
      charIndex++
      displayed = current.slice(0, charIndex)
      if (charIndex === current.length) {
        deleting = true
        timer = setTimeout(tick, HOLD_MS)
        return
      }
      timer = setTimeout(tick, TYPE_SPEED)
    } else {
      charIndex--
      displayed = current.slice(0, charIndex)
      if (charIndex === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % profile.roles.length
        timer = setTimeout(tick, 300)
        return
      }
      timer = setTimeout(tick, DELETE_SPEED)
    }
  }

  onMount(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      displayed = profile.roles[0]
      return
    }
    timer = setTimeout(tick, 400)
  })

  onDestroy(() => clearTimeout(timer))
</script>

<header class="panel reveal" use:reveal>
  <div class="panel-inner">
    <div class="titlebar">
      <div class="dots"><i></i><i></i><i></i></div>
      <span class="path mono">~/ <b>dylan-crespo</b> / resume</span>
      <span class="badge">v2026.07</span>
    </div>
    <div class="hero-body">
      <p class="eyebrow">{profile.eyebrow}</p>
      <h1>{profile.first}<br /><span class="grad">{profile.last}</span></h1>
      <p class="role mono">
        <span class="chev">$</span> {displayed}<span class="caret">▍</span>
      </p>
      <p class="summary">{profile.summary}</p>
      <div class="statusbar mono">
        <span class="cell"><span class="live"></span> {profile.location}</span>
        <span class="cell green">{profile.clearance}</span>
        <span class="cell hot">{profile.cert}</span>
      </div>
    </div>
  </div>
</header>

<style>
  .panel {
    position: relative;
    border-radius: var(--radius);
    background: linear-gradient(180deg, var(--panel-2), var(--panel));
    padding: 1px;
  }
  .panel::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    padding: 1px;
    background: var(--grad);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.9;
  }
  .panel-inner {
    position: relative;
    border-radius: calc(var(--radius) - 1px);
    background: linear-gradient(180deg, rgba(38, 32, 56, 0.9), rgba(31, 26, 46, 0.96));
    overflow: hidden;
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 16px;
    border-bottom: 1px solid var(--line-soft);
    background: rgba(20, 17, 29, 0.5);
  }
  .dots { display: flex; gap: 7px; }
  .dots i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.9;
  }
  .dots i:nth-child(1) { background: var(--pink); }
  .dots i:nth-child(2) { background: var(--amber); }
  .dots i:nth-child(3) { background: var(--green); }
  .titlebar .path {
    font-size: 0.78rem;
    color: var(--muted);
    letter-spacing: 0.02em;
  }
  .titlebar .path b { color: var(--ink); font-weight: 600; }
  .titlebar .badge {
    margin-left: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    color: var(--faint);
    text-transform: uppercase;
  }

  .hero-body { padding: 34px 34px 26px; }

  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--purple);
    margin: 0 0 14px;
  }
  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: clamp(2.6rem, 8vw, 4.4rem);
    line-height: 0.98;
    letter-spacing: -0.02em;
    margin: 0;
  }
  h1 .grad {
    background: var(--grad);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .role {
    font-size: clamp(1rem, 2.2vw, 1.2rem);
    font-weight: 500;
    color: var(--ink);
    margin: 20px 0 0;
    min-height: 1.4em;
  }
  .role .chev { color: var(--pink); margin-right: 4px; }
  .caret {
    display: inline-block;
    color: var(--pink);
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }

  .summary {
    max-width: 62ch;
    color: var(--muted);
    margin: 16px 0 0;
    font-size: 1.02rem;
  }

  .statusbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    margin-top: 30px;
    border-top: 1px solid var(--line-soft);
    font-size: 0.74rem;
    letter-spacing: 0.05em;
  }
  .statusbar .cell {
    padding: 14px 20px;
    color: var(--muted);
    border-right: 1px solid var(--line-soft);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .statusbar .cell:last-child { border-right: 0; }
  .statusbar .cell.hot { color: var(--pink); }
  .statusbar .cell.green { color: var(--green); }
  .live {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
    animation: pulse 2.4s infinite;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(63, 224, 143, 0.5); }
    70% { box-shadow: 0 0 0 7px rgba(63, 224, 143, 0); }
    100% { box-shadow: 0 0 0 0 rgba(63, 224, 143, 0); }
  }

  @media (max-width: 800px) {
    .hero-body { padding: 26px 22px 20px; }
    .statusbar .cell { border-right: 0; border-bottom: 1px solid var(--line-soft); width: 100%; }
    .statusbar .cell:last-child { border-bottom: 0; }
  }
</style>
