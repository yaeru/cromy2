<script setup lang="ts">
	const user = useSupabaseUser();

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
	<nav class="uk-navbar-container">
		<div class="uk-container">
			<div class="uk-navbar" uk-navbar>
				<div class="uk-navbar-left">
					<ul class="uk-navbar-nav">
						<li>
							<NuxtLink to="/">Home</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/cards">Cards</NuxtLink>
						</li>
						<li v-if="user">
							<NuxtLink to="/protected">Protected</NuxtLink>
						</li>
					</ul>
				</div>
				<div class="uk-navbar-right">
					<ul class="uk-navbar-nav">
						<template v-if="!user">
							<li>
								<NuxtLink to="/login">Login</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/register">Registro</NuxtLink>
							</li>
						</template>
						<template v-else>
							<li>
								<NuxtLink to="/profile">Profile</NuxtLink>
							</li>
							<li>
								<a href="" @click="logout">Salir</a>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>