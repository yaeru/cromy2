<script lang="ts" setup>
	definePageMeta({
		middleware: 'unauthenticated',
	});

	const supaAuth = useSupabaseClient().auth;

	const credentials = reactive({
		email: '',
		password: '',
	});

	const register = async () => {
		const { error } = await supaAuth.signUp(credentials);
		if (error) {
			alert(error.message);
		} else {
			return navigateTo('/');
		}
	};
</script>
<template>
	<section class="uk-section">
		<div class="uk-flex uk-flex-center uk-flex-middle">
			<form @submit.prevent="register" class="uk-card uk-card-body uk-card-default uk-width-large">
				<h1>Register</h1>
				<div class="uk-margin-bottom">
					<input v-model="credentials.email" type="email" class="uk-input" placeholder="email" />
				</div>
				<div class="uk-margin-bottom">
					<input v-model="credentials.password" type="password" class="uk-input" placeholder="password" />
				</div>
				<button class="uk-button uk-button-primary">
					Register
				</button>
			</form>
		</div>
	</section>
</template>