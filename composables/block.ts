import type { BlockObjectResponse, ListBlockChildrenResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { useQuery, type UndefinedInitialQueryOptions, } from "@tanstack/vue-query";


type FetchBlocksRequest = { blockId: string, nextCursor?: string }

export function fetchBlocks({
    blockId,
    nextCursor
}: FetchBlocksRequest) {
    return $fetch<ListBlockChildrenResponse>(`/api/notion/blocks/${blockId}`, {
        params: nextCursor ? { start_cursor: nextCursor } : {}
    });
}


export function useBlocks(data: FetchBlocksRequest, options: Partial<UndefinedInitialQueryOptions<(PartialBlockObjectResponse | BlockObjectResponse)[], Error, (PartialBlockObjectResponse | BlockObjectResponse)[], string[]>> = {}) {
    const { suspense, isFetched, refetch, ...query } = useQuery({
        queryKey: ['blocks', data.blockId],
        queryFn: async () => (await fetchBlocks(data)).results,
        initialData: []
    })

    if (!isFetched.value) refetch()

    onServerPrefetch(suspense)


    return query
}