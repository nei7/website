<script setup lang="ts">
import { ArrowUpRight, Download } from "@lucide/vue";
import { resume } from "~/data/resume";
import type { ResumeEntry } from "~/data/resume";

const { site } = useAppConfig();

const contact = [
  ...resume.links,
  ...(site.email ? [{ label: site.email, href: `mailto:${site.email}` }] : []),
];

const headline = [site.role, resume.location].filter(Boolean).join(" · ");
const sections = resume.sections.filter((section) => section.entries.length > 0);
const pdfName = `${site.name.replaceAll(" ", "-")}-Resume.pdf`;

const linkClass = "inline-flex items-baseline gap-1 underline-offset-4 hover:underline";

const meta = (entry: ResumeEntry) => [entry.period, entry.location].filter(Boolean).join(" · ");

usePageSeo({
  title: "Resume",
  description: "My resume: the projects I have built and the technologies I work with.",
  path: "/resume",
});
</script>

<template>
  <article class="resume">
    <!-- The `print:` classes are the PDF layout: public/resume.pdf is this page printed by `pnpm resume:pdf`. -->
    <header class="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
      <div>
        <h1 class="font-serif text-3xl tracking-tight">{{ site.name }}</h1>
        <p class="mt-1 text-muted-foreground">{{ headline }}</p>
      </div>
      <a
        href="/resume.pdf"
        :download="pdfName"
        class="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground print:hidden"
      >
        <Download class="size-3.5" aria-hidden="true" />
        Download PDF
      </a>
    </header>

    <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground print:mt-3">
      <li v-for="link in contact" :key="link.href">
        <a :href="link.href" class="underline-offset-4 transition-colors hover:text-foreground hover:underline">
          {{ link.label }}
        </a>
      </li>
    </ul>

    <p class="mt-8 leading-relaxed print:mt-6 print:leading-normal">{{ resume.summary }}</p>

    <section v-for="section in sections" :key="section.title" class="mt-10 print:mt-6">
      <h2 class="break-after-avoid border-b border-border pb-2 font-serif text-xl">
        {{ section.title }}
      </h2>
      <ul>
        <li
          v-for="entry in section.entries"
          :key="entry.title + (entry.org ?? '')"
          class="break-inside-avoid border-b border-border py-3 last:border-0 last:pb-0 print:py-2 print:last:pb-0"
        >
          <!-- Phones stack the dates under the title, like the project rows. -->
          <div
            class="flex flex-col items-start gap-y-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:items-baseline print:justify-between print:gap-6"
          >
            <h3 class="min-w-0 leading-snug">
              <!-- The link goes on the company or school when there is one, otherwise on the title. -->
              <a
                v-if="entry.href && !entry.org"
                :href="entry.href"
                target="_blank"
                rel="noopener noreferrer"
                :class="linkClass"
                class="font-medium"
              >
                {{ entry.title }}
                <ArrowUpRight class="size-3.5 shrink-0 self-center text-muted-foreground" aria-hidden="true" />
              </a>
              <span v-else class="font-medium">{{ entry.title }}</span>
              <template v-if="entry.org">
                <span class="text-muted-foreground"> · </span>
                <a
                  v-if="entry.href"
                  :href="entry.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :class="linkClass"
                  class="text-muted-foreground"
                >
                  {{ entry.org }}
                  <ArrowUpRight class="size-3.5 shrink-0 self-center" aria-hidden="true" />
                </a>
                <span v-else class="text-muted-foreground">{{ entry.org }}</span>
              </template>
            </h3>
            <span
              v-if="meta(entry)"
              class="font-mono text-xs text-muted-foreground tabular-nums sm:shrink-0 sm:text-right print:shrink-0 print:text-right"
            >
              {{ meta(entry) }}
            </span>
          </div>

          <p v-if="entry.summary" class="mt-1 text-sm text-muted-foreground">
            {{ entry.summary }}
          </p>
          <ul v-if="entry.bullets?.length" class="mt-2 list-disc space-y-1 pl-5 text-sm marker:text-muted-foreground">
            <li v-for="bullet in entry.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <p v-if="entry.tags?.length" class="mt-2 font-mono text-xs text-muted-foreground print:mt-1.5">
            {{ entry.tags.join(" · ") }}
          </p>
        </li>
      </ul>
    </section>

    <section v-if="resume.skills.length" class="mt-10 break-inside-avoid print:mt-6">
      <h2 class="border-b border-border pb-2 font-serif text-xl">Skills</h2>
      <dl class="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-[auto_1fr] print:grid-cols-[auto_1fr]">
        <template v-for="group in resume.skills" :key="group.label">
          <dt class="font-mono text-xs leading-5 tracking-wider text-muted-foreground uppercase">
            {{ group.label }}
          </dt>
          <dd class="mb-2 sm:mb-0 print:mb-0">{{ group.items.join(", ") }}</dd>
        </template>
      </dl>
    </section>
  </article>
</template>

<style>
/* One A4 sheet: the type scales down with the root size (every size here is in rem), and the `print:` spacing is tighter than on screen. */
@page {
  size: A4;
  margin: 14mm 18mm;
}

@media print {
  html:has(.resume) {
    font-size: 13.5px;
  }
}
</style>
