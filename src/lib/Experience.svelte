<script lang="ts">
  import { reveal } from './reveal.js'
  import { experience } from './data.js'
</script>

<section class="card reveal" use:reveal>
  <div class="sec-head">
    <h2>Experience</h2>
    <span class="tag">// where I've shipped</span>
  </div>

  {#each experience as job, i (job.title + job.org)}
    <div class="job" class:first={i === 0}>
      <div class="job-top">
        <h3 class="job-title">{job.title} <span class="job-org">· {job.org}</span></h3>
        <span class="job-when mono">{job.when.toUpperCase()}</span>
      </div>
      <p class="job-place mono">{job.place}</p>
      <ul class="bullets">
        {#each job.bullets as bullet}
          <li>{bullet}</li>
        {/each}
      </ul>
    </div>
  {/each}
</section>

<style>
  .job { position: relative; padding-bottom: 26px; }
  .job:not(.first) {
    padding-top: 26px;
    border-top: 1px solid var(--line-soft);
  }
  .job:last-child { padding-bottom: 0; }
  .job-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    flex-wrap: wrap;
  }
  .job-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.14rem;
    font-weight: 600;
    margin: 0;
  }
  .job-org { color: var(--purple); font-weight: 500; }
  .job-when {
    font-size: 0.72rem;
    color: var(--muted);
    letter-spacing: 0.03em;
    white-space: nowrap;
  }
  .job-place {
    font-size: 0.72rem;
    color: var(--faint);
    margin: 4px 0 0;
    letter-spacing: 0.03em;
  }
  ul.bullets { list-style: none; margin: 16px 0 0; padding: 0; }
  ul.bullets li {
    position: relative;
    padding-left: 22px;
    margin: 0 0 10px;
    color: #c6c0d6;
    font-size: 0.96rem;
  }
  ul.bullets li:last-child { margin-bottom: 0; }
  ul.bullets li::before {
    content: '▸';
    position: absolute;
    left: 0;
    top: 0;
    color: var(--pink);
    font-size: 0.8rem;
    line-height: 1.7;
  }
</style>
