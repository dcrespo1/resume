<script lang="ts">
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { reveal } from './reveal.js'
  import { languages } from './data.js'

  const widths = languages.map(() => tweened(0, { duration: 700, easing: cubicOut }))
  let values: number[] = languages.map(() => 0)
  widths.forEach((store, i) => store.subscribe((v) => (values[i] = v)))
  let sectionEl: HTMLElement
  let started = false

  onMount(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      languages.forEach((l, i) => widths[i].set(l.pct, { duration: 0 }))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true
            languages.forEach((l, i) => setTimeout(() => widths[i].set(l.pct), i * 90))
            io.disconnect()
          }
        }
      },
      { threshold: 0.3 }
    )
    if (sectionEl) io.observe(sectionEl)
  })
</script>

<section class="card reveal" use:reveal bind:this={sectionEl}>
  <div class="sec-head">
    <h2>Languages</h2>
    <span class="tag">// code</span>
  </div>
  <div class="langs">
    {#each languages as lang, i (lang.name)}
      <div class="lang mono">
        <span class="ln">{lang.name}</span>
        <span class="bar"><i style="width: {values[i]}%"></i></span>
        <span class="pct">{Math.round(values[i])}</span>
      </div>
    {/each}
  </div>
</section>

<style>
  .langs { display: flex; flex-direction: column; gap: 11px; }
  .lang { display: flex; align-items: center; gap: 12px; font-size: 0.82rem; }
  .lang .ln { width: 90px; color: var(--ink); }
  .lang .bar { flex: 1; height: 6px; border-radius: 3px; background: var(--line); overflow: hidden; }
  .lang .bar i { display: block; height: 100%; background: var(--grad); border-radius: 3px; }
  .lang .pct { color: var(--faint); width: 34px; text-align: right; }
</style>
