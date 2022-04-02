<template>
    <div class="md:absolute bottom-0 py-16 w-full justify-center px-10 md:px-72">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center md:gap-x-10">
            <span
                class="font-semibold tracking-wider text-white uppercase whitespace-nowrap"
            >reach me on</span>
            <div
                class="flex flex-wrap gap-x-14 items-center pt-6 lg:flex-nowrap md:pt-0 left-0 right-0"
            >
                <a href="https://discord.com/channels/@me/624981292865552435" target="_blank">
                    <font-awesome-icon
                        :icon="['fab', 'discord']"
                        class="w-auto h-5 text-gray-400 transition cursor-pointer fill-current hover:text-white"
                    />
                </a>
                <a href="https://github.com/nei7" target="_blank">
                    <font-awesome-icon
                        :icon="['fab', 'github']"
                        class="w-auto h-5 text-gray-400 transition cursor-pointer fill-current hover:text-white"
                    />
                </a>
                <a href="mailto:franciszek.szarek2@gmail.com" target="_blank">
                    <font-awesome-icon
                        :icon="['fas', 'at']"
                        class="w-auto h-5 text-gray-400 transition cursor-pointer fill-current hover:text-white"
                    />
                </a>
            </div>
        </div>
    </div>
</template>