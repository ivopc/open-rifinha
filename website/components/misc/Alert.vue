<template>
    <div
    :class="`mb-3 hidden w-full items-center rounded-lg bg-${variant}-100 px-6 py-5 text-base text-${variant}-800 data-[te-alert-show]:inline-flex`"
    role="alert"
    data-te-alert-init
    data-te-alert-show>
    <span class="mr-2">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-5 w-5">
        <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd" />
        </svg>
    </span> 
    <slot></slot>
    </div>
</template>

<script lang="ts" setup>
    defineProps({
        variant: { type: String, default: "danger" },
        timeout: { type: Number, default: 2000 },
    });
    onMounted(() => {
        const { $initTE, $Alert: Alert } = useNuxtApp();
        $initTE({ Alert }, { allowReinits: true });
    });
</script>
