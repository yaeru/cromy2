<script setup lang="ts">
	definePageMeta({
		middleware: 'authenticated',
	});

	const user = useSupabaseUser();


	
</script>

<template>
	<h1>User: </h1>
	<ul>
		<li>Email: {{ user.email }}</li>
		<li>phone: {{ user.phone }}</li>
		<li>Email: {{ user.email }}</li>
		<li>Email: {{ user.email }}</li>
	</ul>

	<pre>
		{{ user }}
	</pre>
</template>