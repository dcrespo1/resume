<script lang="ts">
  import { contact } from './data.js';
  import { reveal } from './reveal.js';
</script>

<section class="card reveal" use:reveal>
  <div class="sec-head">
    <h2>Contact</h2>
    <span class="tag">// reach me</span>
  </div>
  <div class="contact">
    <a href="mailto:{contact.email}"><span class="k">email</span> {contact.email}</a>
    <a href="https://github.com/{contact.github}" target="_blank" rel="noopener">
      <span class="k">github</span> github.com/{contact.github}
    </a>
    <span><span class="k">loc</span> {contact.location}</span>
  </div>
</section>

<style>
  .contact { display: flex; flex-direction: column; gap: 3px; }
  .contact a,
  .contact span {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--line-soft);
    transition: color 0.15s ease, transform 0.15s ease;
  }
  .contact a:last-child,
  .contact span:last-child { border-bottom: 0; }
  .contact a:hover { color: var(--pink); transform: translateX(3px); }
  .contact .k { color: var(--faint); width: 62px; }
</style>
