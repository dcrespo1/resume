<script lang="ts">
  import { reveal } from './reveal.js'
  import { credentials } from './data.js'
</script>

<section class="card reveal" use:reveal>
  <div class="sec-head">
    <h2>Clearances &amp; Certs</h2>
    <span class="tag">// creds</span>
  </div>
  <div class="creds">
    {#each credentials as c (c.name)}
      <div class="cred">
        <span class="ic mono">▹</span>
        <span class="name">{c.name}</span>
        <span class="st {c.kind}">{c.status}</span>
      </div>
    {/each}
  </div>
</section>

<style>
  .creds { display: flex; flex-direction: column; gap: 10px; }
  .cred {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 11px 13px;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: rgba(20, 17, 29, 0.35);
    font-size: 0.88rem;
  }
  .cred .ic { font-size: 0.7rem; color: var(--faint); }
  .cred .name { font-weight: 500; }
  .cred .st {
    margin-left: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.64rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 20px;
  }
  .cred .st.active {
    color: var(--green);
    background: rgba(63, 224, 143, 0.1);
    border: 1px solid rgba(63, 224, 143, 0.3);
  }
  .cred .st.held {
    color: var(--purple);
    background: rgba(167, 101, 245, 0.1);
    border: 1px solid rgba(167, 101, 245, 0.3);
  }
</style>
