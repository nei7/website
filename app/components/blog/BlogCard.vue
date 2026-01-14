<script setup lang="ts">
import { Calendar, Clock } from "lucide-vue-next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "~/types/blog";

const props = defineProps<BlogPost>();

const createdAt = dateFormatter.format(new Date(props.published));

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min`;
  return `${Math.floor(seconds / 3600)}h`;
}

const postLink = `/blog/${props.url}`;
</script>

<template>
  <NuxtLink :to="postLink">
    <Card
      class="group overflow-hidden flex flex-col h-full border-muted/60 transition-all hover:shadow-lg hover:border-primary/20 cursor-pointer"
    >
      <CardHeader class="pb-3">
        <CardTitle
          class="text-xl leading-tight group-hover:text-primary transition-colors"
        >
          {{ title }}
        </CardTitle>

        <div class="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <div class="flex items-center gap-1">
            <Calendar class="w-3.5 h-3.5" />
            <span>{{ createdAt }}</span>
          </div>
          <span class="text-muted-foreground/30">•</span>
          <div class="flex items-center gap-1">
            <Clock class="w-3.5 h-3.5" />
            <span>{{ formatDuration(readTime) }}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p class="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {{ description }}
        </p>
      </CardContent>
    </Card>
  </NuxtLink>
</template>
