<script lang="ts" setup>
    definePageMeta({
        layout: "dashboard"
    });


    interface User {
        name: string
        email: string
        title: string
        title2: string
        status: string
        role: string
    };

    const testUser: User = {
        name: 'John Doe',
        email: 'john@example.com',
        title: 'Software Engineer',
        title2: 'Web dev',
        status: 'Active',
        role: 'Owner',
    };

    const users = ref<User[]>([...Array(8).keys()].map(() => testUser));
</script>

<template>
    <div>
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <table class="min-w-full">
            <thead>
                <tr>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                    Name
                </th>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                    Title
                </th>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                    Status
                </th>
                <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                    Role
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                </tr>
            </thead>

            <tbody class="bg-white">
                <tr v-for="(u, index) in users" :key="index">
                <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                    <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                        <img
                        class="w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        >
                    </div>

                    <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-gray-900">
                        {{ u.name }}
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                        {{ u.email }}
                        </div>
                    </div>
                    </div>
                </td>

                <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                    <div class="text-sm leading-5 text-gray-900">
                    {{ u.title }}
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                    {{ u.title2 }}
                    </div>
                </td>

                <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                    <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                    >{{ u.status }}</span>
                </td>

                <td
                    class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap"
                >
                    {{ u.role }}
                </td>

                <td
                    class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap"
                >
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>
