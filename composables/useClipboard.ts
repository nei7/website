import { useClipboard as clipboard } from '@vueuse/core'
import { useToast } from '~/components/ui/toast';

const { copy, isSupported, copied } = clipboard()

const { toast } = useToast()


export async function useClipboard(data: string) {

    if (!isSupported.value) {
        toast({
            title: 'Error.',
            description: `Your browser doesn't support copying to clipboard. Please copy data manually: ${data}`,
        })
    }
    try {
        await copy(data)

        if (copied.value)
            toast({
                title: 'Success!',
                description: 'Copied to clipboard.',
            })
    } catch (err) {
        toast({
            title: 'Oops!',
            description: `Something went wrong while copying data. Please copy data manually: ${data}`,
        })
    }
}