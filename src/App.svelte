<script lang="ts">
  import Contact from './lib/Contact.svelte';
  import Credentials from './lib/Credentials.svelte';
  import Experience from './lib/Experience.svelte';
  import Hero from './lib/Hero.svelte';
  import Languages from './lib/Languages.svelte';
  import Projects from './lib/Projects.svelte';
  import Skills from './lib/Skills.svelte';
</script>

<div class="wrap">
  <Hero />

  <div class="grid">
    <main>
      <Experience />
    </main>
    <aside class="sidebar">
      <Skills />
      <Languages />
      <Credentials />
      <Contact />
    </aside>
  </div>

  <div class="grid" style="margin-top: 26px;">
    <Projects />
  </div>

  <footer class="mono">
    <span class="prompt">$</span> built by Dylan Crespo · Lynchburg, VA · <span class="mono">2026</span>
  </footer>
  </div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1.75fr 1fr;
    gap: 26px;
    margin-top: 26px;
    align-items: start;
  }
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }
  footer {
    margin-top: 42px;
    text-align: center;
    font-size: 0.72rem;
    color: var(--faint);
    letter-spacing: 0.04em;
  }
  footer .prompt { color: var(--pink); }

  @media (max-width: 800px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
