<script setup lang="ts">
import type { AnalyticsDashboard, AnalyticsPeriod } from "#shared/types/analytics";

// Owner-only page: the API is the gate, this page just explains a 401 or 403.
useHead({
  title: "Analytics",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const route = useRoute();
const router = useRouter();
const { clear, fetch: refreshSession } = useUserSession();

const days = computed<AnalyticsPeriod>(() => {
  const value = Number(route.query.days);
  return (ANALYTICS_PERIODS as readonly number[]).includes(value) ? (value as AnalyticsPeriod) : 30;
});

const { data, error, status, refresh } = await useFetch<AnalyticsDashboard>("/api/visits/report", {
  query: { days },
});

const setDays = (value: AnalyticsPeriod) => router.replace({ query: value === 30 ? {} : { days: value } });

const errorCode = computed(() => error.value?.statusCode);
const loginFailed = computed(() => route.query.login === "failed");
const loginHref = `/auth/github?redirect=${encodeURIComponent("/analytics")}`;

const isDev = import.meta.dev;

async function devSignIn() {
  const login = window.prompt("Sign in locally as (GitHub login)", "nei7");
  if (!login) return;
  await $fetch("/api/_dev/login", { method: "POST", body: { login } });
  await refreshSession();
  await refresh();
}

async function signOut() {
  await clear();
  await refresh();
}

let regionNames: Intl.DisplayNames | null = null;
try {
  regionNames = new Intl.DisplayNames(["en"], { type: "region" });
} catch {
  regionNames = null;
}
const countryName = (code: string) => {
  try {
    return regionNames?.of(code) ?? code;
  } catch {
    return code;
  }
};

const periodLabel = computed(() =>
  data.value ? `${formatShortDate(data.value.from)} – ${formatShortDate(data.value.to)} (UTC)` : ""
);
</script>

<template>
  <div>
    <header class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
      <div>
        <h1 class="font-serif text-3xl tracking-tight">Analytics</h1>
        <p v-if="data" class="mt-1 font-mono text-xs text-muted-foreground">{{ periodLabel }}</p>
      </div>
      <nav v-if="data" class="flex gap-1 font-mono text-xs" aria-label="Period">
        <button
          v-for="period in ANALYTICS_PERIODS"
          :key="period"
          type="button"
          class="cursor-pointer rounded-sm border px-2.5 py-1 transition-colors"
          :class="
            period === days
              ? 'border-foreground bg-foreground text-background'
              : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
          "
          :aria-pressed="period === days"
          @click="setDays(period)"
        >
          {{ period }}d
        </button>
      </nav>
    </header>

    <!-- Signed out -->
    <div v-if="errorCode === 401" class="mt-10 text-sm text-muted-foreground">
      <p>
        <a
          :href="loginHref"
          class="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
        >
          Sign in with GitHub
        </a>
        to see the analytics.
      </p>
      <p class="mt-1.5 flex flex-wrap gap-x-2 font-mono text-xs">
        <span>Only the site owner can open this page.</span>
        <template v-if="isDev">
          <span>·</span>
          <button type="button" class="cursor-pointer transition-colors hover:text-foreground" @click="devSignIn">
            Dev sign-in
          </button>
        </template>
      </p>
      <p v-if="loginFailed" class="mt-2 font-mono text-xs text-accent" role="alert">
        Sign-in failed, please try again.
      </p>
    </div>

    <!-- Signed in, but not the owner -->
    <div v-else-if="errorCode === 403" class="mt-10 text-sm text-muted-foreground">
      <p>Only the site owner can see this.</p>
      <p class="mt-1.5 font-mono text-xs">
        <button type="button" class="cursor-pointer transition-colors hover:text-foreground" @click="signOut">
          Sign out
        </button>
      </p>
    </div>

    <p v-else-if="error" class="mt-10 font-mono text-xs text-accent" role="alert">
      {{ fetchErrorMessage(error, "Could not load the analytics") }}
    </p>

    <!-- Refetches keep the previous render at reduced opacity: no skeleton, no jump. -->
    <div v-else-if="data" class="mt-10 space-y-14 transition-opacity" :class="{ 'opacity-60': status === 'pending' }">
      <section class="grid grid-cols-2 gap-6 sm:grid-cols-4" aria-label="Totals">
        <AnalyticsKpiTile label="Views" :value="formatCount(data.totals.views)" />
        <AnalyticsKpiTile label="Visitors" :value="formatCount(data.totals.visitors)" hint="unique per day" />
        <AnalyticsKpiTile label="Views / visitor" :value="String(data.totals.viewsPerVisitor)" />
        <AnalyticsKpiTile label="Online now" :value="formatCount(data.online)" hint="last 5 minutes" />
      </section>

      <section aria-label="Daily traffic">
        <AnalyticsBarChart :points="data.daily" />
      </section>

      <div class="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        <AnalyticsRankList title="Pages" :rows="data.pages" link />
        <AnalyticsRankList title="Referrers" :rows="data.referrers" />
        <AnalyticsRankList title="Countries" :rows="data.countries" :format="countryName" />
        <AnalyticsRankList title="Browsers" :rows="data.browsers" />
        <AnalyticsRankList title="Operating systems" :rows="data.os" />
        <AnalyticsRankList title="Devices" :rows="data.devices" />
      </div>

      <section>
        <div class="flex items-baseline justify-between gap-4">
          <h2 class="font-serif text-xl">Web vitals</h2>
          <p class="font-mono text-[0.625rem] tracking-wider text-muted-foreground uppercase">
            p75 of real page loads
          </p>
        </div>
        <AnalyticsVitalsTable
          class="mt-3"
          :vitals="data.vitals"
          :load-p75="data.loadP75"
          :load-samples="data.loadSamples"
        />
      </section>

      <p class="font-mono text-xs text-muted-foreground">
        Cookieless: visitors are a daily salted hash, bots and your own signed-in visits are never counted.
      </p>
    </div>
  </div>
</template>
