<script lang="ts">
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { reveal } from './reveal.js'
  import { skills } from './data.js'

  // one tweened value per skill, animated from 0 -> level once visible
  const progress = skills.map(() => tweened(0, { duration: 700, easing: cubicOut }))
  let values: number[] = skills.map(() => 0)
  progress.forEach((store, i) => store.subscribe((v) => (values[i] = v)))
  let sectionEl: HTMLElement
  let started = false

  onMount(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      skills.forEach((s, i) => progress[i].set(s.level, { duration: 0 }))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true
            skills.forEach((s, i) => {
              setTimeout(() => progress[i].set(s.level), i * 90)
            })
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
    <h2>Skills</h2>
    <span class="tag">// stack</span>
  </div>
  <div class="meters">
    {#each skills as skill, i (skill.name)}
      <div class="meter">
        <div class="m-top">
          <span class="m-name">{skill.name}</span>
          <span class="m-val mono">{Math.round(values[i])}/5</span>
        </div>
        <div class="segs">
          {#each Array(5) as _, seg}
            <span class:on={values[i] > seg}></span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .meters { display: flex; flex-direction: column; gap: 16px; }
  .meter .m-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 7px;
  }
  .meter .m-name { font-size: 0.9rem; font-weight: 500; color: var(--ink); }
  .meter .m-val { font-size: 0.68rem; color: var(--faint); letter-spacing: 0.08em; }
  .segs { display: flex; gap: 5px; }
  .segs span {
    height: 7px;
    flex: 1;
    border-radius: 3px;
    background: var(--line);
    transition: background 0.25s ease, box-shadow 0.25s ease;
  }
  .segs span.on {
    background: var(--grad);
    box-shadow: 0 0 9px rgba(240, 56, 176, 0.35);
  }
</style>
