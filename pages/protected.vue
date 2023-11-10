<script setup lang="ts">
	definePageMeta({
		middleware: 'authenticated',
	});

	const supaAuth = useSupabaseClient().auth;

	const logout = async () => {
		const { error } = await supaAuth.signOut();
		if (error) {
			alert(error.message);
		} else {
			return navigateTo('/login');
		}
	};
</script>

<template>
	<div>
		<h1>Protected page</h1>
		<button @click="logout" class="uk-button uk-button-primary">Logout</button>
	</div>
</template>